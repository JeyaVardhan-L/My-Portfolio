---
title: "Building a Unix Shell from Scratch in C: Processes, Pipes, and /proc Observability"
summary: "An architectural breakdown of implementing a POSIX-compliant Unix shell in C: process lifecycles, file descriptor manipulation with dup2, signal handling, terminal job control with tcsetpgrp, and parsing Linux /proc for kernel observability."
date: 2026-09-20
tags: ["Systems"]
---

When software engineers interact with operating systems, the terminal shell is frequently taken for granted. We type commands, chain pipelines with vertical bars (`|`), redirect outputs to disk with `>`, and suspend long-running jobs with `Ctrl+Z` without considering the underlying POSIX machinery making it possible.

When building **ForgeShell**—a Unix shell written in C99 for Linux—the objective was not to clone Bash, but to build an educational, transparent, and robust implementation demonstrating how real operating systems execute processes, arbitrate terminal access, deliver signals, and monitor system resources.

Here is an architectural breakdown of each subsystem as implemented in the codebase.

---

## 1. Process Lifecycle: Beyond the Trivial fork/exec

At its core, a shell's primary duty is process orchestration. The baseline pattern for running a program in Unix is:

```c
pid_t pid = fork();
if (pid == 0) {
    // Child process: execute the binary
    execvp(args[0], args);
    perror("execvp");
    exit(EXIT_FAILURE);
} else if (pid > 0) {
    // Parent process: wait for child termination or suspension
    int status;
    waitpid(pid, &status, WUNTRACED);
} else {
    perror("fork");
}
```

However, a robust shell cannot treat `fork()` and `waitpid()` as isolated calls. Several operational requirements must be handled:

1. **Path Resolution & Builtin Dispatch**: Before invoking `execvp()`, the shell must check whether the command matches internal builtins (`cd`, `pwd`, `exit`, `export`, `unset`, `jobs`, `fg`, `bg`, `help`, `inspect`, `monitor`, `ps`). If not, it delegates execution to the filesystem.
2. **Signal Dispositions**: Before `execvp()` replaces the process image, child processes must restore default signal dispositions (`SIG_DFL`) for signals that the parent shell ignores or handles.
3. **Zombies and Unreaped Children**: Background processes (`command &`) complete asynchronously. If the parent does not explicitly reap them, they remain as zombie entries in the kernel's process table until the shell terminates.

---

## 2. Multi-Stage Pipeline Plumbing with dup2

The modular power of Unix stems from pipelines: connecting the standard output of one process directly to the standard input of another.

Consider a multi-stage command:

```bash
cat /proc/cpuinfo | grep "model name" | sort -u
```

To execute an `N`-stage pipeline, the shell creates `N - 1` pipes. Each pipe is created via `pipe(pipefd)`, returning an array of two file descriptors: `pipefd[0]` for reading and `pipefd[1]` for writing.

The parent shell iterates through each command in the chain, configuring standard file descriptors before executing:

```c
int pipefds[2 * (num_cmds - 1)];

// Allocate all pipe file descriptors
for (int i = 0; i < num_cmds - 1; i++) {
    if (pipe(pipefds + i * 2) < 0) {
        perror("pipe");
        return -1;
    }
}

for (int i = 0; i < num_cmds; i++) {
    pid_t pid = fork();
    if (pid == 0) {
        // If not the first command, redirect stdin from previous pipe's read end
        if (i != 0) {
            dup2(pipefds[(i - 1) * 2], STDIN_FILENO);
        }

        // If not the last command, redirect stdout to current pipe's write end
        if (i != num_cmds - 1) {
            dup2(pipefds[i * 2 + 1], STDOUT_FILENO);
        }

        // CRITICAL: Close all pipe descriptors in child
        for (int j = 0; j < 2 * (num_cmds - 1); j++) {
            close(pipefds[j]);
        }

        execvp(cmd_args[i][0], cmd_args[i]);
        exit(EXIT_FAILURE);
    }
}

// CRITICAL: Close all pipe descriptors in parent shell
for (int i = 0; i < 2 * (num_cmds - 1); i++) {
    close(pipefds[i]);
}
```

> **Why Closing File Descriptors is Non-Negotiable**: If the parent shell or child fails to close `pipefds[1]` (the write end), the reading process at `pipefds[0]` will never receive an `EOF` (End of File) marker. The downstream utility (such as `grep` or `sort`) will hang indefinitely waiting for more input, resulting in a deadlocked pipeline.

---

## 3. Terminal Job Control and Process Groups

When a user presses `Ctrl+C` (`SIGINT`) or `Ctrl+Z` (`SIGTSTP`), the signal must affect **only the foreground process group**, not the shell itself or background tasks.

To manage this under POSIX:

1. **Process Groups**: Every pipeline is assigned its own Process Group ID (PGID). The first child in the pipeline calls `setpgid(0, 0)` to become the process group leader. All subsequent children in that pipeline join this group using `setpgid(child_pid, pgid)`.
2. **Terminal Arbitration with `tcsetpgrp()`**: The parent shell yields control of the terminal to the foreground group:
   ```c
   tcsetpgrp(STDIN_FILENO, pgid);
   ```
3. **Reclaiming Terminal Control**: Once the foreground group terminates or suspends (via `SIGTSTP`), the shell uses `tcsetpgrp(STDIN_FILENO, shell_pgid)` to reclaim terminal ownership and redisplay its prompt.

```c
void put_job_in_foreground(job_t *job, int cont) {
    // Assign terminal control to the job's process group
    tcsetpgrp(shell_terminal, job->pgid);

    if (cont) {
        // Send SIGCONT if the job was previously suspended
        if (kill(-job->pgid, SIGCONT) < 0) {
            perror("kill (SIGCONT)");
        }
    }

    // Wait for the job to report status changes
    int status;
    pid_t pid = waitpid(-job->pgid, &status, WUNTRACED);
    
    // Update internal job state table
    update_job_status(job, pid, status);

    // Reclaim terminal control for the shell
    tcsetpgrp(shell_terminal, shell_pgid);
}
```

---

## 4. Signal Handling Without Concurrency Bugs

Signal handlers execute asynchronously and can interrupt code execution at any arbitrary instruction. Calling functions like `printf()`, `malloc()`, or `free()` inside a signal handler is unsafe because they are **not async-signal-safe**—doing so risks re-entrancy deadlocks or heap corruption.

In ForgeShell, the `SIGCHLD` handler uses an async-signal-safe loop with `waitpid()`:

```c
static void sigchld_handler(int sig) {
    (void)sig;
    int saved_errno = errno;
    int status;
    pid_t pid;

    // Reap all terminated or stopped children without blocking
    while ((pid = waitpid(-1, &status, WNOHANG | WUNTRACED | WCONTINUED)) > 0) {
        mark_process_status(pid, status);
    }

    errno = saved_errno;
}
```

By specifying `WNOHANG`, the handler never blocks. By preserving and restoring `errno`, interrupted system calls do not experience corrupted error states.

---

## 5. Linux /proc Inspection: Kernel Observability

Beyond standard command execution, ForgeShell implements native built-in commands (`inspect <pid>`, `monitor <pid>`, and `ps`) that inspect process state directly via the Linux `/proc` virtual pseudo-filesystem.

The Linux kernel maintains detailed process state in `/proc/[pid]/stat` and `/proc/[pid]/status`. A subtle parser requirement in Linux systems programming is that the process executable name (`comm`) in `/proc/[pid]/stat` can contain spaces and parentheses:

```
41829 (my process (test)) S 41800 41829 ...
```

To parse this reliably without buffer corruption, ForgeShell locates the bounds between the first `(` and the last `)`:

```c
bool proc_get_info(pid_t pid, ProcInfo *info) {
    char path[PATH_MAX];
    snprintf(path, sizeof(path), "/proc/%d/stat", (int)pid);
    FILE *fp = fopen(path, "r");
    if (!fp) return false;

    char stat_buf[2048];
    if (!fgets(stat_buf, sizeof(stat_buf), fp)) {
        fclose(fp);
        return false;
    }
    fclose(fp);

    // Locate comm between first '(' and last ')'
    char *open_paren = strchr(stat_buf, '(');
    char *close_paren = strrchr(stat_buf, ')');
    if (!open_paren || !close_paren || close_paren < open_paren) {
        return false;
    }

    size_t comm_len = close_paren - open_paren - 1;
    strncpy(info->comm, open_paren + 1, comm_len);
    info->comm[comm_len] = '\0';

    // Parse status fields immediately following ')'
    char state;
    int ppid, pgrp, session;
    unsigned long utime, stime;
    long num_threads;
    unsigned long long starttime;

    sscanf(close_paren + 2,
           "%c %d %d %d %*d %*d %*u %*u %*u %*u %*u %lu %lu %*d %*d %*d %*d %ld %*d %llu",
           &state, &ppid, &pgrp, &session,
           &utime, &stime, &num_threads, &starttime);

    info->state = state;
    info->ppid = (pid_t)ppid;
    info->pgrp = (pid_t)pgrp;
    info->utime_ticks = utime;
    info->stime_ticks = stime;
    info->num_threads = num_threads;

    return true;
}
```

This direct inspection allows the user to query process group leaders, kernel thread counts, CPU user/system ticks, and scheduling states without spawning external subshells.

---

## Summary & Architectural Lessons

Building ForgeShell provided clear architectural lessons:

1. **Pipes require strict lifecycle discipline**: Every unused write file descriptor must be closed across all forks, or readers will never terminate.
2. **Terminal arbitration is explicit**: A program does not own keyboard input by default; it must be designated as the foreground process group via `tcsetpgrp()`.
3. **Async signal safety is mandatory**: Signal handlers must avoid non-reentrant runtime functions.
4. **`/proc` parsing requires boundary awareness**: Edge cases like spaces within process names (`comm`) must be parsed by finding matching parentheses.

All source code, Makefiles, and test suites for ForgeShell are openly available on GitHub.

[← back to writings](/blog)

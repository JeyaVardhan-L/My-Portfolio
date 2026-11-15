---
title: "ForgeShell"
summary: "A Unix shell written from scratch in C, with pipelines, job control and a built-in /proc resource monitor."
date: 2026-08-25
side: software
featured: true
order: 1
tags: ["C","Linux","POSIX","Processes","Signals"]
repo: "https://github.com/JeyaVardhan-L/ForgeShell"
specs:
  - { label: "Language", value: "C99" }
  - { label: "Processes", value: "fork · execvp · waitpid" }
  - { label: "Pipes", value: "pipe + dup2, any length" }
  - { label: "Job control", value: "process groups, tcsetpgrp" }
  - { label: "Monitor", value: "pinfo reads /proc directly" }
---

## Overview

**ForgeShell** is a resource-aware Unix command shell built from scratch in C for Linux systems. Rather than simply wrapping library functions, ForgeShell implements core operating systems primitives directly using POSIX system calls: process lifecycles (`fork`, `execvp`, `waitpid`), Unix file descriptor plumbing (`dup2`, pipe chaining), interactive job control, and process group arbitration (`tcsetpgrp`).

Beyond standard command execution, ForgeShell provides deep live observability into system resources by parsing the Linux `/proc` virtual filesystem directly in C.

- **Primary Language**: C (C99/C11 standards compliant)
- **Target OS**: Linux / POSIX Environments

---

## The Problem

Modern developers frequently use shells like Bash, Zsh, or Fish without understanding how the operating system actually arbitrates process execution, handles signals, or routes standard I/O streams across inter-process pipelines. Furthermore, diagnosing memory leaks or CPU consumption often requires jumping into separate utilities like `top` or `ps`. 

ForgeShell was engineered as an educational yet production-grade implementation to answer:
1. How does the kernel manage foreground and background process groups?
2. How are bidirectional pipes and file redirects wired at the file descriptor level?
3. How can process metrics (Resident Set Size, virtual memory, CPU ticks) be sampled directly from kernel memory with zero external dependencies?

---

## Architectural Subsystems

```
                      +-----------------------------+
                      |      Interactive REPL       |
                      |   (Prompt, Input Reading)   |
                      +--------------+--------------+
                                     |
                                     v
                      +-----------------------------+
                      |      Tokenizer / Lexer      |
                      |  (Quotes, Escapes, Tokens)  |
                      +--------------+--------------+
                                     |
                                     v
                      +-----------------------------+
                      |      Pipeline AST Parser    |
                      | (Commands, Redir, Pipelines)|
                      +--------------+--------------+
                                     |
              +----------------------+----------------------+
              |                                             |
   [Single Builtin Command]                       [Pipeline or External]
   (cd, exit, jobs, pinfo)                        (fork, dup2, execvp)
```

### 1. Interactive REPL & Lexer
The Read-Eval-Print Loop handles user inputs, escaping, whitespace tokenization, and dynamic environment expansion. It separates strings into structured command segments while respecting single/double quotes.

### 2. Multi-Stage Pipeline Execution
ForgeShell manages arbitrary pipeline depths (`cmd1 | cmd2 | cmd3 | ... | cmdN`).
- Dynamically allocates an array of pipes: `int pipes[N-1][2]`.
- For each child process:
  - Diverts standard input from `pipes[i-1][0]` using `dup2()`.
  - Diverts standard output to `pipes[i][1]` using `dup2()`.
  - Closes all unused file descriptor copies in both parent and children to prevent descriptor leaks and zombie hangs.

### 3. POSIX Job Control & Signal Management
- Distinguishes between foreground and background jobs (`&` suffix).
- Uses `setpgid()` to isolate background jobs into dedicated process groups.
- Transfers terminal control to foreground jobs via `tcsetpgrp()`.
- Catches and routes `SIGINT` (Ctrl+C), `SIGTSTP` (Ctrl+Z), and `SIGCHLD` to prevent premature shell exits while properly suspending and reclaiming terminated child processes.

### 4. Linux `/proc` Observability Engine (`pinfo`)
ForgeShell features a custom built-in command `pinfo [PID]` that directly reads `/proc/[pid]/stat` and `/proc/[pid]/status`:
- **State**: Inspects process execution status (Running, Sleeping, Zombie).
- **Virtual Memory & RSS**: Extracts physical memory resident pages.
- **CPU Time**: Computes user and kernel mode CPU clock ticks.
- **Executable Path**: Resolves the target binary via `/proc/[pid]/exe` symlink dereferencing.

---

## Verification & Status

- **Status**: Implemented & verified on Linux.
- **Test Suite**: Automated unit and functional tests covering tokenizer parsing, pipeline I/O redirection, background process reaping, and signal traps.
- **Build System**: Clean modular `Makefile` with `gcc -Wall -Wextra -pedantic` flags.

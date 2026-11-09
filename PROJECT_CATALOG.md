# PROJECT CATALOG: VERIFIED GITHUB ENGINEERING AUDIT

**Target Profile:** [`https://github.com/JeyaVardhan-L`](https://github.com/JeyaVardhan-L)  
**Auditor:** Senior Software Architect, Systems Auditor & QA Engineer  
**Date of Audit:** November 9, 2026  
**Status:** 28 Public Repositories Audited / 9 Featured Engineering Showcases

---

## 1. Audit Methodology & Verification Standards

Every project in this catalog was discovered through direct GitHub API inspection of the `JeyaVardhan-L` user account. Each repository was evaluated against verified source code, directory structures, commit trees, test suites, and authentic documentation. No project capability, metric, or deployment status has been fabricated.

```
Total Public Repositories Audited: 28
├── Educational & Skill Tutorials: 7 (skills-*, introduction-to-*)
├── Upstream Forks: 3 (build-your-own-x, open-source-rover, scaledown)
├── Coursework & Practice: 6 (Desgine_Analysis_and_Algorithm, Operating-Systems-Foundations, ClearNum, etc.)
└── Substantial Engineering Projects: 12
    ├── Selected for Primary Portfolio Showcase: 9
    └── Secondary / Specialized Tools: 3
```

---

## 2. Selected Primary Portfolio Showcases

### 1. ForgeShell — Resource-Aware Unix Shell in C
- **Repository:** [`https://github.com/JeyaVardhan-L/ForgeShell`](https://github.com/JeyaVardhan-L/ForgeShell)
- **Primary Language:** C (C99/C11 standards compliant)
- **Architecture & Subsystems:**
  - **REPL & Lexer:** Custom tokenizer supporting double/single-quote escaping, token chaining, and environment variable expansion.
  - **Process Execution:** Direct POSIX process lifecycle management (`fork`, `execvp`, `waitpid`).
  - **Pipeline Chaining:** Dynamic multi-command pipelines (`cmd1 | cmd2 | ... | cmdN`) using dynamic file descriptor arrays and `dup2()`.
  - **Job Control & Signals:** Separate process groups via `setpgid()`, foreground terminal arbitration via `tcsetpgrp()`, and signal handlers for `SIGINT` (Ctrl+C), `SIGTSTP` (Ctrl+Z), and `SIGCHLD`.
  - **Direct `/proc` Virtual Filesystem Parser:** Built-in `pinfo` command reading `/proc/[pid]/stat`, `/proc/[pid]/status`, and `/proc/[pid]/exe` to extract process state, resident memory (RSS), CPU user/system ticks, and binary execution paths.
- **Verification Evidence:** Modular `Makefile` with `-Wall -Wextra -pedantic` flags; automated test suite validating tokenizer parsing, pipeline I/O redirection, and background process reaping.
- **Status:** **Implemented & Verified**.

---

### 2. Autonomous Navigation Baseline Research Pipeline
- **Repository:** [`https://github.com/JeyaVardhan-L/Baseline_tests_for_AutoNav`](https://github.com/JeyaVardhan-L/Baseline_tests_for_AutoNav)
- **Primary Languages & Tools:** Python, NumPy, SciPy, Matplotlib
- **Problem Investigated:** Evaluates whether baseline 3D LiDAR odometry algorithms can process incoming point-cloud frames within the physical sensor arrival deadline ($T_{\text{period}} = 100\text{ms}$ at $10\text{Hz}$) while operating within companion computer (Raspberry Pi 5 / Jetson Orin Nano) computational and memory limits.
- **Dataset:** Authentic Ouster OS1-64 LiDAR recordings from the **Newer College (Oxford)** robotics dataset.
- **Implementation & Metrics:**
  - Voxel grid spatial downsampling and statistical outlier removal.
  - Iterative Closest Point (ICP) point-to-point and point-to-plane registration using SciPy KD-trees.
  - Wall-clock per-frame latency profiling: Empirical Mean, Median, P95, P99, and deadline violation rate.
  - Trajectory estimation and condition number monitoring.
- **Verification Evidence:** 35 passing automated unit tests in `tests/`; reproducible CLI commands and config definitions in `pyproject.toml`.
- **Status:** **Implemented & Verified**.

---

### 3. MECH-XR — Augmented Reality Mechanical Systems Explorer
- **Repository:** [`https://github.com/JeyaVardhan-L/AR_Gear_Mechanisms`](https://github.com/JeyaVardhan-L/AR_Gear_Mechanisms)
- **Engine & Frameworks:** Unity 6000.3.27f2 (6.3 LTS), C#, Google ARCore 6.0.8, Universal Render Pipeline (URP)
- **Target Platform:** Android (API 26–36, 64-bit ARM64)
- **What Was Built:**
  - **6-DoF ARCore Plane Tracking:** Surface classification and raycast hit-testing anchoring 3D assemblies to real-world floors and tabletops.
  - **Mathematical Kinematic Constraint Solver:** Zero-jitter angular velocity calculation ($\omega_{\text{driven}} = -\frac{N_{\text{drive}}}{N_{\text{driven}}} \cdot \omega_{\text{drive}}$), avoiding chaotic physics-engine tooth collisions.
  - **Interactive Axial Exploded Views:** Detaches assemblies (herringbone gears, automotive differentials, planetary gear sets) outward along functional mechanical axes via user-controlled slider gestures.
- **Verification Evidence:** 71 passing automated tests in `Documentation/Development/TEST_REPORT.md`; authentic screenshots in `Screenshots/`; packaged APK builds in `Builds/`.
- **Status:** **Implemented & Verified**.

---

### 4. STM32 Zero-Latency 3D Flight Telemetry & Sensor Fusion
- **Repository:** [`https://github.com/JeyaVardhan-L/STM32-Flight_Telemetry`](https://github.com/JeyaVardhan-L/STM32-Flight_Telemetry)
- **Hardware & Stack:** STM32F103C8T6 (ARM Cortex-M3 @ 72MHz), C, InvenSense MPU6050 6-Axis IMU, Web Serial API, Three.js
- **The Hardware Hack:** When missing a dedicated FTDI USB-UART adapter, the Arduino Uno's ATmega328P was put into a hardware reset coma (`RESET` grounded), hijacking its onboard ATmega16U2 USB-to-TTL chip to stream STM32 UART packets directly to a PC at 115,200 baud.
- **Bare-Metal Sensor Fusion:**
  - On-chip Complementary Filter blending high-pass gyro velocity with low-pass accelerometer gravity vectors ($\alpha = 0.98$).
  - Shortest-path Euler wrap logic preventing gimbal lock jumping at 180° boundaries.
  - Direct browser connection via Web Serial API (`navigator.serial`), rendering 60 FPS Three.js quadcopter and satellite attitude models without requiring any intermediary backend server.
- **Verification Evidence:** Verified on physical hardware; authentic dashboard captures (`assets/Web.png`) and hardware photos (`assets/Finmodule.png`).
- **Status:** **Implemented & Hardware-Verified**.

---

### 5. DEADeye VR — Tactical Urban Marksman Simulation
- **Repository:** [`https://github.com/JeyaVardhan-L/DEADeyeVR`](https://github.com/JeyaVardhan-L/DEADeyeVR)
- **Engine & Frameworks:** Unity 6000.3.27f2 LTS, C#, Khronos OpenXR 1.16.1, URP 17.3.0 (Forward+)
- **Target Runtimes:** Meta Quest 2 Standalone & PCVR
- **Key Engineering Features:**
  - **Dual-Render Scope Optics:** High-magnification secondary camera rendered to a dynamic `RenderTexture` with realistic eye-relief vignetting and parallax shadowing when viewing off-axis.
  - **Ballistic Trajectory Physics:** Numerical projectile simulation accounting for gravity drop, supersonic/subsonic aerodynamic drag, and bullet flight lead time.
  - **Two-Handed OpenXR Weapon Handling:** Procedural stabilization blending two 6-DoF controller inputs, spring-damper recoil dissipation, and spatial magazine snap zones.
- **Verification Evidence:** 32 automated tests passing (100% pass rate); complete URP Forward+ multi-light pipeline configuration.
- **Status:** **Implemented & Verified**.

---

### 6. YOLO11 Airborne Object Detection & Tactical Radar
- **Repository:** [`https://github.com/JeyaVardhan-L/Train_YOLO_Customdataset`](https://github.com/JeyaVardhan-L/Train_YOLO_Customdataset)
- **Primary Languages & Frameworks:** Python, PyTorch, Ultralytics YOLO11
- **Problem Statement:** Distinguishing small multi-rotor quadcopters from flying birds against complex sky lighting (clear, overcast, backlit) to prevent avian false alarms in perimeter security.
- **Dataset Structure:** 8,888 aerial images across 15,018 normalized annotations (5,002 Aircrafts, 4,985 Birds, 5,031 Drones) partitioned into 80% train / 20% validation.
- **Subsystems:**
  - Multi-class bounding-box detector running real-time inference (>45 FPS on CUDA, >20 FPS on CPU).
  - 2D tactical polar radar GUI translating screen coordinate deltas into target bearing and estimated range sweeps.
  - Hardware serial interface for microcontroller ultrasonic distance verification.
- **Verification Evidence:** Trained weights, validation loss curves, and architectural diagrams in `assets/diagrams/`.
- **Status:** **Implemented & Trained**.

---

### 7. Batcave_Cloud — Self-Hosted Personal Server on Hardware
- **Repository:** [`https://github.com/JeyaVardhan-L/Batcave_Cloud`](https://github.com/JeyaVardhan-L/Batcave_Cloud)
- **Release:** v0.5.1
- **Stack:** Python, Flask, SQLite, HTML5, Vanilla JavaScript, Termux, Linux
- **Motivation & Hardware Repurposing:** Engineered from first principles to avoid turnkey black-box dependencies. Deployed 24/7 on an otherwise unused Samsung Galaxy Tab S6 Lite running Android 13 via Termux, OpenSSH daemon, and local LAN.
- **Subsystems Implemented:**
  - Password hashing via Werkzeug (`scrypt`), secure session cookies, and safe redirect validation.
  - Hierarchical filesystem browser with breadcrumb navigation, atomic uploads (`xb` mode), safe file moves with cycle detection, and $O(1)$ disk capacity monitoring via `shutil.disk_usage`.
  - Notes and Ideas CRUD engines with full-text search and automated `updated_at` timestamps.
- **Verification Evidence:** 65 passing tests across 6 test modules in `tests/` running via `pytest`.
- **Status:** **Implemented & Tested**.

---

### 8. LedgerLab — Interactive Blockchain Laboratory
- **Repository:** [`https://github.com/JeyaVardhan-L/LedgerLab`](https://github.com/JeyaVardhan-L/LedgerLab)
- **Stack:** TypeScript, React, Cryptographic Primitives (SHA-256), Playwright
- **What Was Built:** A browser-based blockchain simulator that interactively visualizes:
  - Fixed-length SHA-256 digests and bit-level avalanche effect demonstrations.
  - Block structure packaging (payload, timestamp, index, and nonce) with interactive Proof-of-Work mining loops.
  - Chain linking with cascading downstream invalidation when historical blocks are tampered with.
  - 51% attack/defense mechanics.
- **Verification Evidence:** 20 passing unit tests and Playwright end-to-end browser test automation.
- **Status:** **Implemented & Tested**.

---

### 9. Robo Soccer Bot — Competition-Grade Mobile Chassis
- **Repository:** [`https://github.com/JeyaVardhan-L/Robo_Soccerbot`](https://github.com/JeyaVardhan-L/Robo_Soccerbot)
- **Hardware:** Arduino Uno (ATmega328P), Dual BTS7960 43A H-Bridge Drivers, 4x 300 RPM DC Motors, 3S LiPo Battery, FlySky FS-i6 2.4GHz RF System
- **Engineering Highlights:**
  - Microsecond PWM signal decoding from 2.4GHz receiver channels with deadband noise filtering in C++.
  - High-current inductive spike protection and star-ground isolation preventing microcontroller brownouts during rapid motor reversals.
  - Differential drive velocity mapping.
- **Verification Evidence:** Complete wiring schematics, hardware component lists, and competition firmware revisions in repository.
- **Status:** **Fabricated, Programmed & Field-Tested**.

---

## 3. Other Audited Repositories

| Repository | Focus / Tech | Purpose & Notes |
| :--- | :--- | :--- |
| `Drone-Pathfinder` | C | 2D/3D grid pathfinding engine for autonomous drones implementing A* search with min-heap priority queues. |
| `Doc_Summeriser_ft-Scaledown` | Python, Gradio, ScaleDown | Academic paper section-aware text extraction, contextual compression, and Q&A engine. |
| `Operating-Systems-Foundations` | C, Bash | Documented coursework covering CPU scheduling algorithms, Linux system calls, and shell scripting. |
| `Desgine_Analysis_and_Algorithm` | C | Implementations of classical algorithmic paradigms (Divide & Conquer, Dynamic Programming, Greedy, Graph Algorithms). |
| `ClearNum` | Python | Image processing and numeric digit clean-up experimentation. |
| `HTML-Playground` | HTML / CSS / JS | Front-end web development practice and component experiments. |
| `Timetable` | HTML / CSS | Academic class scheduling utility. |
| `stack-overflown` | JavaScript | Web application experiments. |


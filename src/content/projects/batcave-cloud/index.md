---
title: "Batcave Cloud"
summary: "A private cloud server built with Flask and SQLite that runs around the clock on an old Android tablet."
date: 2026-09-05
side: software
featured: true
order: 2
tags: ["Python","Flask","SQLite","Termux"]
repo: "https://github.com/JeyaVardhan-L/Batcave_Cloud"
cover: ./cover.png
specs:
  - { label: "Host", value: "Galaxy Tab S6 Lite, Termux" }
  - { label: "Stack", value: "Flask + SQLite" }
  - { label: "Security", value: "sessions, CSRF tokens, path sandbox" }
  - { label: "Tests", value: "65" }
---

## Overview

**Batcave_Cloud** is a personal self-hosted private cloud server built from scratch using Python, Flask, SQLite, and bare filesystem I/O. Engineered without heavy ORMs or opaque third-party cloud bundles, Batcave_Cloud runs 24/7 as an always-on, low-power home server on a repurposed, screen-damaged Samsung Galaxy Tab S6 Lite running Android 13 via **Termux** and an OpenSSH daemon.

- **Current Version**: v0.5.1
- **Primary Languages**: Python, HTML/CSS, Vanilla JavaScript, SQLite
- **Automated Tests**: 65 passing automated tests across 6 comprehensive test suites

---

## Why I Built This

Modern turnkey cloud solutions (Nextcloud, Dropbox, AWS) make deploying services trivial, but they abstract away the underlying mechanics of server engineering. Batcave_Cloud was engineered from first principles to master:
1. **Security Primitives**: Hand-coding cryptographic password hashing with Werkzeug (`scrypt` / PBKDF2), stateless CSRF token generation, secure session cookies, and strict filesystem path traversal defense (`os.path.realpath`).
2. **Architectural Separation**: Isolating application factories from route controllers, storage I/O from database queries, and configuration schemas from source code.
3. **Hardware Repurposing**: Turning an otherwise unused, broken-screen Android tablet into a silent, battery-backed personal LAN file and notes server with zero ongoing cloud hosting fees.

---

## Core Implemented Subsystems

| Subsystem | Architectural Implementation |
| :--- | :--- |
| **Authentication & Sessions** | Password verification via `scrypt`, HTTP-only session cookies, and safe redirection parsing to prevent open-redirect vulnerabilities. |
| **Filesystem Storage Engine** | Hierarchical file browser with breadcrumbs, atomic uploads (`xb` mode to avoid race conditions), directory cycle detection, safe file moves, and $O(1)$ disk capacity monitoring via `shutil.disk_usage`. |
| **Notes & Markdown** | Complete CRUD workspace with real-time markdown previews, full-text database search, and automated `updated_at` timestamp tracking. |
| **Project Tracking** | Status state machines (`Active`, `Paused`, `Archived`), automated filesystem directory provisioning (`projects/project-<id>`), and safe directory retention policies. |
| **Command Center Dashboard** | Aggregate database telemetry summarizing storage quotas, active projects, and system uptime. |

---

## Verification & Test Suite

- **Status**: Implemented, deployed on private LAN, and covered by automated tests.
- **Test Suite**: 65 passing tests running on `pytest` validating authentication gates, CSRF token validation, path traversal attack attempts (`../../etc/passwd`), and atomic upload rollbacks.

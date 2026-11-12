# PORTFOLIO FINAL VISUAL REFINEMENT & QUALITY AUDIT REPORT

**Project**: Jeya Vardhan's Personal Engineering & Systems Developer Website  
**Application Directory**: `Jey.com/`  
**Owner Identity**: Jeya Vardhan ([`@JeyaVardhan-L` on GitHub](https://github.com/JeyaVardhan-L))  
**Date**: November 9, 2026  
**Auditor**: Senior Software Architect, Systems Auditor, Frontend Engineer & UI/UX Designer  
**Build Status**: **Verified Production Build** (Next.js 16.1.6 Turbopack, 28/28 Static & Dynamic Routes Generated with Exit Code 0)  
**Server Status**: Production server running locally on `http://127.0.0.1:3000` (`next start -p 3000`)  
**Live Viewport Inspection**: Full verification across Desktop (1280px) and Mobile (320px, 360px, 390px, 430px)  

---

## 1. Executive Summary & Refinement Objectives

Following the comprehensive technical claims audit, this final visual refinement pass addressed all remaining presentation, typography, responsiveness, and imagery weaknesses identified in live browser captures.

### Strict Identity Boundaries Enforced:
1. **Zero Academic Markers**: 0 mentions of universities, colleges (GITAM), degrees, semesters, or student status.
2. **Zero Personal Portraits/Photos**: Replaced all avatar slots with a dark-slate geometric terminal monogram (`>_`).
3. **Zero Fabricated Professional Experience**: No corporate titles, client logos, or unverified claims.
4. **Authenticity Over Invention**: Authentic repository assets prioritized; conceptual diagrams redesigned into clean, bold architectural overviews with zero fabricated metrics or illegible walls of text.

---

## 2. Mobile Responsiveness Audit & Fixes (Highest Priority)

### Root Cause Analysis of Previous Horizontal Clipping:
1. **`min-width: 360px;` on `html`**: Line 64 of `Jey.com/app/global.css` explicitly forced the root element to a minimum of 360px, guaranteeing horizontal overflow and clipping on 320px viewports.
2. **Monolithic Discipline String**: In `header.tsx`, the string `"systems,robotics,embedded,cv,xr,software"` was passed as a single unwrapped token inside a container with negative letter-spacing (`tracking-[-0.06em]`), preventing the browser from wrapping disciplines across lines.
3. **Rigid Grid in Writings**: `posts.tsx` utilized a fixed two-column grid (`grid-cols-[8rem_1fr]`), allocating 128px to the date column alone and leaving inadequate width for titles on narrow mobile screens.
4. **Table & Pre Styling**: Unconstrained table and preformatted elements had `white-space: nowrap; max-width: fit-content;`.
5. **Mobile Chat Input Squeeze**: Non-functional placeholder buttons (`Paperclip`, `Mic`) in `AIChatInput` consumed ~90px of horizontal space on narrow screens.

### Corrections Implemented:
- **`Jey.com/app/global.css`**:
  - Removed `min-width: 360px;`.
  - Added `width: 100%; overflow-x: hidden;` to both `html` and `body`.
  - Updated `.prose table` and standalone `table` to `display: block; max-width: 100%; overflow-x: auto; white-space: normal;`.
  - Ensured `.prose pre` has `max-width: 100%; overflow-x: auto;`.
- **`Jey.com/app/components/boxed-text.tsx`**:
  - Replaced tight negative tracking (`tracking-[-0.06em]`) with standard tracking (`tracking-tight`), subtle neutral borders (`border-border/80`), and background (`bg-secondary/50`).
- **`Jey.com/app/components/header.tsx`**:
  - Converted the monolithic string into an array of 6 distinct discipline badges:
    `['systems', 'robotics', 'embedded', 'computer vision', 'xr simulation', 'software']`.
  - Wrapped tags in a responsive flex layout (`flex flex-wrap items-center gap-1.5 self-start`).
  - On 320px screens, tags wrap into 2 balanced rows (`systems`, `robotics`, `embedded` / `computer vision`, `xr simulation`, `software`).
- **`Jey.com/app/components/ai-chat-input.tsx`**:
  - Added `hidden sm:flex` to the decorative `Paperclip` and `Mic` buttons so they only appear on screens `>= 640px`.
  - On mobile, the input field and `Send` button occupy the full 288px width comfortably with zero overflow.
- **`Jey.com/app/layout.tsx`**:
  - Added `pb-28 sm:pb-24` to `<main>` to provide ample clearance between the page footer and the bottom-docked chat bar.

### Viewport Verification Results:

| Viewport Width | Device Target | `window.innerWidth` | `document.body.scrollWidth` | Overflow Status | Screenshot Artifact |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **320px** | iPhone SE (1st gen) / Small Mobile | 320px | 320px | **0px (Zero Overflow)** | `screenshots/02-mobile-320px.png` |
| **360px** | Galaxy S8 / Android Compact | 360px | 360px | **0px (Zero Overflow)** | `screenshots/03-mobile-360px.png` |
| **390px** | iPhone 14 / Standard Mobile | 390px | 390px | **0px (Zero Overflow)** | `screenshots/04-mobile-390px.png` |
| **430px** | iPhone 14 Pro Max / Large Mobile | 430px | 430px | **0px (Zero Overflow)** | `screenshots/05-mobile-430px.png` |
| **1280px** | Desktop Full View | 1280px | 1280px | **0px (Zero Overflow)** | `screenshots/01-desktop-homepage.png` |

---

## 3. Homepage Introduction Rewrite (`current.tsx`)

### Problem in Previous Draft:
The previous introduction contained 3 repetitive paragraphs restating identical themes ("software and systems developer", "building real systems from first principles", "low-level systems programming") without progressing the narrative.

### Refactored Implementation:
Condensed into 2 cohesive, non-repetitive paragraphs:

> **Paragraph 1 (Identity & Focus)**:  
> *"systems and software developer building inspectable tools and autonomous platforms from first principles. my focus sits at the boundary where computation meets physical systems—engineering unix process pipelines in c, bare-metal firmware on stm32, and real-time computer vision models."*
>
> **Paragraph 2 (Verification & Systems Code)**:  
> *"on [github.com/jeyavardhan-l](https://github.com/JeyaVardhan-L), i document and release systems code where execution constraints, memory safety, and sensor deadlines matter—from evaluating 3d lidar odometry under 10hz physical cycles to streaming live spatial attitude over serial into the browser."*

### Key Improvements:
- Every sentence introduces distinct technical substance: OS primitives (`fork`, `dup2`), bare-metal microcontrollers (STM32, MPU6050), physical sensor deadlines (10Hz LiDAR odometry), and real-time browser telemetry (Web Serial, Three.js).
- Retains interactive hover preview card pointing to `@JeyaVardhan-L` on GitHub with terminal preview.
- Eliminates all repetitive phrasing.
- 100% free of academic information, degrees, or unverified claims.

---

## 4. Enhanced Writings Presentation (`/blog` & Homepage)

### Previous Limitation:
Writings were displayed as bare two-column lists (Date + Title), offering insufficient context to evaluate the depth of technical investigations.

### Improvements Implemented:
1. **Dynamic Reading Time**: Added `calculateReadingTime(content)` in `Jey.com/app/blog/utils.ts` to dynamically calculate estimated reading time from word count (`Math.max(1, Math.ceil(words / 200))` min read).
2. **Discipline Categorization**: Added structured `category` frontmatter to all 5 technical articles:
   - `building-a-unix-shell-from-scratch.mdx`: `Systems & OS Internals` (7 min read)
   - `training-an-airborne-object-detection-model.mdx`: `Computer Vision & AI` (5 min read)
   - `can-a-lidar-pipeline-meet-a-10hz-deadline.mdx`: `Robotics & Perception` (6 min read)
   - `building-flight-telemetry-with-an-stm32.mdx`: `Embedded & Firmware` (5 min read)
   - `running-a-personal-cloud-on-android.mdx`: `Linux & Infrastructure` (4 min read)
3. **Responsive Article Card Layout (`posts.tsx`)**:
   - Replaced fixed `grid-cols-[8rem_1fr]` with a vertical stacking layout separated by subtle dividers (`border-b border-border/40`).
   - Top metadata row displays the discipline badge (`BoxedText`), formatted publication date, and reading time indicator.
   - Interactive title with hover preview card (`WritingPreviewCard`) and subtle underline.
   - Two-line summary description (`post.metadata.summary`) providing immediate context.
   - Preserves full MDX rendering, Sugar-High syntax highlighting, and RSS XML feed generation (`/rss`).

---

## 5. Project Imagery & Thumbnail Refinement

### Problem in Previous Diagram Thumbnails:
Previous generated diagrams used tiny 10px bitmap fonts and packed entire multi-line specifications into 3 dense columns. When scaled down to 176px thumbnail size (`w-44`), the text became squiggly and illegible.

### Re-engineering with TrueType Typography & Visual Hierarchy:
Updated `generate_visuals.py` to use Segoe UI TrueType fonts (`segoeuib.ttf` 16–22pt, `consola.ttf` 13pt) with bold, high-contrast architectural cards, distinct geometric graphics, and minimal text:

1. **`autonav-pipeline.png` (800x450)**:
   - Header: `AUTONAV-BASELINE // SENSOR-TO-POSE PIPELINE` [10HZ FEASIBILITY]
   - Three bold cards with directional flow arrows:
     - `STAGE 1: Point Cloud Input` (Ouster OS1-64, 28k raw points, 3D point scatter graphic)
     - `STAGE 2: ICP Registration` (KD-Tree + SVD closed-form, 3D coordinate frame graphic)
     - `STAGE 3: 6-DoF Odometry` (100ms cycle budget, trajectory curve graphic, 35 passing tests)
2. **`forgeshell-terminal.png` (800x450)**:
   - Header: `FORGESHELL // UNIX PROCESS & PIPELINE ARCHITECTURE` [POSIX C99]
   - Three clean subsystem cards:
     - `MODULE 1: REPL & AST Parser` (command chain example, AST node count)
     - `MODULE 2: Process Engine` (PID 101 -> PID 102 pipe visual, `dup2` and `tcsetpgrp`)
     - `MODULE 3: Linux /proc Monitor` (CPU ticks, state machine, `_SC_CLK_TCK`)
3. **`batcave-cloud.png` (800x450)**:
   - Header: `BATCAVE_CLOUD // SELF-HOSTED PERSONAL SERVER` [RELEASE v0.5.1]
   - Three architectural layers:
     - `LAYER 1: Hardware Node` (Exynos 9611 ARM64 SoC graphic, Termux, battery-backed)
     - `LAYER 2: Backend & Storage` (Flask WSGI, SQLite3 ACID, Pillow thumbnail engine)
     - `LAYER 3: Security & Tests` (`relative_to(root)` sandbox check, 65 passing pytest tests)
4. **`robo-soccerbot.png` (800x450)**:
   - Header: `ROBO SOCCERBOT // 4WD DIFFERENTIAL CHASSIS` [HARDWARE & RF]
   - Left: Subsystem wiring bus (FS-iA6B RF, ATmega328P MCU, Dual BTS7960 43A drivers, 3S LiPo).
   - Right: Top-down 4WD chassis diagram with 4 distinct wheels, forward direction vector, and differential steering indicator.
5. **`ledgerlab.png` (800x450)**:
   - Header: `LEDGERLAB // CRYPTOGRAPHIC CHAIN SIMULATOR` [INTERACTIVE LAB]
   - Three linked blockchain blocks:
     - Genesis Block [ #1 VALID ] -> Tampered Block [ #2 HASH MISMATCH ] -> Orphaned Block [ #3 CHAIN BROKEN ]
     - SHA-256 hash previews, Proof-of-Work nonce, and colored status pills.

---

## 6. Floating UI Artifacts & Component Review

### 1. Circular Bottom-Right "N" Badge:
- **Investigation**: Inspected running processes, scripts, and DOM trees.
- **Finding**: The circular "N" badge was Next.js DevTools (`node_modules/next/dist/compiled/next-devtools`), injected exclusively when running the development server (`next dev`).
- **Production Verification**: The development server was stopped and the production server launched (`next start -p 3000`). Screenshots `01` through `11` confirm that the "N" badge is **completely absent in production builds**.

### 2. AI Chat Bar (`HomeChatBar` / `AIChatInput`):
- **Scope & Isolation**: Only active on the homepage (`if (pathname !== "/") return null`). Subpages (`/projects`, `/blog`, project case studies, and technical articles) remain completely clear of any floating elements.
- **Bottom Clearance**: Added `pb-28 sm:pb-24` to `<main>` in `layout.tsx`. When users scroll to the bottom of the homepage, the footer sits safely above the dock with generous whitespace.
- **Mobile Responsiveness**: Non-essential decorative buttons (`Paperclip`, `Mic`) are hidden on screens `< 640px` (`hidden sm:flex`). On 320px–430px viewports, the text input and Send button render with proper spacing and zero horizontal squeeze.
- **Context & Safety**: Powered by Google Gemini and Vercel AI SDK, grounded on systems documentation in `/llms.txt`, and features rate-limiting and disclaimer notices.

---

## 7. Comprehensive Screenshot Catalog

All screenshots were captured from the live production server at `http://127.0.0.1:3000/` using Chrome DevTools Protocol (CDP) device emulation:

```
screenshots/
├── 01-desktop-homepage.png        (1280x1300) - Clean desktop homepage layout with no dev badges
├── 02-mobile-320px.png            (320x680)   - Verified 320px mobile viewport (0px overflow)
├── 03-mobile-360px.png            (360x740)   - Verified 360px mobile viewport (0px overflow)
├── 04-mobile-390px.png            (390x844)   - Verified 390px mobile viewport (0px overflow)
├── 05-mobile-430px.png            (430x932)   - Verified 430px mobile viewport (0px overflow)
├── 06-projects-index.png          (1280x1300) - Full 9-project showcase with crisp thumbnails
├── 07-writings-index.png          (1280x1100) - Enhanced writings with categories, read times & summaries
├── 08-individual-project.png      (1280x1200) - ForgeShell case study with TrueType architecture card
├── 09-individual-article.png      (1280x1200) - ForgeShell deep dive with syntax-highlighted C code
├── 10-mobile-320px-article.png    (320x680)   - Verified 320px mobile article view (0px overflow)
└── 11-mobile-320px-project.png    (320x680)   - Verified 320px mobile project view (0px overflow)
```

---

## 8. Verification Summary & Completion Checklist

| Requirement | Audit Status | Evidence & Details |
| :--- | :---: | :--- |
| **No horizontal scrolling at 320px, 360px, 390px, 430px** | **PASS** | `bodyScrollWidth == innerWidth` on all tested viewports. Zero clipping. |
| **Discipline labels spaced & wrapping** | **PASS** | 6 distinct badges with `flex-wrap gap-1.5`. Neatly wraps on mobile. |
| **Concise, non-repetitive homepage intro** | **PASS** | 2 paragraphs focusing on first-principles systems, OS, hardware, and verification. |
| **Enhanced Writings experience** | **PASS** | Category badges, dynamic reading times, 2-line summaries, responsive layout. |
| **Legible, bold project diagrams** | **PASS** | TrueType Segoe UI typography; clean architectural cards with zero illegible text. |
| **Authentic assets prioritized** | **PASS** | Genuine photos/screenshots used for DEADeye, MECH-XR, STM32, and YOLO11. |
| **Next.js Dev indicator removed** | **PASS** | Eliminated in production build (`next start`). 0 floating badges. |
| **Chat bar spacing & mobile sizing** | **PASS** | `pb-28 sm:pb-24` footer clearance; non-functional buttons hidden on mobile. |
| **Zero academic / student mentions** | **PASS** | 0 occurrences of GITAM, student, semester, or degree across all files. |
| **Zero personal portraits** | **PASS** | Minimalist geometric `>_` terminal monogram used everywhere. |
| **Production build compiles cleanly** | **PASS** | `npm --prefix Jey.com run build` succeeds with code 0 (28/28 routes). |

---

*Report generated and certified on November 9, 2026.*

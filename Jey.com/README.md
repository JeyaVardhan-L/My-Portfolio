# Jeya Vardhan — Personal Engineering Portfolio

The official personal portfolio and engineering showcase of **Jeya Vardhan** ([@JeyaVardhan-L](https://github.com/JeyaVardhan-L)), a systems and software developer based in Visakhapatnam, India.

Built with **Next.js 16 (App Router with Turbopack)**, **React 19**, **Tailwind CSS v4**, and **Motion**, this portfolio presents real engineering systems across systems programming in C, robotics, autonomous navigation feasibility pipelines, embedded hardware telemetry, computer vision, and augmented/virtual reality.

---

## 🚀 Featured Engineering Projects

- **[ForgeShell](https://github.com/JeyaVardhan-L/ForgeShell)**: A POSIX-compliant Unix shell built from scratch in C for Linux with low-level process management (`fork`, `execvp`, `waitpid`), pipeline chaining (`dup2`), job control (`tcsetpgrp`), and Linux `/proc` memory/CPU parsing.
- **[AutoNav Feasibility Pipeline](https://github.com/JeyaVardhan-L/Baseline_tests_for_AutoNav)**: Empirical research pipeline evaluating whether baseline 3D LiDAR odometry (ICP) meets the 100ms real-time deadline under companion computer constraints using Oxford Newer College datasets (35 unit tests).
- **[MECH-XR](https://github.com/JeyaVardhan-L/AR_Gear_Mechanisms)**: Mobile Augmented Reality mechanical simulation platform with Google ARCore 6-DoF plane tracking, exploded assembly detachment along mechanical axes, and kinematic constraints (71 automated tests).
- **[STM32 3D Flight Telemetry](https://github.com/JeyaVardhan-L/STM32-Flight_Telemetry)**: Bare-metal I2C sensor fusion running a Complementary Filter on STM32 ARM Cortex-M3, streaming attitude data at 115200 baud via Web Serial API directly into Three.js.
- **[DEADeye VR](https://github.com/JeyaVardhan-L/DEADeyeVR)**: Standalone Meta Quest 2 6DoF tactical simulation in Unity 6 using Khronos OpenXR, with ballistic trajectory physics and dual-render optics (32 automated tests).
- **[YOLO11 Airborne Object Detection](https://github.com/JeyaVardhan-L/Train_YOLO_Customdataset)**: Ultralytics YOLO11 model trained on 8,888 aerial images to classify aircraft, birds, and drones for perimeter defense, with a 2D polar radar tracking display.
- **[Batcave_Cloud](https://github.com/JeyaVardhan-L/Batcave_Cloud)**: Self-hosted private cloud server built from scratch with Python/Flask/SQLite, running 24/7 on a repurposed Android tablet via Termux (65 unit tests).
- **[LedgerLab](https://github.com/JeyaVardhan-L/LedgerLab)**: Interactive browser-based blockchain simulator visualizing SHA-256 avalanche effects, Proof-of-Work mining, and cascading invalidation (20 unit tests, Playwright E2E).
- **[Robo Soccer Bot](https://github.com/JeyaVardhan-L/Robo_Soccerbot)**: Competition mobile robot with dual BTS7960 high-power H-bridge drivers, ATmega328P microcontroller, and 2.4GHz RF pulse decoding in C++.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16.1.6 (App Router, Turbopack, SSG/SSR hybrid)
- **UI & Runtime**: React 19.2.1, TypeScript 5
- **Styling**: Tailwind CSS v4 (CSS-first `@theme` configuration)
- **Motion & Physics**: Motion 12.40.0 (Spring-physics cursor link previews, layout transitions)
- **AI Assistant**: Vercel AI SDK 6 (`ai`, `@ai-sdk/react`, `@ai-sdk/google`) connected to Google Gemini 2.5 Flash
- **Content Engine**: `next-mdx-remote`, `sugar-high` (syntax highlighting), `remark-gfm`
- **Dynamic Endpoints**: Dynamic Open Graph generator (`/og`), RSS 2.0 XML (`/rss`), LLM context feed (`/llms.txt`), XML Sitemap (`/sitemap.xml`)

---

## 💻 Running Locally

All commands are run from inside this directory:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Compile production build:**
   ```bash
   npm run build
   npm run start
   ```

---

## ⚙️ Environment Variables (Optional)

Create a `.env.local` file inside this directory:

```bash
# Production canonical URL (defaults to https://jeyavardhan.dev if unset)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Google Gemini API Key for Homepage AI Assistant (Optional)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

# Upstash Redis for Rate Limiting (Optional)
UPSTASH_REDIS_REST_URL=your_upstash_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_rest_token
```

*Note: The website is fully functional without any API keys. If keys are omitted, the AI assistant runs in a graceful offline preview mode directing visitors to Jeya's GitHub.*

---

## 📜 License & Provenance

This project is licensed under the [MIT License](license.txt).  
Design aesthetic and layout adapted from an open-source MIT template by [Sagar Tamang](https://github.com/SAGAR-TAMANG); re-architected, personalized, and maintained by **Jeya Vardhan**.

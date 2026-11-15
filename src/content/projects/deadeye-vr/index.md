---
title: "DEADeye VR"
summary: "A marksman simulator for Meta Quest 2 with bullet ballistics and scopes that render a real second view."
date: 2026-11-04
side: software
featured: false
order: 11
tags: ["Unity 6","C#","OpenXR","Quest 2"]
repo: "https://github.com/JeyaVardhan-L/DEADeyeVR"
cover: ./cover.png
gallery:
  - { src: ./deadeye-scope.png, caption: "Through the scope: a second camera renders the magnified view." }
specs:
  - { label: "Platform", value: "Meta Quest 2, standalone" }
  - { label: "Runtime", value: "Khronos OpenXR" }
  - { label: "Rendering", value: "URP, dual-camera scopes" }
  - { label: "Tests", value: "32" }
---

## Overview

**DEADeye** is a tactical first-person urban marksman simulation engineered for standalone **Meta Quest 2** virtual reality and desktop PC platforms. Built on **Unity 6 (6000.3.27f2 LTS)** and utilizing the **Khronos OpenXR 1.16.1** standard, DEADeye demonstrates complex physical interactions, ballistic simulation, high-performance dual-render optics, and spatial immersion.

- **Engine**: Unity 6000.3.27f2 LTS
- **Render Pipeline**: Universal Render Pipeline (URP 17.3.0, Forward+)
- **Target Runtimes**: Meta Quest 2 Standalone & PCVR (OpenXR)
- **Automated Tests**: 32 passing automated tests (100% pass rate)

---

## Technical Features & Engineering Challenges

### 1. Dual-Render Optical Scopes with Parallax
Simulating high-magnification sniper optics in virtual reality is notoriously performance-intensive because it traditionally requires rendering the entire 3D scene twice per eye (quad-view rendering).
- Implemented a specialized secondary camera rendering to a high-density `RenderTexture` mapped across the internal ocular lens.
- Engineered dynamic eye-relief vignetting: if the player's VR headset moves off-center from the scope axis, the optical sight realistically clips and shadows, replicating physical firearm eye-box geometry.

### 2. Ballistic Trajectory & Projectile Simulation
Rather than instantaneous raycasting, DEADeye computes numerical projectile physics over discrete integration steps:
- **Gravity Drop**: Parabolic trajectory calculated using gravitational acceleration vectors.
- **Velocity Drag & Decay**: Air resistance coefficients based on supersonic and subsonic bullet profiles.
- **Flight Time & Lead**: Targets at 300m+ require the marksman to gauge target velocity and compensate for bullet travel time.

### 3. OpenXR 6-DoF Two-Handed Weapon Interaction
- Two-handed weapon stabilization algorithm that blends primary trigger grip orientation with secondary fore-end stabilizer position.
- Smooth recoil dissipation with procedural spring-damper offsets applied to virtual arms.
- Manual bolt cycling and magazine insertion physics utilizing spatial snap zones and trigger haptic pulses.

---

## Performance Optimizations for Meta Quest 2

Standalone mobile VR headsets have strict thermal and rendering budgets (target 72–90 FPS within 3.5W envelope). Key optimizations include:
- **Forward+ Lighting**: Allows multi-light scenes without the quadratic shader pass penalties of standard forward rendering.
- **Mesh LODs & Occlusion Culling**: Aggressively bakes static PVS cells across urban city environments.
- **Zero GC Allocations in Frame Loops**: Pre-allocated object pools for spent brass casings, bullet impacts, and audio sources.

---

## Verification & Status

- **Status**: Implemented, verified with 32 automated tests covering ballistic math, optical render texture recycling, and controller input mapping.

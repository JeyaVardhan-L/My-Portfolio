---
title: "MECH-XR"
summary: "An Android AR app that puts gearboxes and differentials on your desk and lets you pull them apart."
date: 2026-11-05
side: software
featured: false
order: 10
tags: ["Unity 6","C#","ARCore","Android"]
repo: "https://github.com/JeyaVardhan-L/AR_Gear_Mechanisms"
cover: ./cover.png
specs:
  - { label: "Engine", value: "Unity 6 LTS" }
  - { label: "Tracking", value: "ARCore, 6-DoF planes" }
  - { label: "Views", value: "assembled, exploded, live kinematics" }
  - { label: "Tests", value: "71" }
---

## Overview

**MECH-XR** is a mobile Augmented Reality (AR) mechanical engineering simulation and exploration platform developed in **Unity 6.3 LTS** using **Google ARCore**. 

The application anchors high-fidelity 3D mechanical assemblies onto physical tabletops and floors with 6-DoF spatial tracking. Engineers and researchers can observe real-time kinematic motion transfer, interactively detach components into functional exploded views along mechanical axes, and inspect live mechanical telemetry and thermodynamic power conversion in physical space.

- **Engine & Version**: Unity 6000.3.27f2 (6.3 LTS)
- **AR Framework**: Google ARCore 6.0.8
- **Target OS**: Android (API 26–36, 64-bit ARM64)
- **Automated Tests**: 71 passing automated tests

---

## Simulated Mechanical Assemblies

The platform simulates four distinct mechanical assemblies with authentic tooth geometries and gear ratio calculations:

| Mechanical Assembly | Kinematic Principle | Interactive Features |
| :--- | :--- | :--- |
| **Herringbone Gear Pair** | Double-helical opposing teeth cancel axial thrust loads while transmitting high torque smoothly. | Continuous rotation up to 120 RPM, thrust force cancellation vector visualization. |
| **Automotive Differential** | Epicyclic bevel gear train allowing drive wheels to rotate at different speeds during turns. | Real-time torque-vectoring simulation, crown gear and spider bevel gear kinematics. |
| **Simple Gear Train** | Multi-shaft speed reduction and direction reversal. | Inter-shaft velocity ratio tracking, pitch line velocity calculations. |
| **Internal Annular Gear** | Compact high-ratio planetary drive with internal tooth engagement. | Orbital motion path tracking, gear ratio telemetry. |

---

## Technical Architecture & Innovations

### 1. 6-DoF Spatial Anchoring & Plane Detection
Utilizing Google ARCore's horizontal and vertical surface classification, MECH-XR anchors mechanical systems to real-world surfaces with zero drift. Hit-testing calculates accurate real-world scale and ground plane orientation.

### 2. Kinematic Constraint Solver
Gear tooth meshing is computed through a centralized kinematic solver written in C#. Instead of relying on unreliable physics-engine collider collisions (which cause vibration and clipping at high RPM), the solver derives exact angular velocities:

```
omega_driven = -(N_drive / N_driven) * omega_drive
```

This guarantees mathematically exact, zero-jitter gear synchronization at any user-selected RPM.

### 3. Axial Exploded View Engine
Users can smoothly slide an interactive disassembly slider. The system translates each component outward along its true functional assembly axis:
- Differential side gears move axially along wheel shafts.
- Pinion gears expand radially from the spider cross.
- Crown gear detaches along the input drive axis.

---

## Verification & Test Suite

- **Status**: Implemented, tested, and built for Android ARM64 devices.
- **Automated Tests**: 71 passing automated tests verifying kinematic ratio precision, exploded transform limits, AR plane hit-test validations, and memory cleanup.

---
title: "TVC rocket"
summary: "An electric rocket that steers by tilting its own thrust, built in two phases, with an open build guide, printable parts and interactive tools."
date: 2026-11-10
side: hardware
featured: true
order: 3
status: in progress
tags: ["Teensy 4.1", "C++", "PID control", "three.js", "CAD"]
repo: "https://github.com/JeyaVardhan-L/Single-Thrust-Vector-Controlled-Rocket"
demo: "https://jeyavardhan-l.github.io/Single-Thrust-Vector-Controlled-Rocket/"
cover: ./cover.png
specs:
  - { label: "Phase 1", value: "MC-1, a monocopter steered by four vanes" }
  - { label: "Phase 2", value: "RK-1, coaxial motors on a 2-axis gimbal" }
  - { label: "Flight computer", value: "Teensy 4.1" }
  - { label: "Printed parts", value: "18 STL files" }
---

The goal is an electric thrust-vector-controlled rocket: two coaxial brushless motors on a gear-driven gimbal, steered by servos, standing on four splayed legs. It is built in two phases so that the expensive mistakes happen on a cheap vehicle first.

## Phase 1: MC-1, the monocopter

One motor, one propeller, and four servo-driven vanes in the prop wash. It exists to prove the flight computer, the attitude estimate, the control loop, the actuators, logging, failsafes and the operating procedures on something I can crash without losing much.

## Phase 2: RK-1, the rocket

The main goal. It reuses Phase 1's electronics, software core and procedures, and adds the 2-axis gimbal with a 2:1 gear stage.

## The build guide

Everything is open and runs in the browser:

- **Rocket and monocopter viewers.** Inspect every part, explode the assembly, move the gimbal live.
- **Assembly wizard.** Step-by-step build with the current step highlighted on the model.
- **PID lab.** A single-axis attitude controller with adjustable gains, latency, actuator lag and noise.
- **Gimbal and sizing calculators.** Thrust, lever arm, gear ratio, servo torque, mass budget and hover endurance.
- **Wiring and parts.** Block diagrams, Teensy 4.1 pin maps and a searchable bill of materials.

The 3D models are procedural three.js code driven by one parameter file, and they mirror the Fusion CAD tree. The printable parts are 18 separate STL files.

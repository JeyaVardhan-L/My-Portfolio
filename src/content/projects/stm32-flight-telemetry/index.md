---
title: "STM32 flight telemetry"
summary: "An STM32 reads a 6-axis IMU, fuses it into attitude on the chip, and streams it over serial into a live 3D view in the browser."
date: 2026-05-03
side: both
featured: false
order: 8
tags: ["C","STM32","I²C","Web Serial","Three.js"]
repo: "https://github.com/JeyaVardhan-L/STM32-Flight_Telemetry"
cover: ./cover.png
demo: "https://jeyavardhan-l.github.io/STM32-Flight_Telemetry/"
specs:
  - { label: "MCU", value: "STM32F103, Cortex-M3 at 72 MHz" }
  - { label: "Sensor", value: "MPU6050 over I²C" }
  - { label: "Fusion", value: "complementary filter, α = 0.98" }
  - { label: "Link", value: "115,200 baud → Web Serial" }
  - { label: "Display", value: "Three.js in the browser" }
---

## Overview

**STM32 Zero-Latency Telemetry** is an embedded systems and real-time visualization prototype demonstrating raw I2C sensor reading, on-chip mathematical sensor fusion, and direct hardware-to-browser telemetry streaming.

By leveraging the modern browser **Web Serial API**, the system connects physical flight sensors directly to Chrome or Edge, rendering high-frame-rate procedural 3D aircraft models and live sensor charts with zero external middleware (no Python or Node.js bridge servers required).

- **Microcontroller**: STM32F103C8T6 ("Blue Pill", 32-bit ARM Cortex-M3 @ 72MHz)
- **Sensor**: InvenSense MPU6050 6-Axis Accelerometer + Gyroscope
- **Frontend Stack**: Web Serial API, Three.js, Canvas Charting

---

## The Hardware Bypass & Engineering Hack

During prototype development under strict project timelines, dedicated USB-to-UART FTDI breakout adapters were unavailable. To achieve direct high-speed serial communication from the STM32 to the PC:

1. An **Arduino Uno** was placed into a hardware reset hold state by wiring its `RESET` pin directly to `GND`. This completely disabled the ATmega328P microcontroller while keeping the onboard ATmega16U2 USB-to-Serial TTL converter active.
2. The STM32 Blue Pill's hardware UART transmit pin (`PA9 / USART1_TX`) was tapped directly into the Arduino's hardware TX header (Pin 1).
3. This allowed the 72MHz ARM Cortex-M3 processor to transmit high-speed binary and formatted serial packets directly across USB at **115,200 baud** without procuring additional hardware.

---

## On-Chip Sensor Fusion: Complementary Filter

Raw IMU data suffers from two complementary physical drawbacks:
- **Accelerometers**: Accurate over long time horizons, but extremely noisy and susceptible to high-frequency vibrational spikes.
- **Gyroscopes**: Fast and responsive in the short term, but subject to persistent low-frequency bias integration drift over time.

To resolve this on bare metal without the computational overhead of an extended Kalman filter (EKF), the STM32 executes an optimized Complementary Filter in C:

```
theta_t = alpha * (theta_t-1 + omega * delta_t) + (1 - alpha) * theta_accel
```

Where `alpha = 0.98`. The high-pass filter extracts rapid rotational velocity from the gyroscope, while the low-pass filter anchors pitch and roll to gravity vectors from the accelerometer.

### Shortest-Path Euler Wrap Algorithm
To eliminate gimbal lock discontinuities and sudden 360-degree snap artifacts when passing through angular boundaries, a custom shortest-path normalization algorithm bounds delta rotations:

```c
float angle_diff = current_angle - target_angle;
while (angle_diff > 180.0f) angle_diff -= 360.0f;
while (angle_diff < -180.0f) angle_diff += 360.0f;
```

---

## Direct Hardware-to-Browser Web Serial Pipeline

```
[ MPU6050 6-DoF Sensor ]
           │
      (I2C @ 400kHz)
           ▼
[ STM32F103 ARM Cortex-M3 ]  ──>  On-Chip Complementary Filter
           │
     (UART @ 115200 Baud)
           ▼
[ USB-to-Serial TTL Bridge ]
           │
      (USB HID CDC)
           ▼
[ Browser: Web Serial API ]  ──>  navigator.serial.requestPort()
           │
           ▼
[ Three.js 3D Orientation ]  ──>  Real-time attitude rendering (60 FPS)
```

The browser client requests a native USB COM port via `navigator.serial`. Incoming serial streams are piped through a `TextDecoderStream` and processed directly in an event-driven loop, adjusting the pitch, yaw, and roll quaternions of procedural Three.js satellite, rocket, and quadcopter models in real time.

---

## Verification & Status

- **Status**: Implemented, verified on hardware.
- **Latency**: Sub-15ms end-to-end motion-to-render latency on USB COM port at 115200 baud.

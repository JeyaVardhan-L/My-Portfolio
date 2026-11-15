---
title: "Air Mouse"
summary: "A glove that works as a Bluetooth mouse: point at the screen and the cursor follows your hand, let go and you can type."
date: 2026-11-14
side: hardware
featured: true
order: 4
tags: ["ESP32", "C++", "PlatformIO", "Bluetooth HID", "IMU"]
repo: "https://github.com/JeyaVardhan-L/Air_Mouse"
demo: "https://jeyavardhan-l.github.io/Air_Mouse/"
cover: ./cover.png
specs:
  - { label: "Board", value: "ESP32 DevKit (WROOM-32)" }
  - { label: "Sensor", value: "MPU6050 gyro, read at 500 Hz" }
  - { label: "Output", value: "Bluetooth HID mouse, 125 Hz" }
  - { label: "Power", value: "1S Li-Po, TP4056, MT3608 boost" }
---

Curl two fingers, point at the screen, and the cursor follows your hand. Let go of the palm button and it stays put, so you can type without taking the glove off. It pairs like any Bluetooth mouse: no dongle, no driver.

## How you use it

| Action | How |
| --- | --- |
| Move the pointer | Hold the palm button and move your hand |
| Left, middle, right click | Three buttons on the side of the index finger, pressed with the thumb |
| Drag | Hold the palm button and left click, then move |
| Scroll | Hold the middle button and tilt your hand |
| Type | Let go of the palm button; nothing moves |

## How it works

```
gyro (500 Hz) → remove drift → level with gravity → speed curve → Bluetooth HID report (125 Hz)
```

- **Rate, not angle.** The cursor moves by how fast your hand turns, so errors never pile up and nothing jumps when you press the palm button.
- **Drift learning.** Whenever the hand rests, the gyro's zero offset is measured again and saved.

## What it is made of

An ESP32, an MPU6050, a single-cell Li-Po with a TP4056 charger and an MT3608 boost converter, four tactile buttons, a piece of perfboard and a fingerless glove. The full parts list and wiring are in the repository, and the build guide walks through every step in 3D.

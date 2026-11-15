---
title: "Robo soccer bot"
summary: "A four-wheel-drive competition robot driven by an Arduino, two 43 A motor drivers and a 2.4 GHz radio."
date: 2026-02-27
side: hardware
featured: false
order: 6
tags: ["Arduino","C++","Motor drivers","RF"]
repo: "https://github.com/JeyaVardhan-L/Robo_Soccerbot"
cover: ./cover.png
specs:
  - { label: "MCU", value: "ATmega328P (Arduino Uno)" }
  - { label: "Drivers", value: "2 × BTS7960, 43 A" }
  - { label: "Drive", value: "4WD, differential steering" }
  - { label: "Radio", value: "FlySky 2.4 GHz, PWM decoding" }
---

## Overview

The **Robo Soccer Bot** repository documents the complete end-to-end engineering journey of designing, fabricating, wiring, and programming a competition-ready mobile robot built for competitive robotics tournaments.

The robot features high-torque differential drive mechanics, high-current power switching, real-time 2.4GHz RC radio decoding, and firmware written in C++ for the Arduino platform.

- **Primary Controller**: Arduino Uno (ATmega328P)
- **Power Electronics**: Dual BTS7960 43A High-Power H-Bridge Motor Drivers
- **Actuators**: 4x High-Torque Metal Gear DC Motors (300 RPM)
- **Power Supply**: 3S Lithium Polymer (LiPo) Battery (11.1V, high discharge C-rating)
- **Control Interface**: FlySky FS-i6 2.4GHz 6-Channel Transmitter & FS-iA6B Receiver

---

## Hardware Architecture & Electrical Challenges

```
[ FlySky 2.4GHz Transmitter ]
              │ (RF Signal)
              ▼
[ FlySky FS-iA6B Receiver ] 
              │ (PWM Channels)
              ▼
    [ Arduino Uno Microcontroller ]
              │ (Direction Pins + PWM Speed)
              ├──────────────────────────────┐
              ▼                              ▼
[ Left BTS7960 Driver (43A) ]   [ Right BTS7960 Driver (43A) ]
              │                              │
              ▼                              ▼
    [ 2x Left DC Motors ]          [ 2x Right DC Motors ]
              ▲                              ▲
              └──────────────┬───────────────┘
                             │
                  [ 3S LiPo Battery 11.1V ]
```

### 1. High-Current Inductive Spike Protection
Four 300 RPM DC motors drawing stall currents under rapid direction reversal can easily induce destructive back-EMF voltage spikes and brown out the 5V logic rail.
- Utilized industrial-grade BTS7960 H-bridges featuring integrated heatsinks and MOSFET thermal shutdown protection.
- Separated high-power motor ground returns from sensitive microcontroller signal grounds (common-point star grounding).

### 2. Microsecond PWM Signal Decoding
The Arduino firmware captures pulse-width modulation signals (1000µs – 2000µs range with a 1500µs neutral deadzone) directly from the FlySky receiver channels.
- Implemented deadband thresholding in C++ (`abs(pwm - 1500) < DEADZONE`) to eliminate motor hum and jitter while resting at neutral stick positions.
- Mapped analog stick deflections into differential steering velocity curves:

```cpp
int forwardSpeed = map(ch2_pulse, 1500 + DEADZONE, 2000, 0, 255);
int turnOffset   = map(ch1_pulse, 1000, 2000, -128, 128);

int leftMotorPWM  = constrain(forwardSpeed + turnOffset, -255, 255);
int rightMotorPWM = constrain(forwardSpeed - turnOffset, -255, 255);
```

---

## Verification & Status

- **Status**: Fabricated, programmed, and field-tested in live competition matches.
- **Documentation**: Includes complete schematic wiring diagrams, hardware component breakdowns, and firmware revision history in the repository.

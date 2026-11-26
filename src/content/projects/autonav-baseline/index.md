---
title: "LiDAR compute sizing"
summary: "Measures which LiDAR and which onboard computer can run real-time LiDAR odometry, on real recordings with ground truth, before any hardware is bought."
date: 2026-10-07
side: software
featured: true
order: 1
tags: ["Python", "GICP", "small_gicp", "LiDAR", "Benchmarking"]
repo: "https://github.com/JeyaVardhan-L/lidar-compute-sizing"
cover: ./cover.png
demo: "https://jeyavardhan-l.github.io/lidar-compute-sizing/"
specs:
  - { label: "Runs", value: "168 measured" }
  - { label: "Compiled vs Python", value: "14.5 ms vs 170 ms per scan (11.7×)" }
  - { label: "Sensor", value: "about 655 k points/s (64 beams at 10 Hz)" }
  - { label: "Compute", value: "4 N100-class cores, 40 ms at P99" }
  - { label: "Tests", value: "86" }
---

A robot that localises with LiDAR odometry must finish each scan before the next
one arrives (100 ms at 10 Hz) and still leave time for mapping, planning and
control. This project measures what that takes: how many points the sensor must
deliver, how much CPU that costs, and where the method stops working. Every
number on the results site is read from a run record and tagged MEASURED,
DERIVED, EMULATED or ASSUMED.

## How it works

- **Real data.** Newer College 2020 (OS1-64) and 2021 (OS0-128) and Oxford
  Spires. A ROS-bag reader fetches only the chunks of a 30 s window over HTTP
  range requests, about 1.2 GB of a 10 GB recording.
- **Cheaper sensors from one real scan.** Dropping beam rows, columns or frames
  emulates 64, 32 and 16 beams, VLP-16- and Mid-360-like point budgets, and 5 Hz.
- **Five implementations, one frame loop.** Python ICP (plain and tuned), Python
  point-to-plane, and compiled ICP and GICP (small_gicp) share the same validity
  check, pose convention and timer.
- **Pinned compute tiers.** One or four performance or efficiency cores, plus
  ARM and x86 cloud runners. Every run records CPU, governor, power state,
  background load and commit.
- **Rules before results.** "Keeps up" means P99 ≤ 50% of the frame period;
  "accurate" means ≤ 2% drift per 10 m. Both were written down before the
  campaign.

## What I found

- **The language decided the first verdict, not the algorithm.** The same ICP
  in compiled code takes 14.5 ms per scan instead of 170 ms in Python.
- **GICP is the method to run:** 16.5 ms median and 0.08 m position error over
  22.5 m (Python ICP: 0.51 m).
- **Sensor and computer:** about 655 k points/s (64 beams at 10 Hz) on four
  N100-class cores, 40 ms per scan at P99 on the hardest motion. One core needs
  125 ms and can't keep up.
- **Where the method stops.** With fast turns (up to 34° between scans) every
  sensor fails, even the full 128-beam scan. Fast-turning platforms need
  IMU-aided odometry; more beams or cores don't fix it.
- **Conditions matter as much as code.** The same Python code ran at 750 ms per
  scan on Windows on a shared laptop and 170 ms on Ubuntu with a fixed governor.

## Limits

Handheld recordings stand in for a moving platform. It is scan-to-scan odometry
only: no IMU, no map, no loop closure. Boards I didn't measure (Raspberry Pi 5,
Jetson Orin, RK3588) are projections, tagged as such.

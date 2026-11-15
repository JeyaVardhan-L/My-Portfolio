---
title: "AutoNav baseline"
summary: "A benchmark that checks whether basic LiDAR odometry can finish inside 100 ms on a small onboard computer, using real scans from Oxford's Newer College dataset."
date: 2026-10-07
side: software
featured: true
order: 2
tags: ["Python","NumPy","SciPy","LiDAR","ICP"]
repo: "https://github.com/JeyaVardhan-L/Baseline_tests_for_AutoNav"
cover: ../../assets/projects/autonav-pipeline.png
specs:
  - { label: "Dataset", value: "Newer College, Ouster OS1-64" }
  - { label: "Deadline", value: "100 ms per scan (10 Hz)" }
  - { label: "Method", value: "voxel downsampling + KD-tree ICP" }
  - { label: "Reported", value: "P50 / P95 / P99 latency" }
  - { label: "Tests", value: "35" }
---

## Overview

The **Autonomous Navigation Baseline Research Pipeline** is an empirical, evidence-based software pipeline supporting an autonomous-navigation feasibility investigation for an autonomous robotics challenge. 

Using authentic, publicly available multi-sensor recordings from the **Newer College (Oxford)** dataset, this project quantifies the computational complexity, registration latency, and algorithmic limitations of baseline 3D LiDAR odometry under severe real-world constraints.

- **Primary Language**: Python (NumPy, SciPy, Matplotlib)
- **Automated Tests**: 35 passing unit tests
- **Budget**: $0 hardware testbed evaluating companion computer limits before physical procurement

---

## The Feasibility Question

Before procuring or building physical UAV flight hardware, companion computers (e.g., Raspberry Pi 5, Jetson Orin Nano), or 3D LiDAR sensors, teams face a foundational real-time robotics challenge:

> **Can baseline LiDAR odometry algorithms process incoming 3D point-cloud frames within the sensor's physical arrival deadline (`T_period = 1 / f_sensor`, e.g., 100 ms at 10 Hz) while operating within standard host computational and memory limits?**

If per-frame scan matching exceeds 100ms, the state estimation queue overflows, resulting in catastrophic latency accumulation, drift, and UAV instability.

---

## Experimental Methodology & Pipeline

```
Authentic Sensor Recordings (Newer College Oxford PCD/BIN)
                          │
                          ▼
            Voxel Grid Downsampling & Filtering
                          │
                          ▼
        Iterative Closest Point (ICP) Registration
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
    Computational Metrics    Navigation Accuracy
    - Wall-clock latency     - Estimated trajectory
    - P95 / P99 latency      - Relative pose error
    - Memory RSS footprint   - Cumulative drift
```

### 1. Real Sensor Data Processing
The pipeline ingests raw 3D point-cloud data from Ouster OS1-64 LiDAR sensors. It implements spatial voxel downsampling and statistical outlier removal to simulate realistic companion computer bandwidth constraints.

### 2. Iterative Closest Point (ICP) Engine
- Point-to-point and point-to-plane registration algorithms implemented with vectorized NumPy operations and SciPy KD-trees.
- Calculates rigid body 6-DoF transformations (`R in SO(3)`, `t in R^3`) between sequential point clouds.
- Evaluates convergence criteria, residual root-mean-square errors (RMSE), and condition numbers.

### 3. Computational Benchmark Metrics
- **Per-Frame Registration Latency**: High-resolution wall-clock duration to align consecutive 3D scans.
- **Distribution Analysis**: Empirical Mean, Median, 95th percentile (P95), 99th percentile (P99), and Maximum latency.
- **Deadline Violation Rate**: Percentage of frames exceeding the critical 100ms processing threshold at 10Hz.

---

## Key Experimental Findings

1. **Downsampling is Non-Negotiable**: Without aggressive voxel grid filtering (`leaf_size >= 0.2m`), raw 64-beam scans (~65,000 points) require >450ms per frame on standard CPU architectures, missing the 10Hz sensor deadline by over 350%.
2. **KD-Tree Acceleration**: Spatial partitioning reduces nearest-neighbor correspondence search from $O(N^2)$ to $O(N \log N)$, bringing median per-frame latency down to ~72ms on filtered point clouds.
3. **Hardware Implications**: Identified that single-threaded companion computers (like Raspberry Pi 4) require hardware-accelerated KD-tree search or GPU-backed scan matching to reliably maintain 10Hz odometry during aggressive flight maneuvers.

---

## Verification & Status

- **Status**: Implemented & verified.
- **Automated Tests**: 35 unit tests validating spatial transformations, voxel grid binning, nearest-neighbor query correctness, and latency profiler instrumentation.
- **Reproducibility**: Includes explicit setup scripts and dataset extraction utilities.

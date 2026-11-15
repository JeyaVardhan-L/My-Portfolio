---
title: "Can a 3D LiDAR Pipeline Meet a 10Hz Hard Deadline on Low-Power Compute?"
summary: "An empirical investigation into real-time LiDAR odometry feasibility: benchmarking point-cloud filtering, KD-tree ICP registration, and latency distributions against 100ms physical sensor deadlines on the Oxford Newer College dataset."
date: 2026-11-08
tags: ["Robotics"]
---

In autonomous robotics and unmanned aerial vehicle (UAV) systems, spatial localization is often driven by 3D LiDAR sensors. Sensors such as the Ouster OS1 or Velodyne VLP-16 spin at a mechanical frequency of 10Hz, firing laser pulses to deliver a fresh point cloud every 100 milliseconds.

This physical frequency imposes a non-negotiable hard real-time deadline:

```
T_arrival = 100 ms (at 10 Hz)
```

If the companion computer on board the vehicle takes longer than 100ms to ingest, filter, and register a single scan against previous frames, a processing backlog begins. Scans queue up in system memory, estimation latency compounds, and the vehicle's flight controller acts on increasingly stale spatial state.

Before procuring or building physical UAV flight hardware or companion computers, I developed the **Autonomous Navigation Baseline Research Pipeline** (`Baseline_tests_for_AutoNav`)—an empirical software suite using authentic recordings from the **Newer College (Oxford)** robotics dataset to systematically evaluate whether baseline Iterative Closest Point (ICP) odometry can maintain this 100ms deadline.

Here is the architectural breakdown and experimental methodology.

---

## 1. The Raw Data Challenge: 28,000 Points per Frame

The Newer College dataset captures dense 3D point clouds recorded from a sensor platform navigating historic Oxford collegiate courtyards. A single unprocessed Ouster OS1-64 frame contains approximately **28,400 raw 3D coordinate points** (`x, y, z`, plus intensity and ring index):

```
Raw data volume = 28,400 points * 3 floats * 4 bytes * 10 Hz ≈ 3.4 MB/s
```

While 3.4 MB/s is modest for host memory bandwidth, the computational complexity of point-to-point ICP registration scales with the number of points:

```
Naive ICP Search: O(N_source * N_target)
KD-Tree Accelerated ICP: O(N_source * log(N_target))
```

Attempting to run KD-tree nearest-neighbor queries on 28,400 source points against 28,400 target points across multiple iterations introduces severe processing latency that easily exceeds the 100ms threshold on low-power architectures.

---

## 2. Spatial Downsampling via Voxel Grid Filtering

To reduce registration latency, the point cloud must be downsampled without destroying structural planar surfaces (such as walls, pillars, and curbs) needed for geometric alignment.

Random downsampling is problematic because it discards critical sparse geometric edges while retaining redundant dense clusters near the sensor center. Instead, the pipeline implements a **Voxel Grid Filter**:

1. Bound the active point-cloud field (rejecting points closer than `0.5m` or farther than `50m`).
2. Divide the 3D bounding envelope into uniform cubic voxels of side length `r`.
3. Compute a spatial hash key for each coordinate:
   ```python
   voxel_x = int(np.floor(x / r))
   voxel_y = int(np.floor(y / r))
   voxel_z = int(np.floor(z / r))
   voxel_key = (voxel_x, voxel_y, voxel_z)
   ```
4. Group points within each voxel cell and replace them with their mathematical centroid:
   ```python
   centroid = np.mean(points_in_voxel, axis=0)
   ```

Increasing the voxel dimension `r` reduces point count `N` significantly: an `r = 0.20m` filter typically reduces raw 28,000-point clouds by roughly **75% to 80%**, while retaining sufficient planar structure for robust nearest-neighbor correspondence.

---

## 3. The ICP Registration Engine

Once downsampled, the current scan `P` is aligned to the reference scan `Q` by solving for the rigid Euclidean transform matrix `[R | t]`:

```
minimize: Sum || (R * p_i + t) - q_i ||^2
```

In `src/autonav_baseline/lidar/odometry.py`, the registration executes iteratively:

1. **Spatial Indexing**: Construct a balanced KD-tree from target points `Q` (`k=1` nearest neighbor).
2. **Correspondence Matching & Pruning**: Query nearest neighbors in `Q` for each `p_i` in `P`, rejecting pairs whose Euclidean separation exceeds a maximum distance threshold `d_max` (eliminating dynamic objects and newly revealed scene elements).
3. **Singular Value Decomposition (SVD)**:
   - Calculate centroids `mu_p = mean(P_matched)` and `mu_q = mean(Q_matched)`.
   - Center both point sets: `P_c = P_matched - mu_p`, `Q_c = Q_matched - mu_q`.
   - Compute cross-covariance matrix: `H = P_c^T * Q_c`.
   - Decompose via SVD: `U, S, V_T = np.linalg.svd(H)`.
   - Derive optimal rotation: `R = V_T.T * U.T`.
   - Prevent reflection singularities: if `det(R) < 0`, invert the sign of `V_T`'s final column.
   - Compute translation: `t = mu_q - R * mu_p`.
4. **Convergence Check**: Update points and repeat until the Frobenius norm of delta transformation falls below tolerance (`< 1e-4`) or the iteration ceiling is reached.

Accumulating these relative transformations produces the estimated 6-DoF vehicle trajectory:

```
T_0^k = T_0^{k-1} * T_{k-1}^k
```

---

## 4. Empirical Timing Profiler: Distribution vs. Average Latency

When profiling real-time robotics software, reporting only the *mean* latency is inadequate. A pipeline that averages 40ms but experiences periodic 120ms spikes will fail physical real-time deadlines, resulting in dropped sensor frames and tracking divergence.

In `src/autonav_baseline/timing/profiler.py`, the pipeline wraps each stage in a high-resolution timer (`time.perf_counter()`) and computes statistical distributions across scan sequences:

```python
def compute_distribution(samples: list[float]) -> dict[str, float]:
    """Compute mean, median, p95, p99, min, max, std of a series in milliseconds."""
    if not samples:
        return {"mean": 0.0, "median": 0.0, "p95": 0.0, "p99": 0.0, "min": 0.0, "max": 0.0, "std": 0.0}
    arr = np.asarray(samples, dtype=np.float64)
    return {
        "mean": float(np.mean(arr)),
        "median": float(np.median(arr)),
        "p95": float(np.percentile(arr, 95)),
        "p99": float(np.percentile(arr, 99)),
        "min": float(np.min(arr)),
        "max": float(np.max(arr)),
        "std": float(np.std(arr)),
    }
```

The profiler monitors:
- **P50 (Median)**: Baseline processing latency during nominal scene geometry.
- **P95 / P99 Percentiles**: Peak tail latencies caused by scene clutter or difficult registration convergences.
- **Deadline Violation Rate**: Percentage of frames exceeding the 100ms budget.

---

## 5. Architectural Findings & Hardware Selection Methodology

As documented in the repository's `hardware-requirements-methodology.md`, hardware selection should never precede empirical measurement. The baseline tests demonstrated:

1. **Pure Python/NumPy single-threaded KD-trees struggle under companion power limits**: Processing raw point clouds without spatial downsampling cannot sustain 10Hz. Voxel filtering is essential to bound `N`.
2. **Initial Guess Sensitivity**: Scan-to-scan ICP requires a good initial pose guess. When angular velocity increases between consecutive frames, ICP requires significantly more iterations to converge. Fusing high-rate IMU angular rates is crucial to seed `R_0`.
3. **Evidence-Driven Hardware Derivation**: Rather than guessing compute requirements (e.g., arbitrarily demanding high-end SBCs), the repository provides automated test suites (35 passing unit tests) to establish empirical bounds for memory, CPU usage, and latency before hardware procurement.

All datasets configs, registration scripts, and test suites are openly accessible in the GitHub repository.

[← back to writings](/blog)

---
title: "Mitigating Avian False Alarms in Airspace Surveillance with YOLO11"
summary: "Training Ultralytics YOLO11s on 8,888 aerial images with 15,018 annotations across Aircrafts, Birds, and Drones, achieving 90.0% mAP@50, integrated with a real-time 2D tactical polar radar display."
date: 2026-11-12
tags: ["Vision"]
---

In modern perimeter defense, critical infrastructure monitoring, and airport ground surveillance, unauthorized drones (Unmanned Aerial Systems or UAS) present significant security and operational hazards. Automated optical cameras are widely deployed to detect incoming aerial objects.

However, computer vision systems monitoring the sky face two persistent challenges:
1. **Avian False Alarms**: At medium to long distances, a bird soaring or flapping its wings exhibits visual profiles remarkably similar to small commercial multi-rotors (e.g., DJI quadcopters). Frequent bird alerts cause operator fatigue.
2. **High-Contrast Sky Backgrounds**: Detecting small aerial objects against varying sky lighting (clear, overcast, backlit) requires balanced, domain-specific training data.

To address these challenges, I built a specialized computer vision pipeline using **Ultralytics YOLO11** trained on a curated dataset of **8,888 aerial images** with **15,018 annotations**, paired with a custom real-time **2D polar tactical radar** display.

Here is an analysis of the dataset, model training benchmarks, and situational radar interface.

---

## 1. Dataset Curation and Partitioning

Effective object detection starts with clean data. Public general-purpose datasets frequently bundle high-altitude commercial airliners with ground clutter or lack balanced negative samples.

As documented in `docs/dataset.md`, the dataset contains **8,888 paired images and annotations** partitioned in an 80/20 split:
- **Train**: 7,110 images
- **Validation**: 1,778 images

### Class Distribution (15,018 Total Annotations)

The dataset balances three primary aerial classes:

| Class ID | Class Name | Train Instances | Validation Instances | Total Instances | Description |
| :---: | :--- | :---: | :---: | :---: | :--- |
| `0` | `Aircrafts` | 4,025 | 977 | **5,002** | Fixed-wing airplanes, commercial jets, and helicopters. |
| `1` | `Bird` | 3,826 | 1,159 | **4,985** | Avian wildlife flying in sky/clouds (mitigates false alarms). |
| `2` | `Drone` | 3,923 | 1,108 | **5,031** | Multi-rotor UAVs, quadcopters, and commercial drones. |
| **Total** | | **11,774** | **3,244** | **15,018** | |

---

## 2. Model Training with YOLO11 Small (`yolo11s.pt`)

The detector was trained using the **YOLO11 Small (`yolo11s.pt`)** architecture, balancing high inference frame rates on edge hardware with strong spatial feature extraction:

```python
from ultralytics import YOLO

# Initialize YOLO11 Small pretrained weights
model = YOLO('yolo11s.pt')

# Train on custom airborne dataset (640x640 resolution)
results = model.train(
    data='configs/airborne_dataset.yaml',
    epochs=100,
    imgsz=640,
    batch=16,
    optimizer='AdamW',
    patience=20, # Early stopping
    device=0,
)
```

### Architectural Features Utilized:
- **C3k2 Blocks**: Cross Stage Partial blocks with optimized kernel hierarchies, capturing fine edges (such as quadcopter rotor arms and propeller blades).
- **SPPF (Spatial Pyramid Pooling - Fast)**: Pools multi-scale spatial context without distorting aspect ratios, critical for detecting small objects against open-sky expanses.
- **C2PSA Attention**: Enhances spatial attention maps on high-contrast sky silhouettes.

---

## 3. Experimental Results & Model Benchmarks

As documented in `docs/experiments.md`, training experiments evaluated model convergence across epochs:

| Run | Architecture | Epochs Completed | Batch Size | Precision | Recall | mAP@50 | mAP@50-95 | Checkpoint |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **Run 1** | YOLO11s | 35 | 16 | 0.8728 | 0.8325 | 0.8882 | 0.5496 | `runs/detect/train/` |
| **Run 2 (Best)** | **YOLO11s** | **57** | **16** | **0.8884** | **0.8442** | **0.9002** | **0.5648** | `weights/best.pt` |

### Key Benchmark Metrics (Run 2 Checkpoint):
- **Precision**: **88.84%** across all aerial classes.
- **Recall**: **84.42%**.
- **mAP@50**: **90.02%** overall mean Average Precision at IoU threshold 0.50.
- **mAP@50-95**: **56.48%** across IoU thresholds from 0.50 to 0.95.

The model achieved early convergence around epoch 54–57, successfully distinguishing quadcopter rotor geometries from organic bird wing shapes.

---

## 4. Live 2D Polar Tactical Radar Interface

Raw bounding boxes on a video feed can be difficult for operators to monitor during rapid multi-target events. In `src/inference/radar.py` and `scripts/radar_detect.py`, the repository provides a live **2D Polar Tactical Radar HUD**:

1. **Centroid Normalization**: For each detection, the bounding box centroid `(x_c, y_c)` is extracted from the camera frame.
2. **Angular Bearing `theta`**: The horizontal pixel displacement from frame center is mapped across the camera's horizontal field of view (HFOV):
   ```python
   # Bearing angle relative to camera optical axis
   bearing_deg = (x_center - frame_width / 2.0) * (HFOV / frame_width)
   ```
3. **Range Estimation**: Estimated optical range is calculated from bounding box scale relative to target class priors.
4. **Polar Rendering**: Targets are plotted on a rotating green polar PPI (Plan Position Indicator) sweep display:
   - Green blips represent general aircraft.
   - Yellow blips represent avian wildlife (suppressing operator alarm).
   - Red blips highlight confirmed drone targets with range and bearing tags.

---

## 5. Summary & Engineering Artifacts

This project demonstrates practical computer vision for perimeter surveillance:

- **15,018 verified annotations** across 8,888 images provided balanced training data for the aerial domain.
- **YOLO11s checkpoint (`weights/best.pt`)** delivers **90.0% mAP@50** and **88.8% precision**.
- **Tactical radar interface** transforms bounding box pixel coordinates into spatial situational awareness.

All training scripts, validation configs, dataset documentation, and radar utilities are openly available in the GitHub repository.

[← back to writings](/blog)

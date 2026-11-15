---
title: "Airborne YOLO"
summary: "A YOLO11 detector that tells aircraft, birds and drones apart in sky images, with a radar-style view and an honest look at where it fails."
date: 2026-11-10
side: software
featured: true
order: 4
tags: ["Python", "PyTorch", "YOLO11", "Computer vision"]
repo: "https://github.com/JeyaVardhan-L/Train-YOLO-with-custom-Dataset"
cover: ../../assets/projects/yolo-overview.png
specs:
  - { label: "Model", value: "YOLO11s, fine-tuned" }
  - { label: "Data", value: "8,888 images, 15,018 labels" }
  - { label: "mAP@50", value: "0.899 on 1,778 validation images" }
  - { label: "mAP@50-95", value: "0.557" }
  - { label: "Weakest class", value: "Bird, 0.864 mAP@50" }
---

A camera watching the sky for drones is useless if it panics every time a bird flies past. This model sorts what it sees into three classes, aircraft, birds and drones, and draws the detections on a radar scope so you can tell at a glance where things are.

## Results

Measured on the 1,778-image validation split at 640 px:

| Class | Precision | Recall | mAP@50 | mAP@50-95 |
| --- | --- | --- | --- | --- |
| All | 0.887 | 0.850 | 0.899 | 0.557 |
| Aircraft | 0.887 | 0.868 | 0.902 | 0.588 |
| Bird | 0.867 | 0.789 | 0.864 | 0.428 |
| Drone | 0.906 | 0.895 | 0.931 | 0.654 |

## What I would trust less

- **Some validation images are near-copies of training images.** 173 of the 1,778 (9.7%) share a source photo with a training image, so these scores are probably optimistic.
- **Birds are the weakest class.** One tern gets labelled as an aircraft with 83% confidence.
- The validation split also picked the checkpoint, and each setting was trained once, so there is no spread across seeds.

## The radar view

Each detection's position in the frame is converted to polar coordinates and drawn as a blip on a circular scope, which turns a busy image into something you can read in a second.

## The guide

The repository doubles as an eleven-chapter guide to training YOLO on your own data: planning, labelling, splitting without leaking, training and using the model. Every example comes from this project, and 50 sample images let you try each step in minutes.

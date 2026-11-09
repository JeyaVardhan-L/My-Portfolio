export interface ProjectRecord {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  summary: string;
  image: string;
  tech: string;
  githubUrl: string;
  featured: boolean;
  tier: 1 | 2 | 3;
  status: 'Implemented & Verified' | 'Prototype & Active';
}

export const PROJECTS: ProjectRecord[] = [
  // Tier 1: Core Systems & Robotics Identity (Top Prominence)
  {
    slug: 'autonav-baseline',
    title: 'Autonomous Navigation Baseline Research Pipeline',
    category: 'Robotics & Autonomous Systems',
    publishedAt: '2026-04-20',
    summary: 'An empirical research pipeline evaluating whether baseline 3D LiDAR odometry (ICP) meets the 100ms arrival deadline under companion computer constraints using authentic Oxford Newer College datasets for an autonomous robotics challenge.',
    image: '/projects/autonav-pipeline.png',
    tech: 'Python, NumPy, SciPy, Matplotlib, LiDAR Odometry, ICP',
    githubUrl: 'https://github.com/JeyaVardhan-L/Baseline_tests_for_AutoNav',
    featured: true,
    tier: 1,
    status: 'Implemented & Verified',
  },
  {
    slug: 'forgeshell',
    title: 'ForgeShell: Resource-Aware Unix Shell in C',
    category: 'Systems Programming & OS Internals',
    publishedAt: '2026-04-10',
    summary: 'A POSIX-compliant Unix shell built from scratch in C for Linux, featuring low-level process lifecycle management, IPC pipeline plumbing, job control, and deep Linux /proc memory and CPU observability.',
    image: '/projects/forgeshell-terminal.png',
    tech: 'C, Linux, POSIX API, Signals, IPC, Virtual Filesystem',
    githubUrl: 'https://github.com/JeyaVardhan-L/ForgeShell',
    featured: true,
    tier: 1,
    status: 'Implemented & Verified',
  },
  {
    slug: 'airborne-yolo',
    title: 'YOLO11 Airborne Object Detection & Tactical Radar',
    category: 'Computer Vision & AI',
    publishedAt: '2026-03-30',
    summary: 'An Ultralytics YOLO11 vision model trained on 8,888 aerial images to classify aircraft, birds, and drones, mitigating avian false alarms for perimeter security, accompanied by a real-time 2D tactical radar display.',
    image: '/projects/yolo-airborne.png',
    tech: 'Python, PyTorch, Ultralytics YOLO11, Computer Vision',
    githubUrl: 'https://github.com/JeyaVardhan-L/Train_YOLO_Customdataset',
    featured: true,
    tier: 1,
    status: 'Implemented & Verified',
  },
  {
    slug: 'stm32-flight-telemetry',
    title: 'STM32 Zero-Latency 3D Flight Telemetry & Sensor Fusion',
    category: 'Embedded Systems & Sensor Fusion',
    publishedAt: '2026-03-15',
    summary: 'Bare-metal I2C sensor fusion running a Complementary Filter directly on an STM32 ARM Cortex-M3 microcontroller, streaming attitude data at 115200 baud via Web Serial API directly into a browser-based Three.js 3D dashboard.',
    image: '/projects/stm32-telemetry.png',
    tech: 'STM32, ARM Cortex-M3, C, Web Serial API, Three.js, MPU6050',
    githubUrl: 'https://github.com/JeyaVardhan-L/STM32-Flight_Telemetry',
    featured: true,
    tier: 1,
    status: 'Implemented & Verified',
  },

  // Tier 2: Supporting Systems & Applied Hardware
  {
    slug: 'batcave-cloud',
    title: 'Batcave_Cloud: Self-Hosted Personal Server on Hardware',
    category: 'Cloud, Networking & Systems',
    publishedAt: '2026-02-20',
    summary: 'A private personal cloud server built from scratch with Python, Flask, and SQLite featuring session auth, CSRF defense, and filesystem sandboxing, deployed on a repurposed Samsung Galaxy tablet via Termux.',
    image: '/projects/batcave-cloud.png',
    tech: 'Python, Flask, SQLite, Linux, Termux, Hardware Repurposing',
    githubUrl: 'https://github.com/JeyaVardhan-L/Batcave_Cloud',
    featured: false,
    tier: 2,
    status: 'Implemented & Verified',
  },
  {
    slug: 'robo-soccerbot',
    title: 'Robo Soccer Bot: High-Torque Mobile Robotic Chassis',
    category: 'Robotics & Hardware',
    publishedAt: '2026-02-01',
    summary: 'A competition-grade mobile soccer robot built with an Arduino Uno, dual BTS7960 high-current H-bridge motor drivers, 4 high-RPM DC motors, and FlySky 2.4GHz RF control, featuring firmware PWM arbitration and power isolation.',
    image: '/projects/robo-soccerbot.png',
    tech: 'Arduino Uno, C++, BTS7960 Motor Drivers, RF Control, Electronics',
    githubUrl: 'https://github.com/JeyaVardhan-L/Robo_Soccerbot',
    featured: false,
    tier: 2,
    status: 'Implemented & Verified',
  },
  {
    slug: 'ledgerlab',
    title: 'LedgerLab: Interactive Blockchain Laboratory',
    category: 'Distributed Systems & Cryptography',
    publishedAt: '2026-01-15',
    summary: 'An open-source, browser-based blockchain simulator that interactively demonstrates SHA-256 cryptographic avalanche effects, Proof-of-Work mining, block tampering, cascading downstream invalidation, and 51% attacks.',
    image: '/projects/ledgerlab.png',
    tech: 'TypeScript, React, SHA-256, Playwright, E2E Testing',
    githubUrl: 'https://github.com/JeyaVardhan-L/LedgerLab',
    featured: false,
    tier: 2,
    status: 'Implemented & Verified',
  },

  // Tier 3: Spatial Computing & Immersive Systems
  {
    slug: 'mech-xr',
    title: 'MECH-XR: Augmented Reality Mechanical Systems Explorer',
    category: 'Augmented Reality & Spatial Computing',
    publishedAt: '2025-12-10',
    summary: 'An interactive mobile AR application built with Unity 6 LTS and Google ARCore to place 3D mechanical assemblies (herringbone gears, automotive differentials) on physical surfaces with 6-DoF tracking, exploded views, and live telemetry.',
    image: '/projects/mech-xr.png',
    tech: 'Unity 6 LTS, C#, Google ARCore, Android, Kinematics',
    githubUrl: 'https://github.com/JeyaVardhan-L/AR_Gear_Mechanisms',
    featured: false,
    tier: 3,
    status: 'Implemented & Verified',
  },
  {
    slug: 'deadeye-vr',
    title: 'DEADeye VR: Tactical Ballistics Simulation in OpenXR',
    category: 'Virtual Reality & Simulation',
    publishedAt: '2025-11-20',
    summary: 'A 6DoF standalone virtual reality tactical marksman simulation developed for Meta Quest 2 and PC using Unity 6 and Khronos OpenXR, incorporating ballistic physics, dual-camera scope rendering, and realistic weapon mechanics.',
    image: '/projects/deadeye-vr.png',
    tech: 'Unity 6 LTS, C#, URP, Khronos OpenXR, Meta Quest 2',
    githubUrl: 'https://github.com/JeyaVardhan-L/DEADeyeVR',
    featured: false,
    tier: 3,
    status: 'Implemented & Verified',
  },
];

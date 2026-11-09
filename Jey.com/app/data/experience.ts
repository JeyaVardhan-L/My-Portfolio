export interface TimelineItem {
  period: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
  type: 'systems' | 'robotics' | 'embedded' | 'initiative';
  link?: string;
}

export const TIMELINE: TimelineItem[] = [
  {
    period: '2024 – Present',
    title: 'Systems Programming & OS Internals',
    organization: 'ForgeShell & Unix Systems',
    location: 'Visakhapatnam, India',
    description: 'Engineering low-level Unix systems software from scratch in C for Linux, focusing on POSIX process lifecycles, IPC pipelines, signal handling semantics, and /proc virtual memory inspection.',
    highlights: [
      'Engineered ForgeShell: a POSIX-compliant shell with foreground/background job control (tcsetpgrp), signal isolation, and multi-stage process pipelines (dup2).',
      'Implemented low-level /proc parsers extracting resident set size (RSS), virtual memory layout, and CPU user/kernel ticks directly from kernel data structures.',
    ],
    type: 'systems',
    link: 'https://github.com/JeyaVardhan-L/ForgeShell',
  },
  {
    period: '2024 – Present',
    title: 'Autonomous Navigation & Perception Research',
    organization: 'AutoNav Pipeline',
    location: 'Visakhapatnam, India',
    description: 'Investigating real-time computational feasibility of 3D LiDAR odometry (ICP) under physical 10Hz (100ms) arrival deadlines using authentic Oxford Newer College datasets on companion-class compute.',
    highlights: [
      'Engineered an empirical benchmark pipeline with 35 passing automated unit tests verifying point-cloud downsampling and convergence.',
      'Quantified voxel grid downsampling efficiency and registration latency distributions (P50/P95/P99) under low-power compute budgets.',
    ],
    type: 'robotics',
    link: 'https://github.com/JeyaVardhan-L/Baseline_tests_for_AutoNav',
  },
  {
    period: '2024 – Present',
    title: 'Embedded Hardware & Sensor Fusion',
    organization: 'STM32 Telemetry & Robotics Lab',
    location: 'Visakhapatnam, India',
    description: 'Hands-on construction of bare-metal microcontroller firmware, real-time sensor fusion algorithms, high-current robotic motor drivers, and browser-based telemetry dashboards.',
    highlights: [
      'Developed bare-metal ARM Cortex-M3 (STM32) firmware running on-chip Complementary Filter math on MPU6050 raw IMU registers.',
      'Engineered zero-driver Web Serial API bridge streaming 115200 baud packets into Three.js 3D attitude dashboards.',
      'Built competition 4WD mobile robotic chassis with dual BTS7960 43A motor drivers and 2.4GHz RF pulse decoding.',
    ],
    type: 'embedded',
    link: 'https://github.com/JeyaVardhan-L/STM32-Flight_Telemetry',
  },
];

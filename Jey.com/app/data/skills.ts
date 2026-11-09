export interface SkillCategory {
  category: string;
  description: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Systems & Low-Level Programming',
    description: 'Process lifecycles, IPC, POSIX terminal job control, Linux /proc filesystem, virtual memory.',
    skills: ['C (C99/C11)', 'Linux / UNIX API', 'POSIX Signals', 'Process Management (fork/exec)', 'File Descriptors & Pipes', 'Bash Scripting'],
  },
  {
    category: 'Embedded Systems & Telemetry',
    description: 'Microcontroller firmware, bare-metal sensor reading, sensor fusion, hardware serial streaming.',
    skills: ['STM32 (ARM Cortex-M3)', 'Arduino', 'MPU6050 6-Axis IMU', 'Complementary Filter', 'Web Serial API', 'I2C & UART Protocols'],
  },
  {
    category: 'Robotics & Autonomous Navigation',
    description: 'Point-cloud processing, LiDAR odometry evaluation, pathfinding algorithms, mobile robot platforms.',
    skills: ['Iterative Closest Point (ICP)', 'LiDAR Point Clouds (Oxford Newer College)', 'A* Grid Pathfinding', 'BTS7960 Motor Drivers', 'RF Pulse Decoding', 'Differential Drive Dynamics'],
  },
  {
    category: 'Computer Vision & AI',
    description: 'Object detection model training, custom dataset annotation, tactical tracking interfaces.',
    skills: ['Ultralytics YOLO11', 'PyTorch', 'Data Annotation & Partitioning', 'Real-time Radar Visualizer', 'Python', 'NumPy / SciPy'],
  },
  {
    category: 'Augmented & Virtual Reality (XR)',
    description: 'Interactive mechanical kinematics, 6DoF spatial tracking, ballistic simulation, OpenXR pipeline.',
    skills: ['Unity 6 (6000 LTS)', 'C#', 'Khronos OpenXR', 'Google ARCore', 'Universal Render Pipeline (URP)', 'Meta Quest 2', 'Mechanical Kinematics'],
  },
  {
    category: 'Software Engineering & Web',
    description: 'Full-stack application development, test automation, cryptography sandboxes, self-hosted infrastructure.',
    skills: ['TypeScript', 'React / Next.js', 'Python / Flask', 'SQLite', 'Playwright / Vitest', 'HTML5 / Three.js', 'Termux / Home Server'],
  },
];


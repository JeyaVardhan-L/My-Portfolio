export const PROFILE = {
  name: 'Jeya Vardhan',
  fullName: 'Lekkala Jeyavardhan',
  handle: 'JeyaVardhan-L',
  nativeScript: 'లేక్కల జయవర్ధన్', // Telugu script for Lekkala Jeyavardhan
  title: 'Systems, Robotics & Software Engineer',
  headline: 'Systems, Autonomous Robotics & Embedded Software Developer',
  tagline: 'building real systems across software and hardware',
  location: 'Visakhapatnam, India',
  locationNative: 'విశాఖపట్నం', // Telugu script for Visakhapatnam
  interests: [
    'systems programming',
    'robotics & autonomous navigation',
    'embedded hardware & telemetry',
    'computer vision',
    'ar/vr simulation',
  ],
  bio: `Software and systems developer focused on low-level systems programming in C, autonomous robotics, hardware-software integration, and computer vision.`,
  bioDetail: `I build across the stack from first principles: from resource-aware Unix shells in C and bare-metal sensor fusion on STM32 to autonomous LiDAR navigation feasibility pipelines, computer vision models, and 6DoF virtual/augmented reality simulations.`,
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://jeyavardhan.dev',
  githubUrl: 'https://github.com/JeyaVardhan-L',
} as const;

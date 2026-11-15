// Everything personal that is not a project or a piece of writing lives here.
// Leave a value as '' to hide it everywhere on the site.

export const SITE = {
  name: 'Jeya Vardhan',
  fullName: 'Lekkala Jeyavardhan',
  nameTe: 'జయవర్ధన్',
  location: 'Visakhapatnam, India',
  locationTe: 'విశాఖపట్నం',
  coords: '17.69° N, 83.22° E',
  description:
    'Jeya Vardhan builds systems software and the hardware it runs on: shells, perception pipelines, vision models, rockets, wearables and robots.',

  // The "Now" band on the home page.
  now: 'Learning how transformers work, one attention head at a time.',

  email: '',
  github: 'https://github.com/JeyaVardhan-L',
  linkedin: '',
  resume: '', // e.g. '/resume.pdf' after adding public/resume.pdf

  // The two sides of the home page. Neither is the "main" one.
  intro: {
    software: {
      label: 'Software side',
      fields: 'Systems · Robotics · Vision · XR',
      statement:
        'I write systems software: a Unix shell in C, LiDAR odometry racing a 10 Hz clock, a model that tells drones from birds, and AR and VR tools.',
    },
    hardware: {
      label: 'Hardware side',
      fields: 'Rockets · Wearables · Robots · Telemetry',
      statement:
        'I build hardware: a rocket that steers its own thrust, a mouse you wear on your hand, flight telemetry on a Blue Pill and a soccer robot with 43 A drivers.',
    },
  },

  // "On the bench" list on the hardware side.
  bench: [
    { part: 'STM32F103 “Blue Pill”', use: 'Flight telemetry' },
    { part: 'Teensy 4.1', use: 'TVC rocket flight computer' },
    { part: 'ESP32 WROOM-32', use: 'Air Mouse' },
    { part: 'Arduino Uno', use: 'Soccer bot, USB–UART bridge' },
    { part: 'MPU6050 IMU', use: 'Telemetry, Air Mouse' },
    { part: 'BTS7960 43 A drivers', use: 'Soccer bot' },
    { part: 'FlySky 2.4 GHz radio', use: 'Soccer bot' },
    { part: 'TP4056 + MT3608', use: 'Air Mouse power' },
  ],
} as const;

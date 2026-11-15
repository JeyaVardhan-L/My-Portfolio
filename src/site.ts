// Everything personal that is not a project or a piece of writing lives here.
// Leave a value as '' to hide it everywhere on the site.

export const SITE = {
  name: 'Jeya Vardhan',
  fullName: 'Lekkala Jeyavardhan',
  nameTe: 'జయవర్ధన్',
  location: 'Visakhapatnam, India',
  locationTe: 'విశాఖపట్నం',
  description:
    'Jeya Vardhan writes low-level and real-time software, and builds the hardware it runs on.',

  // The "Now" line on the home page.
  now: 'Learning how transformers work, one attention head at a time.',

  email: '',
  github: 'https://github.com/JeyaVardhan-L',
  linkedin: '',
  resume: '', // e.g. '/resume.pdf' after adding public/resume.pdf

  intro: {
    software: {
      kicker: 'Jeya Vardhan · Software side',
      headline: 'Software for things that <em>move</em>.',
      body:
        "I'm Jeya, a computer science student in Visakhapatnam. I write low-level and real-time code: a Unix shell in C, LiDAR odometry that has to finish inside 100 ms, a detector that tells drones from birds, and AR and VR tools in Unity.",
    },
    hardware: {
      kicker: 'Jeya Vardhan · Hardware side',
      headline: 'And the things it <em>runs on</em>.',
      body:
        'A smaller corner of my work, with solder on it: a rocket that steers its own thrust, a mouse you wear on your hand, flight telemetry from a three-dollar board, and a soccer robot with 43-amp motor drivers.',
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

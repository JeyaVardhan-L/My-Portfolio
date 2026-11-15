// Everything personal that is not a project or a piece of writing lives here.
// Leave a value as '' to hide it everywhere on the site.

export const SITE = {
  name: 'Jeya Vardhan',
  fullName: 'Lekkala Jeyavardhan',
  nameTe: 'జయవర్ధన్',
  location: 'Visakhapatnam, India',
  locationTe: 'విశాఖపట్నం',
  coords: '17.69° N · 83.22° E',
  description:
    'Jeya Vardhan builds systems software and the hardware it runs on: perception pipelines, servers, rockets, wearables and robots.',

  // A short line shown small at the bottom of the home page hero.
  now: 'Learning how transformers work',

  email: '',
  github: 'https://github.com/JeyaVardhan-L',
  linkedin: '',
  resume: '', // e.g. '/resume.pdf' after adding public/resume.pdf

  // The two sides of the home page. Neither is the "main" one.
  intro: {
    software: { label: 'Software side', fields: 'Systems · Robotics · Vision' },
    hardware: { label: 'Hardware side', fields: 'Rockets · Wearables · Robots' },
  },

  // Credits for the engravings in src/assets/art/ (change these if you swap the pictures)
  art: {
    hero: 'Fig. 01 — Himalayan view, steel engraving, c. 1860',
    footer: 'Waves, wood engraving from Picturesque America, 1872',
  },

  // "On the bench" list on the hardware side.
  bench: [
    { part: 'STM32F103 “Blue Pill”', use: 'Flight telemetry' },
    { part: 'Teensy 4.1', use: 'TVC rocket flight computer' },
    { part: 'ESP32 WROOM-32', use: 'Air Mouse' },
    { part: 'Arduino Uno', use: 'Soccer bot, USB–UART bridge' },
    { part: 'MPU6050 IMU', use: 'Telemetry, Air Mouse' },
    { part: 'BTS7960 43 A drivers', use: 'Soccer bot' },
  ],
} as const;

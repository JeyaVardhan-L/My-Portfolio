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

  email: 'jeyastrophysics@gmail.com',
  phone: '+91 81068 33178', // shown as written; the call link uses the digits
  github: 'https://github.com/JeyaVardhan-L',
  linkedin: '',
  resume: '', // e.g. '/resume.pdf' after adding public/resume.pdf

  // The two sides of the home page. Neither is the "main" one.
  intro: {
    software: { label: 'Software side', fields: 'Systems · Robotics · Vision' },
    hardware: { label: 'Hardware side', fields: 'Rockets · Wearables · Robots' },
  },

  // Credit for the footer engraving. (The home hero, Edy's Drøbak, 1820, is
  // public domain and credited in the README only.)
  art: {
    footer: 'Waves, wood engraving from Picturesque America, 1872',
  },

  // "On the bench" on the hardware side: the one thing being built right now.
  // The drawing next to it is src/components/CanSat.astro.
  bench: {
    title: 'CanSat',
    status: 'In progress',
    summary:
      'A satellite the size of a soda can. It carries sensors and a camera to record the flight, a gyro stabiliser, and a parachute that deploys on the way down. I am building it now. Next comes the launch vehicle that will carry it up.',
    specs: [
      { label: 'Payload', value: 'Sensors + camera' },
      { label: 'Stabilisation', value: 'Gyro stabiliser' },
      { label: 'Recovery', value: 'Deployable parachute' },
      { label: 'Next', value: 'Launch vehicle' },
    ],
  },
} as const;

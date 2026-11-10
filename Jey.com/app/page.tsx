import MainHeader from './components/header'
import Current from './components/current'
import Previous from './components/previous'
import Writings from './components/writings'
import Builds from './components/builds'
import Contact from './components/contact'
import { baseUrl } from './sitemap'
import { PROFILE } from './data/profile'

export default function Page() {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE.name,
    alternateName: [PROFILE.fullName, PROFILE.handle, `@${PROFILE.handle}`],
    url: baseUrl,
    image: `${baseUrl}/icon.png`,
    jobTitle: PROFILE.title,
    knowsAbout: [
      'Systems Programming',
      'C Programming',
      'Operating Systems',
      'Linux Internals',
      'Robotics',
      'Autonomous Navigation',
      'Embedded Systems',
      'STM32',
      'Computer Vision',
      'Ultralytics YOLO',
      'Virtual Reality',
      'Khronos OpenXR',
      'Unity Engine',
      'TypeScript',
      'Python',
    ],
    sameAs: [
      PROFILE.githubUrl,
    ],
  }

  return (
    <div className="flex flex-col gap-figma-outside-gap">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <MainHeader />
      <Current />
      <Builds />
      <Writings />
      <Previous />
      <Contact />
    </div>
  )
}

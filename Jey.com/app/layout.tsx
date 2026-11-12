import './global.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import Navbar from './components/nav'
import HomeChatBar from './components/home-chat-bar'
import { baseUrl } from './sitemap'
import { Manrope, Playfair } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { PROFILE } from './data/profile'

const playfair = Playfair({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  style: ['normal', 'italic'],
})

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  style: ['normal'],
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${PROFILE.name} | Systems, Robotics & Engineering Portfolio`,
    template: `%s | ${PROFILE.name}`,
  },
  description: `${PROFILE.name} is a systems, robotics, and software engineer based in Visakhapatnam. Building real systems across low-level software in C, autonomous navigation, embedded hardware, and spatial computing.`,
  keywords: [
    PROFILE.name,
    PROFILE.fullName,
    PROFILE.handle,
    'Systems Programming',
    'C',
    'Linux Internals',
    'Robotics',
    'Autonomous Navigation',
    'LiDAR Odometry',
    'STM32',
    'Embedded Systems',
    'Sensor Fusion',
    'Unity OpenXR',
    'Virtual Reality',
    'Augmented Reality',
    'Computer Vision',
    'YOLO11',
  ],
  authors: [{ name: PROFILE.name, url: baseUrl }],
  creator: PROFILE.name,
  alternates: {
    canonical: baseUrl,
    types: {
      'application/rss+xml': `${baseUrl}/rss`,
    },
  },
  openGraph: {
    title: `${PROFILE.name} | Systems, Robotics & Engineering Portfolio`,
    description: `Personal engineering portfolio of ${PROFILE.name}. Inspectable systems across C, robotics, STM32, and simulation.`,
    url: baseUrl,
    siteName: `${PROFILE.name} — Engineering Portfolio`,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PROFILE.name} | Engineering Portfolio`,
    description: `Building real systems across C, robotics, embedded telemetry, and spatial computing.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-foreground bg-background',
        playfair.variable,
        manrope.variable
      )}
    >
      <body className="font-serif antialiased max-w-2xl mx-auto px-4 my-12 lg:my-20 text-sm md:text-base tracking-tight lowercase">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0 pb-28 sm:pb-24">
          <Navbar />
          {children}
          <Footer />
          <HomeChatBar />
          <Analytics />
          <SpeedInsights />
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
          )}
        </main>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Fraunces, Inter, Raleway, Dancing_Script } from 'next/font/google'
import './globals.css'

/* Use unique CSS var names so they don't clash with @theme tokens */
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--fraunces-font',
  display: 'swap',
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--inter-font',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})
const raleway = Raleway({
  subsets: ['latin'],
  variable: '--raleway-font',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})
const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--dancing-font',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const BASE_URL = 'https://www.thedayoffclub.in'

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'The Day Off Club | Creative Workshops & Community Events in Nagpur',
    template: '%s | The Day Off Club',
  },
  description:
    'The Day Off Club curates intentional experiences — creative workshops, puppy yoga, pottery, and community events in Nagpur — that help you slow down, learn, connect, and give back.',
  keywords: [
    'The Day Off Club',
    'Day Off Club Nagpur',
    'workshops Nagpur',
    'puppy yoga Nagpur',
    'creative workshops Nagpur',
    'pottery workshop Nagpur',
    'community events Nagpur',
    'wellness workshops India',
    'intentional experiences',
    'slow living',
  ],
  authors: [{ name: 'The Day Off Club', url: BASE_URL }],
  creator: 'The Day Off Club',
  publisher: 'The Day Off Club',

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'The Day Off Club',
    title: 'The Day Off Club | Creative Workshops & Community Events in Nagpur',
    description:
      'Creative workshops, puppy yoga, pottery & community events in Nagpur. Curated intentional experiences that help you slow down, learn, connect, and give back.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Day Off Club — Slow Down. Learn. Connect. Give Back.',
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    site: '@thedayoffclub',
    creator: '@thedayoffclub',
    title: 'The Day Off Club | Creative Workshops & Community Events in Nagpur',
    description:
      'Creative workshops, puppy yoga, pottery & community events in Nagpur. Curated intentional experiences that help you slow down and give back.',
    images: ['/og-image.png'],
  },

  // ── Icons & Manifest ──────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/circle.png', type: 'image/png' },
    ],
    apple: [
      { url: '/circle.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/circle.png',
  },
  manifest: '/manifest.webmanifest',

  // ── Crawling ──────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${raleway.variable} ${dancing.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}

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

export const metadata: Metadata = {
  title: 'The Day Off Club — Slow Down. Learn. Connect. Give Back.',
  description:
    'The Day Off Club curates intentional experiences that help you slow down, learn, connect, and give back — so your break feels productive, not guilty.',
  icons: {
    icon: '/circle.png',
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

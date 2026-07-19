import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Day Off Club',
    short_name: 'Day Off Club',
    description:
      'Intentional experiences — creative workshops, puppy yoga & community events in Nagpur that help you slow down, learn, connect, and give back.',
    start_url: '/',
    display: 'standalone',
    background_color: '#d0e8fb',
    theme_color: '#1a3f6b',
    icons: [
      {
        src: '/circle.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/circle.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/circle.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}

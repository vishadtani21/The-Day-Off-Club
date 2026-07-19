import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/claudia', '/claudia/'],
      },
    ],
    sitemap: 'https://www.thedayoffclub.in/sitemap.xml',
  }
}

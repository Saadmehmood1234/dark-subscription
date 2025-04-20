// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Uncomment if you have pages you want to block
      // disallow: '/private/',
    },
    sitemap: [
      'https://www.primeflix.site/sitemap.xml',
      // Add additional sitemaps if you have them
      // 'https://www.primeflix.site/sitemap-products.xml',
      // 'https://www.primeflix.site/sitemap-categories.xml',
    ],
    // Optional: Add host if you want to specify preferred domain
    host: 'https://www.primeflix.site',
  }
}
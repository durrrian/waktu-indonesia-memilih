import { BASE_URL } from '@/lib/parse-url'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/kebijakan-privasi', '/terms-of-service', '/login', '/invite/*'],
        disallow: ['/form/*', '/not-allowed', '/api/webhook/clerk'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}

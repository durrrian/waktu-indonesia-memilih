import { BASE_URL } from '@/lib/parse-url'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/og*', '/kebijakan-privasi', '/terms-of-service', '/login'],
        disallow: ['/form/*', '/not-allowed', '/api/webhook/clerk'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}

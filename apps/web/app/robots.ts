import { BASE_URL } from '@/lib/parse-url'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}

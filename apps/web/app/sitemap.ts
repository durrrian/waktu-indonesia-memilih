import { BASE_URL } from '@/lib/parse-url'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesArr = ['', '/login', '/kebijakan-privasi', '/terms-of-service']

  const routesMap: MetadataRoute.Sitemap = routesArr.map((v) => {
    return {
      url: `${BASE_URL}${v}`,
      lastModified: new Date(),
    }
  })

  return routesMap
}

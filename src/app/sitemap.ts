import { MetadataRoute } from 'next'
import { client } from '../sanity/lib/client'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = 'https://remotevakil.com'

  const posts = await client.fetch(`*[_type == "post"] { slug, publishedAt, _updatedAt }`).catch(() => [])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post: any) => ({
    url: `${BASE}/blog/${post.slug?.current}`,
    lastModified: new Date(post._updatedAt || post.publishedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...blogRoutes]
}

import { MetadataRoute } from 'next'
import { client } from '../sanity/lib/client'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE = 'https://remotevakil.com'

  const posts = await client
    .fetch(`*[_type == "post" && defined(slug.current)] { "slug": slug.current, publishedAt, _updatedAt }`)
    .catch(() => [])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ]

  interface SitemapPost {
    slug?: string;
    publishedAt?: string;
    _updatedAt?: string;
  }

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((post: SitemapPost) => Boolean(post?.slug))
    .map((post: SitemapPost) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt || post.publishedAt || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  return [...staticRoutes, ...blogRoutes]
}

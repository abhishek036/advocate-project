import { PortableText } from '@portabletext/react'
import { client } from '../../../sanity/lib/client'
import { urlForImage } from '../../../sanity/lib/image'
import Navigation from '../../../components/Navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

type Props = { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] { title, excerpt, mainImage }`,
    { slug: resolvedParams.slug }
  )
  if (!post) return { title: 'Post Not Found — RemoteVakil' }
  const imageUrl = post.mainImage ? urlForImage(post.mainImage)?.width(1200).height(630).url() : undefined
  return {
    title: `${post.title} — RemoteVakil`,
    description: post.excerpt || 'Read this article on RemoteVakil — expert legal insights for NRI and foreign clients navigating Indian law.',
    openGraph: {
      title: `${post.title} — RemoteVakil`,
      description: post.excerpt || '',
      type: 'article',
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} — RemoteVakil`,
      description: post.excerpt || '',
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    body,
    excerpt,
    readTime,
    publishedAt,
    "authorName": author->name,
    "authorImage": author->image,
    "categories": categories[]->title
  }`

  const resolvedParams = await params
  const post = await client.fetch(query, { slug: resolvedParams.slug })

  if (!post) {
    return (
      <div className="blog-notfound">
        <h1>Post not found</h1>
        <Link href="/blog">← Return to Insights</Link>
      </div>
    )
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || '',
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.authorName || 'RemoteVakil Team' },
    publisher: { '@type': 'Organization', name: 'RemoteVakil', url: 'https://advocate-project-tau.vercel.app' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://advocate-project-tau.vercel.app/blog/${resolvedParams.slug}` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="blog-header">
        <Navigation />
      </header>

      <main>
        {post.mainImage && (
          <div className="post-hero-img">
            <img
              src={urlForImage(post.mainImage)?.width(1600).height(700).url() || ''}
              alt={post.title}
              loading="eager"
            />
          </div>
        )}

        <article className="post-article">
          <div className="post-inner">
            <div className="post-cats">
              {post.categories?.map((cat: string) => (
                <span key={cat} className="post-cat">{cat}</span>
              ))}
            </div>

            <h1 className="post-title">{post.title}</h1>

            <div className="post-byline">
              {post.authorImage && (
                <img
                  src={urlForImage(post.authorImage)?.width(96).height(96).url() || ''}
                  alt={post.authorName}
                  className="post-author-img"
                />
              )}
              <div>
                <div className="post-author-name">{post.authorName || 'RemoteVakil Team'}</div>
                <div className="post-byline-meta">
                  {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>}
                  {post.readTime && <><span className="post-sep">·</span><span>{post.readTime} min read</span></>}
                </div>
              </div>
            </div>

            {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}

            <div className="post-body">
              {post.body ? (
                <PortableText
                  value={post.body}
                  components={{
                    types: {
                      image: ({ value }) => (
                        <figure className="post-figure">
                          <img src={urlForImage(value)?.url() || ''} alt="Article image" loading="lazy" />
                        </figure>
                      )
                    },
                    block: {
                      h2: ({ children }) => <h2 className="post-h2">{children}</h2>,
                      h3: ({ children }) => <h3 className="post-h3">{children}</h3>,
                      normal: ({ children }) => <p className="post-p">{children}</p>,
                      blockquote: ({ children }) => <blockquote className="post-blockquote">{children}</blockquote>,
                    },
                    list: {
                      bullet: ({ children }) => <ul className="post-ul">{children}</ul>,
                      number: ({ children }) => <ol className="post-ol">{children}</ol>,
                    },
                    listItem: {
                      bullet: ({ children }) => <li className="post-li">{children}</li>,
                      number: ({ children }) => <li className="post-li">{children}</li>,
                    },
                    marks: {
                      strong: ({ children }) => <strong style={{ fontWeight: 700, color: 'var(--nb)' }}>{children}</strong>,
                      em: ({ children }) => <em style={{ fontStyle: 'italic', fontFamily: 'var(--sf)' }}>{children}</em>,
                      link: ({ value, children }) => (
                        <a href={value?.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--am)', borderBottom: '1px solid var(--am)', paddingBottom: '1px' }}>{children}</a>
                      ),
                    }
                  }}
                />
              ) : (
                <p>No content available.</p>
              )}
            </div>

            <div className="post-footer">
              <Link href="/blog" className="post-back">← Back to Insights</Link>
              <a
                href="https://wa.me/919974772427?text=Hello%2C%20I%20read%20your%20article%20and%20would%20like%20a%20free%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="post-consult-btn"
              >
                Book a Free Consultation
              </a>
            </div>
          </div>
        </article>
      </main>
    </>
  )
}

import Link from 'next/link'
import { client } from '../../sanity/lib/client'
import { urlForImage } from '../../sanity/lib/image'
import Navigation from '../../components/Navigation'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Legal Insights — RemoteVakil',
  description: 'Expert articles on Indian property law, NRI legal rights, family law, corporate compliance, and more. Written by practising advocates for foreign clients navigating Indian law.',
  openGraph: {
    title: 'Legal Insights — RemoteVakil',
    description: 'Expert articles on Indian property law, NRI legal rights, family law, corporate compliance, and more.',
    type: 'website',
    url: 'https://advocate-project-tau.vercel.app/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Insights — RemoteVakil',
    description: 'Expert articles on Indian property law, NRI legal rights, and more.',
  },
}

export default async function BlogIndex() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    readTime,
    mainImage,
    "authorName": author->name,
    "categories": categories[]->title
  }`)

  return (
    <>
      <header className="blog-header">
        <Navigation />
      </header>

      <main>
        <section className="blog-hero">
          <div className="blog-hero-inner">
            <div className="sey-ruled">
              <span className="sey-line" />
              <span>Legal Insights</span>
            </div>
            <h1 className="blog-hero-title">The RemoteVakil<br /><em>Dispatch.</em></h1>
            <p className="blog-hero-sub">In-depth articles by practising advocates — covering NRI property rights, family law, corporate compliance, and more.</p>
          </div>
        </section>

        <section className="blog-grid-sec">
          <div className="blog-grid-wrap">
            {posts.length === 0 ? (
              <div className="blog-empty">
                <p>No posts published yet.</p>
                <Link href="/studio" className="blog-empty-link">Open the Studio to write your first article →</Link>
              </div>
            ) : (
              <div className="blog-grid">
                {posts.map((post: any, idx: number) => (
                  <Link href={`/blog/${post.slug?.current}`} key={post._id} className={`blog-card${idx === 0 ? ' blog-card-featured' : ''}`}>
                    <div className="blog-card-img-wrap">
                      {post.mainImage ? (
                        <img
                          src={urlForImage(post.mainImage)?.url() || ''}
                          alt={post.title}
                          loading="lazy"
                          className="blog-card-img"
                        />
                      ) : (
                        <div className="blog-card-img-placeholder">
                          <span>RV</span>
                        </div>
                      )}
                    </div>
                    <div className="blog-card-body">
                      <div className="blog-card-cats">
                        {post.categories?.map((cat: string) => (
                          <span key={cat} className="blog-card-cat">{cat}</span>
                        ))}
                      </div>
                      <h2 className="blog-card-title">{post.title}</h2>
                      {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
                      <div className="blog-card-meta">
                        <span className="blog-card-author">{post.authorName || 'RemoteVakil Team'}</span>
                        {post.readTime && <><span className="blog-card-sep">·</span><span>{post.readTime} min read</span></>}
                        {post.publishedAt && <><span className="blog-card-sep">·</span><span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="blog-cta-banner">
          <div className="blog-cta-inner">
            <h2 className="blog-cta-title">Have a legal question?</h2>
            <p className="blog-cta-sub">Our advocates are available for a free 20-minute consultation — no obligation.</p>
            <a
              href="https://wa.me/919974772427?text=Hello%2C%20I%20read%20an%20article%20on%20RemoteVakil%20and%20would%20like%20a%20free%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="blog-cta-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Chat on WhatsApp — It&apos;s Free
            </a>
          </div>
        </section>
      </main>
    </>
  )
}

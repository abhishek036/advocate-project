import Link from 'next/link'
import { client } from '../../sanity/lib/client'
import { urlForImage } from '../../sanity/lib/image'
import Navigation from '../../components/Navigation'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogIndex() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    "authorName": author->name,
    "categories": categories[]->title
  }`)

  return (
    <>
      <div style={{ backgroundColor: '#0A0A0A' }}>
        <Navigation />
      </div>
      
      <main className="blog-container" style={{ padding: '120px 5%', minHeight: '100vh', backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 600, marginBottom: '1rem', color: '#0A0A0A' }}>Insights & Articles</h1>
          <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '4rem' }}>Stay updated with the latest in legal tech, remote work, and justice.</p>
          
          {posts.length === 0 ? (
            <div style={{ padding: '3rem', backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #EAEAEA', textAlign: 'center' }}>
              <p style={{ fontSize: '1.1rem', color: '#666' }}>No posts found. Start writing in the <Link href="/studio" style={{ color: '#0055FF', textDecoration: 'underline' }}>Studio</Link>!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
              {posts.map((post: any) => (
                <Link href={`/blog/${post.slug?.current}`} key={post._id} style={{ textDecoration: 'none' }}>
                  <div style={{ 
                    backgroundColor: '#FFF', 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    border: '1px solid #EAEAEA',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {post.mainImage ? (
                      <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                        <img 
                          src={urlForImage(post.mainImage)?.url() || ''} 
                          alt={post.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                    ) : (
                      <div style={{ width: '100%', height: '240px', backgroundColor: '#EAEAEA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#999' }}>No Image</span>
                      </div>
                    )}
                    
                    <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                        {post.categories?.map((cat: string) => (
                          <span key={cat} style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0055FF', backgroundColor: 'rgba(0, 85, 255, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '999px' }}>
                            {cat}
                          </span>
                        ))}
                      </div>
                      
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0A0A0A', marginBottom: '1rem', lineHeight: 1.3 }}>
                        {post.title}
                      </h2>
                      
                      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666', fontSize: '0.875rem' }}>
                        <span style={{ fontWeight: 500, color: '#333' }}>{post.authorName || 'Anonymous'}</span>
                        {post.publishedAt && (
                          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

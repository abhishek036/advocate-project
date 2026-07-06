import { PortableText } from '@portabletext/react'
import { client } from '../../../sanity/lib/client'
import { urlForImage } from '../../../sanity/lib/image'
import Navigation from '../../../components/Navigation'
import Link from 'next/link'

export const revalidate = 60

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    mainImage,
    body,
    publishedAt,
    "authorName": author->name,
    "authorImage": author->image,
    "categories": categories[]->title
  }`
  
  const post = await client.fetch(query, { slug: params.slug })

  if (!post) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Post not found</h1>
        <Link href="/blog" style={{ color: '#0055FF', textDecoration: 'underline' }}>Return to Blog</Link>
      </div>
    )
  }

  return (
    <>
      <div style={{ backgroundColor: '#0A0A0A' }}>
        <Navigation />
      </div>
      
      <main style={{ backgroundColor: '#FAFAFA', minHeight: '100vh', paddingBottom: '120px' }}>
        {post.mainImage && (
          <div style={{ width: '100%', height: '60vh', minHeight: '400px', backgroundColor: '#EAEAEA', position: 'relative' }}>
            <img 
              src={urlForImage(post.mainImage)?.url() || ''} 
              alt={post.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
        
        <article style={{ maxWidth: '800px', margin: '0 auto', padding: '0 5%', marginTop: post.mainImage ? '-100px' : '120px', position: 'relative', zIndex: 10 }}>
          <div style={{ backgroundColor: '#FFF', borderRadius: '24px', padding: '3rem 10%', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
            
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {post.categories?.map((cat: string) => (
                <span key={cat} style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0055FF' }}>
                  {cat}
                </span>
              ))}
            </div>
            
            <h1 style={{ fontSize: '3rem', fontWeight: 700, color: '#0A0A0A', lineHeight: 1.1, marginBottom: '2rem' }}>
              {post.title}
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', paddingBottom: '2rem', borderBottom: '1px solid #EAEAEA' }}>
              {post.authorImage ? (
                <img 
                  src={urlForImage(post.authorImage)?.url() || ''} 
                  alt={post.authorName} 
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#EAEAEA' }} />
              )}
              <div>
                <div style={{ fontWeight: 600, color: '#0A0A0A' }}>{post.authorName || 'Anonymous'}</div>
                {post.publishedAt && (
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                )}
              </div>
            </div>
            
            <div className="prose" style={{ fontSize: '1.125rem', lineHeight: 1.8, color: '#333' }}>
              {post.body ? (
                <PortableText 
                  value={post.body}
                  components={{
                    types: {
                      image: ({ value }) => (
                        <div style={{ margin: '3rem 0', borderRadius: '12px', overflow: 'hidden' }}>
                          <img src={urlForImage(value)?.url() || ''} alt="Post image" style={{ width: '100%', height: 'auto' }} />
                        </div>
                      )
                    },
                    block: {
                      h2: ({ children }) => <h2 style={{ fontSize: '2rem', fontWeight: 600, margin: '3rem 0 1.5rem', color: '#0A0A0A' }}>{children}</h2>,
                      h3: ({ children }) => <h3 style={{ fontSize: '1.5rem', fontWeight: 600, margin: '2rem 0 1rem', color: '#0A0A0A' }}>{children}</h3>,
                      normal: ({ children }) => <p style={{ marginBottom: '1.5rem' }}>{children}</p>,
                      blockquote: ({ children }) => <blockquote style={{ borderLeft: '4px solid #0055FF', paddingLeft: '1.5rem', fontStyle: 'italic', color: '#666', margin: '2rem 0' }}>{children}</blockquote>
                    },
                    list: {
                      bullet: ({ children }) => <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>{children}</ul>,
                      number: ({ children }) => <ol style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', listStyleType: 'decimal' }}>{children}</ol>
                    },
                    listItem: {
                      bullet: ({ children }) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>,
                      number: ({ children }) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>
                    }
                  }}
                />
              ) : (
                <p>No content available.</p>
              )}
            </div>
          </div>
        </article>
      </main>
    </>
  )
}

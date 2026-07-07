import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Trust from '@/components/Trust';
import HomeEffects from '@/components/HomeEffects';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';

export const revalidate = 60;

export default async function Home() {
  const latestPosts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...4] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    readTime,
    mainImage,
    "authorName": author->name,
    "categories": categories[]->title
  }`).catch(() => []);

  return (
    <main>
      <HomeEffects />
      <Navigation />
      <Hero />
      <Stats />
      <Services />

      {/* ── Scrolling brand ticker ─────────────────────────────── */}
      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker-track">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="ticker-inner">
              <span>NRI-Trusted Legal Services</span>
              <span className="ticker-dot">·</span>
              <span>4,200+ Cases Resolved</span>
              <span className="ticker-dot">·</span>
              <span>98% Client Retention</span>
              <span className="ticker-dot">·</span>
              <span>11 Practice Areas</span>
              <span className="ticker-dot">·</span>
              <span>India-Wide Advocate Network</span>
              <span className="ticker-dot">·</span>
              <span>Response Within 48 Hours</span>
              <span className="ticker-dot">·</span>
            </span>
          ))}
        </div>
      </div>

      <Trust />

      {/* ── Blog / Insights — Live from Sanity ───────────────────── */}
      <section id="blog" className="sec" aria-labelledby="blog-hl">
        <div className="blgh">
          <div>
            <div className="sey-ruled rv"><span className="sey-line" /><span>Legal Insights</span></div>
            <h2 className="sh rv d1" id="blog-hl">The RemoteVakil<br /><em>Dispatch.</em></h2>
          </div>
          <Link href="/blog" className="al rv d2">Read all articles &rarr;</Link>
        </div>
        <div className="mas" role="list">
          {latestPosts.length > 0 ? latestPosts.map((post: any, idx: number) => (
            <Link href={`/blog/${post.slug?.current}`} key={post._id} className={`bca rv${idx === 1 ? ' d1' : idx === 2 ? ' d2' : idx === 3 ? ' d1' : ''}`} role="listitem">
              {post.mainImage && (idx === 0 || idx === 3) && (
                <div className="bci">
                  <img src={urlForImage(post.mainImage)?.url() || ''} alt={post.title} loading="lazy" />
                </div>
              )}
              <div className="bcb">
                <div className="bctg">{post.categories?.[0] || 'Legal'}</div>
                <h3 className="bcti">{post.title}</h3>
                {post.excerpt && <p className="bcd">{post.excerpt}</p>}
                <div className="bcm">
                  <span>{post.authorName || 'RemoteVakil Team'}</span>
                  {post.readTime && <><span className="bcs" /><span>{post.readTime} min read</span></>}
                  {post.publishedAt && <><span className="bcs" /><span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></>}
                </div>
              </div>
            </Link>
          )) : (
            // Fallback static cards when no Sanity posts exist yet
            <>
              <article className="bca rv" role="listitem"><div className="bci"><img src="/blog_property.png" alt="Property law" loading="lazy"/></div><div className="bcb"><div className="bctg">Property Law</div><h3 className="bcti">What Every Homebuyer Must Know Before Signing a Builder Agreement</h3><p className="bcd">Builder agreements are rarely buyer-friendly in their draft form. Here are the 7 clauses you must negotiate before the ink dries.</p><div className="bcm"><span>Adv. Priya Mehta</span><span className="bcs"></span><span>8 min read</span></div></div></article>
              <article className="bca rv d1" role="listitem"><div className="bcb"><div className="bctg">Employment</div><h3 className="bcti">Non-Compete Clauses in India: Enforceable or Unenforceable?</h3><p className="bcd">The Supreme Court's position has evolved. What your current employment contract says — and what it means under Section 27.</p><div className="bcm"><span>Adv. Rohan Sinha</span><span className="bcs"></span><span>5 min read</span></div></div></article>
              <article className="bca rv d2" role="listitem"><div className="bcb"><div className="bctg">Compliance</div><h3 className="bcti">The 2024 DPDP Act: A Compliance Checklist for Startups</h3><p className="bcd">India's new data protection framework carries significant penalties. The minimum viable compliance framework for early-stage companies.</p><div className="bcm"><span>RemoteVakil Team</span><span className="bcs"></span><span>11 min read</span></div></div></article>
              <article className="bca rv d1" role="listitem"><div className="bci"><img src="/blog_dispute.png" alt="Dispute resolution" loading="lazy"/></div><div className="bcb"><div className="bctg">Dispute Resolution</div><h3 className="bcti">Arbitration vs Litigation: Choosing the Right Forum</h3><p className="bcd">Speed, cost, confidentiality, enforceability — four variables that drive your choice. A framework from practitioners.</p><div className="bcm"><span>Adv. Kavya Nair</span><span className="bcs"></span><span>7 min read</span></div></div></article>
            </>
          )}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <FAQ />

      {/* ── Footer CTA ───────────────────────────────────────────── */}
      <section id="ftcta" className="nd ftcta-new" aria-labelledby="ftcta-hl">
        <div className="ftcta-top">
          <div className="ftcta-left">
            <div className="sey-ruled fey-ruled rv">
              <span className="sey-line sey-line-dim" />
              <span>Begin Your Consultation</span>
            </div>
            <h2 className="fhl rv d1" id="ftcta-hl">
              Your legal<br />partner,<br /><em>one message away.</em>
            </h2>
            <div className="mw rv d2" id="ftcta-mw">
              <a
                id="mb"
                href="https://wa.me/919999999999?text=Hello%2C%20I%20would%20like%20to%20book%20a%20free%20consultation%20with%20RemoteVakil."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Schedule your consultation via WhatsApp"
                className="ftcta-wa-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp — Free Consultation
              </a>
            </div>
            <p className="ftcta-alt-contact rv d3">
              Prefer email? <a href="mailto:hello@remotevakil.com" className="ftcta-email-link">hello@remotevakil.com</a>
            </p>
          </div>

          <div className="ftcta-right rv d2">
            <div className="ftcta-quote">
              <p className="ftcta-qt">&ldquo;RemoteVakil handled my NRI property dispute end-to-end. I was in Dubai — they managed everything in Pune without a single in-person visit.&rdquo;</p>
              <div className="ftcta-qm">
                <div className="ftcta-qavatar">SR</div>
                <div>
                  <div className="ftcta-qname">Suresh R.</div>
                  <div className="ftcta-qrole">NRI Client · Dubai → Pune Property Case</div>
                </div>
              </div>
            </div>
            <div className="ftcta-stats-mini">
              <div className="ftcta-sm-item">
                <span className="ftcta-sm-n">4,200+</span>
                <span className="ftcta-sm-l">Cases handled</span>
              </div>
              <div className="ftcta-sm-div" />
              <div className="ftcta-sm-item">
                <span className="ftcta-sm-n">98%</span>
                <span className="ftcta-sm-l">Retention rate</span>
              </div>
              <div className="ftcta-sm-div" />
              <div className="ftcta-sm-item">
                <span className="ftcta-sm-n">&lt;48h</span>
                <span className="ftcta-sm-l">First response</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="fln" aria-label="Footer navigation">
          <Link href="/#services" className="flnk">Services</Link>
          <Link href="/#trust" className="flnk">Why Us</Link>
          <Link href="/blog" className="flnk">Insights</Link>
          <Link href="/#faq" className="flnk">FAQ</Link>
          <a href="mailto:hello@remotevakil.com" className="flnk">Contact</a>
          <a href="#" className="flnk">Privacy Policy</a>
          <a href="#" className="flnk">Terms of Service</a>
        </nav>
        <div className="fb">
          <span className="flo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0 }} aria-hidden="true">
              <circle cx="50" cy="50" r="50" fill="#FFFFFF" fillOpacity="0.12"/>
              <circle cx="30" cy="22" r="9.5" fill="#FFFFFF"/>
              <circle cx="30" cy="50" r="9.5" fill="#FFFFFF"/>
              <circle cx="30" cy="76" r="9.5" fill="#FFFFFF"/>
              <circle cx="53" cy="76" r="9.5" fill="#FFFFFF"/>
              <circle cx="76" cy="76" r="9.5" fill="#FFFFFF"/>
            </svg>
            RemoteVakil
          </span>
          <span className="fcp">&copy; 2025 RemoteVakil. All rights reserved. Not a law firm. Legal services facilitated through our verified advocate network.</span>
        </div>
      </section>
    </main>
  );
}
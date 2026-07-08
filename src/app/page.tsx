import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Trust from '@/components/Trust';
import HomeEffects from '@/components/HomeEffects';
import FAQ from '@/components/FAQ';
import ReviewsCarousel from '@/components/ReviewsCarousel';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://remotevakil.com',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Can you handle my case if I'm living abroad?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely — RemoteVakil was built for NRI clients. We work with clients in over 40 countries including the UAE, USA, UK, Canada, and Australia. Everything is managed remotely.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to physically be present in India for my case?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In most cases, no. We handle on-ground representation through our verified advocate network across India.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly will I hear back?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our committed SLA is a response within 48 business hours. In practice, most clients hear back within the same business day.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I hire an Indian advocate remotely?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Simply contact us via our website or WhatsApp. We match you with a verified advocate specialised in your legal matter within 24 hours. All documents and communication happen online — no visits to India required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of cases do you handle for NRIs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We handle property disputes, power of attorney registration, inheritance and succession, family law matters (divorce, custody), corporate and startup compliance, and consumer cases — all managed remotely for NRI and foreign clients.',
      },
    },
  ],
};


const FALLBACK_REVIEWS = [
  {
    _id: 'f1',
    name: 'Suresh R.',
    role: 'NRI Client',
    location: 'Dubai → Pune Property Case',
    body: 'RemoteVakil handled my property dispute end-to-end. I was in Dubai — they managed everything in Pune without a single in-person visit from my side. The weekly updates and encrypted document vault gave me complete peace of mind.',
    rating: 5,
    initials: 'SR',
  },
  {
    _id: 'f2',
    name: 'Ananya M.',
    role: 'Business Owner',
    location: 'Singapore → Mumbai Corporate',
    body: 'We needed multiple vendor agreements and employment contracts drafted in India urgently. RemoteVakil delivered everything within deadlines, communicated in plain English, and never once used legal jargon I didn\'t understand.',
    rating: 5,
    initials: 'AM',
  },
  {
    _id: 'f3',
    name: 'Prabhdeep S.',
    role: 'NRI Client',
    location: 'Canada → Punjab Inheritance Matter',
    body: 'Obtaining a legal heir certificate from abroad felt impossible until I found RemoteVakil. The process was transparent, and the Relationship Manager walked me through every step. Resolved in 6 weeks.',
    rating: 5,
    initials: 'PS',
  },
  {
    _id: 'f4',
    name: 'Fatima K.',
    role: 'NRI Client',
    location: 'UK → Hyderabad Property',
    body: 'My family had been fighting a builder dispute for two years before I approached RemoteVakil. Within four months, they secured a resolution through a consumer complaint. I only ever attended one video call.',
    rating: 5,
    initials: 'FK',
  },
  {
    _id: 'f5',
    name: 'Rajesh & Kavitha N.',
    role: 'NRI Clients',
    location: 'USA → Chennai Family Law',
    body: 'The divorce was emotionally difficult enough. What we didn\'t need was a complicated legal process on top of it. RemoteVakil made everything simple, private, and handled with genuine sensitivity. Highly recommended.',
    rating: 5,
    initials: 'RN',
  },
];

export default async function Home() {
  const [latestPosts, rawReviews] = await Promise.all([
    client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...4] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      readTime,
      mainImage,
      "authorName": author->name,
      "categories": categories[]->title
    }`).catch(() => []),
    client.fetch(`*[_type == "review"] | order(featured desc, publishedAt desc)[0...8] {
      _id,
      name,
      role,
      location,
      body,
      rating,
      initials,
      "avatarUrl": avatar.asset->url
    }`).catch(() => []),
  ]);

  const reviews = rawReviews.length > 0 ? rawReviews : FALLBACK_REVIEWS;

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <HomeEffects />
      <Navigation />
      <Hero />
      <Stats />
      <Services />

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
            <>
              <article className="bca rv" role="listitem"><div className="bci"><img src="/blog_property.webp" alt="Property law" loading="lazy"/></div><div className="bcb"><div className="bctg">Property Law</div><h3 className="bcti">What Every Homebuyer Must Know Before Signing a Builder Agreement</h3><p className="bcd">Builder agreements are rarely buyer-friendly in their draft form. Here are the 7 clauses you must negotiate before the ink dries.</p><div className="bcm"><span>Adv. Priya Mehta</span><span className="bcs"></span><span>8 min read</span></div></div></article>
              <article className="bca rv d1" role="listitem"><div className="bcb"><div className="bctg">Employment</div><h3 className="bcti">Non-Compete Clauses in India: Enforceable or Unenforceable?</h3><p className="bcd">The Supreme Court's position has evolved. What your current employment contract says — and what it means under Section 27.</p><div className="bcm"><span>Adv. Rohan Sinha</span><span className="bcs"></span><span>5 min read</span></div></div></article>
              <article className="bca rv d2" role="listitem"><div className="bcb"><div className="bctg">Compliance</div><h3 className="bcti">The 2024 DPDP Act: A Compliance Checklist for Startups</h3><p className="bcd">India's new data protection framework carries significant penalties. The minimum viable compliance framework for early-stage companies.</p><div className="bcm"><span>RemoteVakil Team</span><span className="bcs"></span><span>11 min read</span></div></div></article>
              <article className="bca rv d1" role="listitem"><div className="bci"><img src="/blog_dispute.webp" alt="Dispute resolution" loading="lazy"/></div><div className="bcb"><div className="bctg">Dispute Resolution</div><h3 className="bcti">Arbitration vs Litigation: Choosing the Right Forum</h3><p className="bcd">Speed, cost, confidentiality, enforceability — four variables that drive your choice. A framework from practitioners.</p><div className="bcm"><span>Adv. Kavya Nair</span><span className="bcs"></span><span>7 min read</span></div></div></article>
            </>
          )}
        </div>
      </section>

      <section id="faq" className="faq-split-sec" aria-label="FAQ and client reviews">
        <div className="faq-split-left">
          <FAQ />
        </div>
        <div className="faq-split-right nd" aria-label="Client reviews">
          <ReviewsCarousel reviews={reviews} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
'use client';
import { useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Trust from '@/components/Trust';
import Product from '@/components/Product';

export default function Home() {
  const mwRef = useRef<HTMLDivElement>(null);
  const mbRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Intersection observer for visibility animations
    const ro = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    
    document.querySelectorAll('.rv, .sf2').forEach(el => ro.observe(el));

    // Footer mouse effect
    const mw = mwRef.current;
    const mb = mbRef.current;
    if (mw && mb) {
      const moveHandler = (e: MouseEvent) => {
        const r = mb.getBoundingClientRect();
        mb.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.36}px, ${(e.clientY - (r.top + r.height / 2)) * 0.36}px)`;
      };
      const leaveHandler = () => { mb.style.transform = 'translate(0,0)'; };
      mw.addEventListener('mousemove', moveHandler);
      mw.addEventListener('mouseleave', leaveHandler);
      return () => {
        mw.removeEventListener('mousemove', moveHandler);
        mw.removeEventListener('mouseleave', leaveHandler);
        ro.disconnect();
      };
    }
  }, []);

  return (
    <main>
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
      <Product />

      {/* ── Process — Editorial alternating timeline ───────────── */}
      <section id="hiw" className="sec hiw-sec" aria-labelledby="hiw-hl">
        <div className="hiwh">
          <div className="sey-ruled rv">
            <span className="sey-line" />
            <span>Process</span>
          </div>
          <h2 className="sh rv d1" id="hiw-hl">Onboard in<br /><em>three steps.</em></h2>
        </div>

        <div className="hiw-timeline">
          {/* Connecting spine line */}
          <div className="hiw-spine" aria-hidden="true" />

          {/* Step 1 — left */}
          <div className="hiw-step hiw-step-left rv d1">
            <div className="hiw-step-content">
              <div className="hiw-num-badge">01</div>
              <h3 className="ht">Brief Your Case</h3>
              <p className="hd">Complete a structured intake form — no phone calls, no waiting rooms. Your Relationship Manager responds within 4 working hours.</p>
            </div>
            <div className="hiw-connector" aria-hidden="true">
              <div className="hiw-node" />
            </div>
          </div>

          {/* Step 2 — right */}
          <div className="hiw-step hiw-step-right rv d2">
            <div className="hiw-connector hiw-connector-r" aria-hidden="true">
              <div className="hiw-node" />
            </div>
            <div className="hiw-step-content hiw-step-content-r">
              <div className="hiw-num-badge">02</div>
              <h3 className="ht">Meet Your Advocate</h3>
              <p className="hd">We match you with a verified specialist. A video consultation is scheduled within 48 hours to align on strategy and timelines.</p>
            </div>
          </div>

          {/* Step 3 — left */}
          <div className="hiw-step hiw-step-left rv d3">
            <div className="hiw-step-content">
              <div className="hiw-num-badge">03</div>
              <h3 className="ht">Track &amp; Receive</h3>
              <p className="hd">Your Digital Case Tracker updates in real time. Documents arrive in your Secure Vault. Monthly briefings keep you fully informed — always.</p>
            </div>
            <div className="hiw-connector" aria-hidden="true">
              <div className="hiw-node" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Blog / Insights ─────────────────────────────────────── */}
      <section id="blog" className="sec" aria-labelledby="blog-hl">
        <div className="blgh">
          <div>
            <div className="sey-ruled rv"><span className="sey-line" /><span>Legal Insights</span></div>
            <h2 className="sh rv d1" id="blog-hl">The RemoteVakil<br /><em>Dispatch.</em></h2>
          </div>
          <a href="#" className="al rv d2">Read all articles &rarr;</a>
        </div>
        <div className="mas" role="list">
          <article className="bca rv" role="listitem"><div className="bci"><img src="/blog_property.png" alt="Property law — real estate" loading="lazy"/></div><div className="bcb"><div className="bctg">Property Law</div><h3 className="bcti">What Every Homebuyer Must Know Before Signing a Builder Agreement</h3><p className="bcd">Builder agreements are rarely buyer-friendly in their draft form. Here are the 7 clauses you must negotiate before the ink dries.</p><div className="bcm"><span>Adv. Priya Mehta</span><span className="bcs"></span><span>8 min read</span></div></div></article>
          <article className="bca rv d1" role="listitem"><div className="bcb"><div className="bctg">Employment</div><h3 className="bcti">Non-Compete Clauses in India: Enforceable or Unenforceable?</h3><p className="bcd">The Supreme Court's position has evolved. What your current employment contract says — and what it means under Section 27.</p><div className="bcm"><span>Adv. Rohan Sinha</span><span className="bcs"></span><span>5 min read</span></div></div></article>
          <article className="bca rv d2" role="listitem"><div className="bcb"><div className="bctg">Compliance</div><h3 className="bcti">The 2024 DPDP Act: A Compliance Checklist for Startups</h3><p className="bcd">India's new data protection framework carries significant penalties. The minimum viable compliance framework for early-stage companies.</p><div className="bcm"><span>RemoteVakil Team</span><span className="bcs"></span><span>11 min read</span></div></div></article>
          <article className="bca rv d1" role="listitem"><div className="bci"><img src="/blog_dispute.png" alt="Dispute resolution — gavel and scales" loading="lazy"/></div><div className="bcb"><div className="bctg">Dispute Resolution</div><h3 className="bcti">Arbitration vs Litigation: Choosing the Right Forum</h3><p className="bcd">Speed, cost, confidentiality, enforceability — four variables that drive your choice. A framework from practitioners.</p><div className="bcm"><span>Adv. Kavya Nair</span><span className="bcs"></span><span>7 min read</span></div></div></article>
          <article className="bca rv d3" role="listitem"><div className="bcb"><div className="bctg">Legal Notices</div><h3 className="bcti">How to Send a Legally Binding Demand Notice</h3><p className="bcd">Format, delivery method, limitation period, response windows — a step-by-step breakdown for demand notices.</p><div className="bcm"><span>Adv. Siddharth Rao</span><span className="bcs"></span><span>6 min read</span></div></div></article>
        </div>
      </section>

      {/* ── Footer CTA — left-aligned, with testimonial fragment ── */}
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
            <div className="mw rv d2" ref={mwRef}>
              <button id="mb" type="button" ref={mbRef} aria-label="Schedule your consultation now">Consult Now</button>
            </div>
          </div>

          <div className="ftcta-right rv d2">
            <div className="ftcta-quote">
              <p className="ftcta-qt">"RemoteVakil handled my NRI property dispute end-to-end. I was in Dubai — they managed everything in Pune without a single in-person visit."</p>
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
          <a href="#services" className="flnk">Services</a>
          <a href="#trust" className="flnk">Why Us</a>
          <a href="#product" className="flnk">Platform</a>
          <a href="#blog" className="flnk">Insights</a>
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
          <span className="fcp">&copy; 2024 RemoteVakil. All rights reserved. Not a law firm. Legal services facilitated through our verified advocate network.</span>
        </div>
      </section>
    </main>
  );
}
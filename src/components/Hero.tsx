'use client';
import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    const handleScroll = () => {
      const s = window.scrollY;
      const v = window.innerHeight;
      const hh = document.querySelector('.hh') as HTMLElement;
      const hs = document.querySelector('.hs') as HTMLElement;
      const ha = document.querySelector('.ha') as HTMLElement;
      if (s < v && hh) {
        const p = s / v;
        hh.style.transform = `translateY(${s * 0.14}px)`;
        if (hs) { hs.style.opacity = String(1 - p * 1.8); hs.style.transform = `translateY(${s * 0.09}px)`; }
        if (ha) { ha.style.opacity = String(1 - p * 2); ha.style.transform = `translateY(${s * 0.1}px)`; }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="hero-wrap ns" aria-labelledby="hero-hl">
      {/* Diagonal rule — replaces the grid */}
      <div className="hero-rule" aria-hidden="true" />

      {/* Left content column */}
      <div className="hero-left">
        <p className="he">The Remote Advocate</p>
        <h1 className="hh" id="hero-hl">
          Legal Precision,<br /><em>Without Compromise.</em>
        </h1>
        <p className="hs">
          A dedicated legal partner — always remote, always responsive.<br />
          Drafting, compliance, case tracking and coordination,<br />
          distilled into one boutique relationship.
        </p>
        <div className="ha">
          <a href="#ftcta" className="bp bp-amber" id="hero-cta">Start Your Case</a>
          <a href="#services" className="bs" id="hero-svc">View Services</a>
        </div>

        {/* Inline brand credibility line */}
        <div className="hero-cred">
          <span className="hero-cred-dot" />
          <span>4,200+ cases resolved</span>
          <span className="hero-cred-sep">·</span>
          <span>11 practice areas</span>
          <span className="hero-cred-sep">·</span>
          <span>India-wide advocate network</span>
        </div>
      </div>

      {/* Right editorial label — rotated vertical */}
      <div className="hero-right" aria-hidden="true">
        <div className="hero-vert-label">Est. 2021 — India</div>
        <div className="hero-vert-line" />
      </div>

      {/* Case tracker */}
      <div className="tc" role="complementary" aria-label="Digital Case Tracker preview">
        <div className="th"><span className="tt">Digital Case Tracker</span><span className="tb">Live</span></div>
        <div className="tcs">
          <div className="cc"><div className="ci">RV-2024-0041</div><div className="cn">Property Dispute Resolution</div><span className="cs sr">Under Review</span><div className="cb"><div className="cbf" style={{ width: '68%' }}></div></div></div>
          <div className="cc"><div className="ci">RV-2024-0039</div><div className="cn">Employment Agreement Draft</div><span className="cs sa">Active</span><div className="cb"><div className="cbf" style={{ width: '45%' }}></div></div></div>
          <div className="cc"><div className="ci">RV-2024-0037</div><div className="cn">Builder Coordination Notice</div><span className="cs sp">Pending</span><div className="cb"><div className="cbf" style={{ width: '92%' }}></div></div></div>
        </div>
      </div>
    </section>
  );
}

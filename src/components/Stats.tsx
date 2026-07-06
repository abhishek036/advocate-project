'use client';
import { useEffect, useRef } from 'react';

export default function Stats() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { runStats(); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const runStats = () => {
    const data = [
      { id: 'sv1', n: 4200, s: '+', d: 2000 },
      { id: 'sv2', n: 98, s: '%', d: 1400 },
      { id: 'sv3', n: 48, s: 'h', d: 1100 },
      { id: 'sv4', n: 11, s: '', d: 900 },
    ];
    data.forEach(({ id, n, s, d }) => {
      const el = document.getElementById(id);
      if (!el) return;
      let t0: number | null = null;
      const f = (ts: number) => {
        if (!t0) t0 = ts;
        const p = Math.min((ts - t0) / d, 1);
        const e2 = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(e2 * n).toLocaleString() + s;
        if (p < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    });
  };

  return (
    <div id="stats" ref={statsRef} role="region" aria-label="Key statistics">
      <div className="sg">
        {/* Hero stat — intentionally oversized, breaks the equal-column grid */}
        <div className="si si-hero rv vis">
          <div className="sv sv-hero" id="sv1">0+</div>
          <div className="sl">Cases Resolved<br /><span className="sl-sub">Since 2021</span></div>
        </div>
        <div className="si rv d1 vis">
          <div className="sv" id="sv2">0%</div>
          <div className="sl">Client Retention</div>
        </div>
        <div className="si rv d2 vis">
          <div className="sv" id="sv3">0h</div>
          <div className="sl">Avg. Response</div>
        </div>
        <div className="si si-last rv d3 vis">
          <div className="sv" id="sv4">0</div>
          <div className="sl">Practice Areas</div>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useEffect, useRef } from 'react';

export default function HomeEffects() {
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
    const mw = document.getElementById('ftcta-mw') as HTMLDivElement;
    const mb = document.getElementById('mb') as HTMLButtonElement;
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
    return () => ro.disconnect();
  }, []);

  return null;
}

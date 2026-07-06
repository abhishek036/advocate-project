'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [lpOn, setLpOn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      if (window.scrollY > window.innerHeight * 0.4 && !lpOn) {
        setLpOn(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lpOn]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToCTA = () => {
    const el = document.getElementById('ftcta');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav id="nav" role="navigation" aria-label="Main navigation" className={scrolled ? 'scrolled' : ''}>
        <a href="/" className="nl-wrap" aria-label="RemoteVakil — Home">
          {/* Logo mark — inline SVG */}
          <svg
            className="nl-icon"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="50" cy="50" r="50" fill="#0A0A0A"/>
            <circle cx="30" cy="22" r="9.5" fill="#FFFFFF"/>
            <circle cx="30" cy="50" r="9.5" fill="#FFFFFF"/>
            <circle cx="30" cy="76" r="9.5" fill="#FFFFFF"/>
            <circle cx="53" cy="76" r="9.5" fill="#FFFFFF"/>
            <circle cx="76" cy="76" r="9.5" fill="#FFFFFF"/>
          </svg>
          {/* Wordmark */}
          <span className="nl">Remote<span className="nl-bold">Vakil</span></span>
        </a>
        <ul className="nav-links">
          <li><a href="/#services">Services</a></li>
          <li><a href="/#trust">Why Us</a></li>
          <li><a href="/#product">Platform</a></li>
          <li><Link href="/blog">Insights</Link></li>
        </ul>
        <Link href="/#ftcta" className="nc" id="nav-cta">Consult Now</Link>
      </nav>
      <button 
        id="lp" 
        className={lpOn ? 'show' : ''} 
        aria-label="Book a free consultation"
        onClick={scrollToCTA}
      >
        <span className="pd"></span>Free Consultation — Book Now
      </button>
    </>
  );
}

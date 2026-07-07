'use client';
import { useEffect, useRef, useState } from 'react';

interface Review {
  _id: string;
  name: string;
  role?: string;
  location?: string;
  body: string;
  rating: number;
  initials?: string;
  avatarUrl?: string;
}

interface ReviewsCarouselProps {
  reviews: Review[];
}

const STARS = Array.from({ length: 5 });
const AUTO_INTERVAL = 5000;

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState<'next' | 'prev'>('next');
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = reviews.length;

  const goTo = (idx: number, direction: 'next' | 'prev' = 'next') => {
    setPrev(active);
    setDir(direction);
    setActive(idx);
  };

  const next = () => goTo((active + 1) % total, 'next');
  const back = () => goTo((active - 1 + total) % total, 'prev');

  // Auto-advance
  useEffect(() => {
    if (paused || total < 2) return;
    timerRef.current = setTimeout(next, AUTO_INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [active, paused, total]);

  // Keyboard navigation
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') back();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [active]);

  if (!reviews || total === 0) return null;

  const r = reviews[active];

  return (
    <div
      className="rev-wrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Client reviews"
      role="region"
    >
      {/* Header */}
      <div className="rev-hd">
        <div className="sey-ruled rv vis" style={{ color: 'rgba(255,255,255,.3)' }}>
          <span className="sey-line" style={{ background: 'rgba(255,255,255,.28)' }} />
          <span>Client Reviews</span>
        </div>
        <h2 className="sh rev-sh rv d1 vis">
          Trusted by clients<br /><em>across 40 countries.</em>
        </h2>
      </div>

      {/* Slide */}
      <div className="rev-stage" aria-live="polite" aria-atomic="true">
        <div
          key={r._id}
          className={`rev-card rev-card-enter-${dir}`}
          aria-label={`Review by ${r.name}`}
        >
          {/* Stars */}
          <div className="rev-stars" aria-label={`${r.rating} out of 5 stars`}>
            {STARS.map((_, i) => (
              <svg
                key={i}
                className={`rev-star${i < r.rating ? ' rev-star-filled' : ''}`}
                width="14" height="14" viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>

          {/* Quote */}
          <blockquote className="rev-body">
            <span className="rev-open-quote">&ldquo;</span>
            {r.body}
            <span className="rev-close-quote">&rdquo;</span>
          </blockquote>

          {/* Attribution */}
          <footer className="rev-attr">
            <div className="rev-avatar" aria-hidden="true">
              {r.avatarUrl
                ? <img src={r.avatarUrl} alt={r.name} />
                : <span>{r.initials || r.name.slice(0, 2).toUpperCase()}</span>
              }
            </div>
            <div className="rev-meta">
              <div className="rev-name">{r.name}</div>
              {(r.role || r.location) && (
                <div className="rev-loc">
                  {r.role && <span>{r.role}</span>}
                  {r.role && r.location && <span className="rev-sep">·</span>}
                  {r.location && <span>{r.location}</span>}
                </div>
              )}
            </div>
          </footer>
        </div>
      </div>

      {/* Controls */}
      {total > 1 && (
        <div className="rev-controls">
          {/* Dot progress */}
          <div className="rev-dots" role="tablist" aria-label="Review navigation">
            {reviews.map((rv, i) => (
              <button
                key={rv._id}
                role="tab"
                aria-selected={i === active}
                aria-label={`Review ${i + 1} of ${total}`}
                className={`rev-dot${i === active ? ' rev-dot-active' : ''}`}
                onClick={() => goTo(i, i > active ? 'next' : 'prev')}
              />
            ))}
          </div>

          {/* Prev / Next */}
          <div className="rev-arrows">
            <button
              className="rev-arrow"
              onClick={back}
              aria-label="Previous review"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <polyline points="15,18 9,12 15,6" />
              </svg>
            </button>
            <button
              className="rev-arrow"
              onClick={next}
              aria-label="Next review"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Progress bar */}
      {total > 1 && !paused && (
        <div className="rev-progress-wrap" aria-hidden="true">
          <div key={active} className="rev-progress-bar" />
        </div>
      )}
    </div>
  );
}

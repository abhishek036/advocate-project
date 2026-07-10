import Link from 'next/link';

export default function Footer() {
  return (
    <section id="ftcta" className="nd-deep ftcta-new" aria-labelledby="ftcta-hl">
      <div className="ftcta-centered">
        <div className="sey-ruled fey-ruled rv" style={{ justifyContent: 'center' }}>
          <span className="sey-line sey-line-dim" />
          <span>Begin Your Consultation</span>
          <span className="sey-line sey-line-dim" />
        </div>
        <h2 className="fhl rv d1" id="ftcta-hl">
          Your legal partner,<br /><em>one message away.</em>
        </h2>
        <div className="ftcta-cta-row rv d2">
          <div className="mw" id="ftcta-mw">
            <a
              id="mb"
              href="https://wa.me/919974772427?text=Hello%2C%20I%20would%20like%20to%20book%20a%20free%20consultation%20with%20RemoteVakil."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Schedule your consultation via WhatsApp"
              className="ftcta-wa-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp — Free Consultation
            </a>
          </div>
          <a
            href="https://mail.google.com/mail/?view=cm&to=advocatepulkitrastogi@gmail.com&su=Free%20Consultation%20Request"
            target="_blank"
            rel="noopener noreferrer"
            className="ftcta-email-btn"
            aria-label="Email us at advocatepulkitrastogi@gmail.com"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <polyline points="2,4 12,13 22,4"/>
            </svg>
            advocatepulkitrastogi@gmail.com
          </a>
        </div>
        <div className="ftcta-stats-row rv d3">
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

      <nav className="fln" aria-label="Footer navigation">
        <Link href="/#services" className="flnk">Services</Link>
        <Link href="/#trust" className="flnk">Why Us</Link>
        <Link href="/blog" className="flnk">Insights</Link>
        <Link href="/#faq" className="flnk">FAQ</Link>
        <a href="https://mail.google.com/mail/?view=cm&to=advocatepulkitrastogi@gmail.com&su=Legal%20Enquiry" target="_blank" rel="noopener noreferrer" className="flnk">Contact</a>
        <a href="#" className="flnk">Privacy Policy</a>
        <a href="#" className="flnk">Terms of Service</a>
      </nav>
      <div className="fb">
        <span className="flo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0 }} aria-hidden="true">
            <circle cx="50" cy="50" r="50" fill="#FFFFFF" fillOpacity="0.12"/>
            <circle cx="26" cy="26" r="12" fill="#FFFFFF"/>
            <circle cx="26" cy="50" r="12" fill="#FFFFFF"/>
            <circle cx="26" cy="74" r="12" fill="#FFFFFF"/>
            <circle cx="50" cy="74" r="12" fill="#FFFFFF"/>
            <circle cx="74" cy="74" r="12" fill="#FFFFFF"/>
          </svg>
          RemoteVakil
        </span>
        <span className="fcp">&copy; 2026 RemoteVakil. All rights reserved. Not a law firm. Legal services facilitated through our verified advocate network.</span>
      </div>
    </section>
  );
}

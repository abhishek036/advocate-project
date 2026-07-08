'use client';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Trust() {
  useEffect(() => {
    ['tl1', 'tl2', 'tl3'].forEach(id => {
      const l = document.getElementById(id);
      if (!l) return;
      const li = l.querySelectorAll('li');
      const o = new IntersectionObserver(es => {
        es.forEach(e => {
          if (e.isIntersecting) {
            li.forEach((x, i) => setTimeout(() => x.classList.add('vis'), i * 130));
            o.unobserve(e.target);
          }
        });
      }, { threshold: 0.3 });
      o.observe(l);
    });
  }, []);

  return (
    <section id="trust" className="nd" aria-labelledby="trust-hl">
      <div className="ti sf2 vis">
        <p className="sey">Why RemoteVakil</p>
        <h2 className="sh" id="trust-hl">Trust is not declared.<br /><em>It is designed.</em></h2>
      </div>
      <div className="tblk">
        <div className="tiw"><Image src="/trust_advocate.webp" alt="Verified advocate reviewing case documents" width={800} height={600} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover' }} /></div>
        <div className="tco sf2 vis">
          <div className="tnum">01 / 04</div>
          <h3 className="tft">Verified <em>Advocate</em> Network</h3>
          <p className="tfd">Every advocate is individually vetted — bar enrollment verified, practice history reviewed, specialty confirmed. You are never a ticket in a queue.</p>
          <ul className="tfl" id="tl1">
            <li>Bar Council Verification</li>
            <li>Specialisation Matching</li>
            <li>Peer Review Standards</li>
            <li>Conflict-of-Interest Screening</li>
          </ul>
        </div>
      </div>
      <div className="tblk">
        <div className="tiw"><Image src="/trust_relationship.webp" alt="Dedicated relationship manager consulting a client" width={800} height={600} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover' }} /></div>
        <div className="tco sf2 vis">
          <div className="tnum">02 / 04</div>
          <h3 className="tft">Dedicated <em>Relationship</em> Manager</h3>
          <p className="tfd">One single point of contact who knows your case history, anticipates your needs, and coordinates every moving part. Legal services with a memory.</p>
          <ul className="tfl" id="tl2">
            <li>Personalised Case Briefings</li>
            <li>Proactive Monthly Updates</li>
            <li>Video Consultation Scheduling</li>
            <li>Escalation Management</li>
          </ul>
        </div>
      </div>
      <div className="tblk">
        <div className="tiw"><Image src="/trust_vault.webp" alt="Secure legal document vault with encryption" width={800} height={600} loading="lazy" style={{ width:'100%', height:'100%', objectFit:'cover' }} /></div>
        <div className="tco sf2 vis">
          <div className="tnum">03 / 04</div>
          <h3 className="tft">Secure <em>Document</em> Vault</h3>
          <p className="tfd">Military-grade encrypted storage for all your legal documents. Accessible only to you and your authorised advocates.</p>
          <ul className="tfl" id="tl3">
            <li>AES-256 Encryption at Rest</li>
            <li>Granular Access Controls</li>
            <li>Immutable Audit Logs</li>
            <li>Retention Policy Compliance</li>
          </ul>
        </div>
      </div>
      <div className="tblk" style={{ gridTemplateColumns: '1fr', minHeight: 'auto', borderTop: '1px solid var(--bd)' }}>
        <div className="tco sf2 vis" style={{ borderLeft: 'none', padding: '72px 80px' }}>
          <div className="tnum">04 / 04</div>
          <h3 className="tft" style={{ maxWidth: '640px' }}>Case Status <em>Explained. Always.</em></h3>
          <p className="tfd" style={{ maxWidth: '580px' }}>No more decoding legal jargon. We translate every status update into plain language, with context and next-step guidance, sent directly to you.</p>
        </div>
      </div>
    </section>
  );
}

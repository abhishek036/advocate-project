'use client';
import { useState } from 'react';

const FAQS = [
  {
    q: "Can I manage my case remotely?",
    a: "Absolutely — that's exactly what RemoteVakil was built for. We work with clients across India and globally. Everything is managed remotely via video calls and secure digital channels."
  },
  {
    q: "Do I need to physically be present in India for my case?",
    a: "In most cases, no. For property registrations, court matters, and documentation services, we handle on-ground representation through our verified advocate network across India. For situations where physical presence is legally required (such as certain High Court hearings), we will advise you well in advance so you can plan accordingly."
  },
  {
    q: "What is your fee structure? Are there hidden costs?",
    a: "We believe in complete transparency. After your initial free consultation, we provide a detailed written fee estimate before any engagement begins. Our fees are fixed for defined scopes (e.g., drafting a specific agreement) or milestone-based for longer matters. There are no surprise costs — any additional expenses (like stamp duty or court fees) are communicated and approved by you first."
  },
  {
    q: "How quickly will I hear back after I reach out?",
    a: "Our committed SLA is a response within 48 business hours of your first message. In practice, most clients hear back within the same business day. For urgent matters (like bail applications or injunctions), please mention 'URGENT' in your message and we prioritise accordingly."
  },
  {
    q: "How do I know the advocates on your network are qualified and trustworthy?",
    a: "Every advocate in our network is verified by the Bar Council of India. We personally vet their specialisation, track record, and client feedback before they join our platform. Your Relationship Manager — who stays with you throughout the case — takes full accountability for the quality of work delivered."
  },
  {
    q: "What happens if I'm not satisfied with the service?",
    a: "We operate on a 98% client retention rate because satisfaction is not optional for us. If at any stage you feel the work isn't meeting expectations, you can speak directly with our founding team. For scoped work that has not begun, we offer a full refund. We would rather part ways transparently than have a dissatisfied client."
  },
  {
    q: "Can you handle legal matters in any city or state in India?",
    a: "Yes. We have verified advocates across all major cities and states — Delhi, Mumbai, Pune, Bengaluru, Chennai, Hyderabad, Kolkata, Ahmedabad, Jaipur, and beyond. For district-level matters in smaller towns, we leverage our network and typically confirm coverage within 24 hours of your inquiry."
  },
  {
    q: "Is my personal and case information kept confidential?",
    a: "Client confidentiality is fundamental to legal practice and is something we take extremely seriously. All your documents are stored in an encrypted Secure Vault accessible only to you and your assigned advocate. We never share client information with third parties under any circumstances."
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="sec faq-sec" aria-labelledby="faq-hl">
      <div className="faq-hd">
        <div className="sey-ruled rv">
          <span className="sey-line" />
          <span>Common Questions</span>
        </div>
        <h2 className="sh rv d1" id="faq-hl">
          Everything you need<br /><em>to know.</em>
        </h2>
        <p className="faq-sub rv d2">Expert legal representation in India. Wherever you are.</p>
      </div>

      <div className="faq-list rv d2" role="list">
        {FAQS.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className={`faq-item${isOpen ? ' faq-open' : ''}`} role="listitem">
              <button
                className="faq-q"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
                type="button"
                id={`faq-btn-${i}`}
                aria-controls={`faq-ans-${i}`}
              >
                <span className="faq-q-text">{item.q}</span>
                <span className="faq-icon" aria-hidden="true">{isOpen ? '−' : '+'}</span>
              </button>
              <div
                id={`faq-ans-${i}`}
                className="faq-a"
                role="region"
                aria-labelledby={`faq-btn-${i}`}
                hidden={!isOpen}
              >
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

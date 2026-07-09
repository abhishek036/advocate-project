'use client';
import { useEffect, useRef, useState } from 'react';

const SERVICES = [
  {
    id: 'svc-1',
    num: '01',
    tag: 'Property & Real Estate',
    items: [
      'Property title verification',
      'Due diligence before buying property',
      'Sale and purchase documentation',
      'Gift deed drafting and registration support',
      'Partition and inheritance disputes',
      'Encroachment and illegal possession matters',
      'Property mutation assistance',
      'Rent agreement drafting and tenant disputes',
      'Builder disputes and consumer complaints',
      'Property inspection through local advocates',
    ],
  },
  {
    id: 'svc-2',
    num: '02',
    tag: 'Power of Attorney (POA)',
    items: [
      'Drafting General and Special Power of Attorney',
      'Guidance on notarization and apostille',
      'Registration of POA in India',
      'Revocation of Power of Attorney',
    ],
  },
  {
    id: 'svc-3',
    num: '03',
    tag: 'Family & Personal Laws',
    items: [
      'Divorce representation',
      'Mutual consent divorce',
      'Child custody matters',
      'Domestic violence proceedings',
      'Maintenance matters',
      'Marriage registration assistance',
      'Cross-border marriage legal issues',
    ],
  },
  {
    id: 'svc-4',
    num: '04',
    tag: 'Inheritance & Succession',
    items: [
      'Legal heir certificate assistance',
      'Succession certificate',
      'Probate and Letters of Administration',
      'Will drafting',
      'Execution and registration of wills',
      'Estate planning',
    ],
  },
  {
    id: 'svc-5',
    num: '05',
    tag: 'Court Representation',
    items: [
      'Civil litigation',
      'Criminal case assistance',
      'Bail applications',
      'Consumer disputes',
      'High Court matters',
      'Tribunal representation',
      'Case status monitoring',
      'Certified copy procurement',
    ],
  },
  {
    id: 'svc-6',
    num: '06',
    tag: 'Documentation Services',
    items: [
      'Affidavits',
      'Indemnity bonds',
      'Declarations',
      'Agreements',
      'Legal notices',
      'Document verification',
      'Translation and notarization coordination',
    ],
  },
  {
    id: 'svc-7',
    num: '07',
    tag: 'Business & Corporate',
    items: [
      'Company incorporation',
      'LLP registration',
      'GST registration',
      'Trademark filing',
      'Contract drafting and review',
      'Vendor agreements',
      'Employment agreements',
      'Legal compliance for businesses operating in India',
    ],
  },
  {
    id: 'svc-8',
    num: '08',
    tag: 'Banking & Financial Assistance',
    items: [
      'Recovery of dues',
      'Loan settlement guidance',
      'Banking disputes',
      'Cheque bounce matters',
      'Financial fraud complaints',
    ],
  },
  {
    id: 'svc-9',
    num: '09',
    tag: 'Government Liaison',
    items: [
      'Revenue office matters',
      'Municipal authority issues',
      'RTI applications',
      'Passport-related legal support',
      'Police complaint assistance',
      'Representation before government departments',
    ],
  },
  {
    id: 'svc-10',
    num: '10',
    tag: 'Cyber & Digital Law',
    items: [
      'Online fraud complaints',
      'Cybercrime reporting',
      'Data privacy advisory',
      'Digital evidence preservation',
      'Social media defamation matters',
    ],
  },
  {
    id: 'svc-11',
    num: '11',
    tag: 'Legal Research & Advisory',
    items: [
      'Second legal opinions',
      'Case strategy consultation',
      'Legal opinion on documents',
      'Risk assessment before investments',
      'Compliance advisory',
    ],
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState<string>('svc-1');
  const markerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const activeService = SERVICES.find(s => s.id === activeId) || SERVICES[0];

  useEffect(() => {
    if (!markerRef.current || !listRef.current) return;
    const btn = listRef.current.querySelector(`[data-svcid="${activeId}"]`) as HTMLElement;
    if (!btn) return;
    const listRect = listRef.current.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    markerRef.current.style.top = `${btnRect.top - listRect.top}px`;
    markerRef.current.style.height = `${btnRect.height}px`;
  }, [activeId]);

  return (
    <section id="services" className="sec svc-sec ns" aria-labelledby="svc-hl">
      <div className="svhd">
        <div>
          <p className="sey rv vis">Core Services</p>
          <h2 className="sh rv d1 vis" id="svc-hl">
            Every legal need,<br /><em>precisely served.</em>
          </h2>
        </div>
        <p className="svc-sub rv d2 vis">11 practice areas. One seamless experience.</p>
      </div>

      {/* Desktop layout */}
      <div className="svc-layout rv d2 vis">
        <div className="svc-list-wrap">
          <div className="svc-list" ref={listRef}>
            <div className="svc-pill" ref={markerRef} aria-hidden="true" />
            {SERVICES.map((svc) => (
              <button
                key={svc.id}
                data-svcid={svc.id}
                className={`svc-btn${svc.id === activeId ? ' svc-btn-active' : ''}`}
                onClick={() => setActiveId(svc.id)}
                type="button"
                aria-selected={svc.id === activeId}
              >
                <span className="svc-btn-num">{svc.num}</span>
                <span className="svc-btn-label">{svc.tag}</span>
                <span className="svc-btn-arrow">&#8594;</span>
              </button>
            ))}
          </div>
        </div>

        <div className="svc-panel" key={activeId} aria-live="polite">
          <div className="svc-panel-top">
            <div className="svc-panel-num-badge">{activeService.num}</div>
            <h3 className="svc-panel-title">{activeService.tag}</h3>
          </div>
          <ul className="svc-items" role="list">
            {activeService.items.map((item, i) => (
              <li
                key={item}
                className="svc-item"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <span className="svc-item-dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="svc-panel-foot">
            <span>{activeService.items.length} services in this area</span>
            <a href="#ftcta" className="svc-cta-link">Get Started &#8594;</a>
          </div>
        </div>
      </div>

      {/* Mobile accordion */}
      <div className="svc-mobile">
        {SERVICES.map((svc) => {
          const isOpen = svc.id === activeId;
          return (
            <div key={svc.id} className={`svc-acc${isOpen ? ' svc-acc-open' : ''}`}>
              <button
                className="svc-acc-head"
                onClick={() => setActiveId(isOpen ? '' : svc.id)}
                type="button"
                aria-expanded={isOpen}
              >
                <span className="svc-acc-num">{svc.num}</span>
                <span className="svc-acc-tag">{svc.tag}</span>
                <span className="svc-acc-chevron">{isOpen ? '\u2212' : '+'}</span>
              </button>
              {isOpen && (
                <ul className="svc-acc-body" role="list">
                  {svc.items.map((item) => (
                    <li key={item} className="svc-acc-item">
                      <span className="svc-item-dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

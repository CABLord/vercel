'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { pageContent } from './site-data';

const PHONE = '+39 329 323 0211';
const PHONE_LINK = 'tel:+393293230211';
const EMAIL = 'info@taxi-james.it';
const EMAIL_LINK = 'mailto:info@taxi-james.it';
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393293230211';
const HERO_IMAGE =
  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1800&q=80';
const LOUNGE_IMAGE =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80';
const ROAD_IMAGE =
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80';

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-copy">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default function LandingPage({ locale }) {
  const t = pageContent[locale] || pageContent.it;
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const reduceMotion = useReducedMotion();

  const initialForm = useMemo(
    () => ({
      locale,
      name: '',
      email: '',
      phone: '',
      service: '',
      pickup: '',
      dropoff: '',
      date: '',
      message: '',
      consent: false,
      website: ''
    }),
    [locale]
  );

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    setForm((prev) => ({ ...prev, locale }));
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const whatsappText = encodeURIComponent(
    locale === 'de'
      ? 'Guten Tag, ich möchte eine Fahrt mit Taxi James anfragen.'
      : locale === 'en'
        ? 'Hello, I would like to request a ride with Taxi James.'
        : 'Buongiorno, vorrei richiedere un transfer con Taxi James.'
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error || 'Failed');
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 1, 0.2, 1] } }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Taxi James',
    image: HERO_IMAGE,
    url: `https://taxi-james.it/${locale}`,
    telephone: PHONE,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bressanone / Brixen',
      addressRegion: 'Bolzano / South Tyrol',
      addressCountry: 'IT'
    },
    areaServed: [
      'Bressanone / Brixen',
      'Valle Isarco / Eisacktal',
      'Val Pusteria / Pustertal',
      'Val Badia / Gadertal',
      'Val Gardena / Gröden',
      'Plose',
      'Lago di Braies / Pragser Wildsee',
      'Bolzano Airport',
      'Innsbruck Airport',
      'Verona Airport',
      'Bergamo Airport',
      'Munich Airport',
      'Milan Malpensa Airport',
      'Milan Linate Airport',
      'Venice Airport'
    ],
    sameAs: [`https://taxi-james.it/${locale}`],
    priceRange: '€€',
    description: t.meta.description
  };

  return (
    <>
      #main
        {t.labels.skip}
      </a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="site-header">
        <div className="container nav-shell">
          <a href={`/${locale}`} className="brand" aria-label="Taxi James home">
            <span className="brand-mark" aria-hidden="true">TJ</span>
            <span>
              <strong>Taxi James</strong>
              <small>Bressanone · Brixen</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary">
            <a href="#services">{t.nav[0]}</a>
            <a href="#destinations">{t.nav[1]}</a>
            <a href="#why">{t.nav[2]}</a>
            <a href="#contact">{t.nav[3]}</a>
          </nav>

          <div className="desktop-actions">
            <div className="lang-switch" role="navigation" aria-label={t.labels.language}>
              {['it', 'de', 'en'].map((code) => (
                <a
                  key={code}
                  href={`/${code}`}
                  aria-current={locale === code ? 'page' : undefined}
                  className={locale === code ? 'active' : ''}
                >
                  {pageContent[code].langLabel}
                </a>
              ))}
            </div>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`} className="button button-solid">
              {t.labels.book}
            </a>
          </div>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.labels.menuClose : t.labels.menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              id="mobile-menu"
              className="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="mobile-panel"
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <a href="#services" onClick={() => setMenuOpen(false)}>{t.nav[0]}</a>
                <a href="#destinations" onClick={() => setMenuOpen(false)}>{t.nav[1]}</a>
                <a href="#why" onClick={() => setMenuOpen(false)}>{t.nav[2]}</a>
                <a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav[3]}</a>
                <div className="mobile-lang">
                  {['it', 'de', 'en'].map((code) => (
                    <a key={code} href={`/${code}`} aria-current={locale === code ? 'page' : undefined}>
                      {pageContent[code].langLabel}
                    </a>
                  ))}
                </div>
                <div className="mobile-cta-grid">
                  <a href={PHONE_LINK} className="button button-muted">{t.labels.call}</a>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`} className="button button-solid">
                    {t.labels.whatsapp}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main id="main">
        <section className="hero">
          <div className="hero-media" aria-hidden="true">
            <img src={HERO_IMAGE} alt="" />
            <div className="hero-overlay" />
          </div>
          <div className="container hero-grid">
            <motion.div className="hero-copy" initial="hidden" animate="visible" variants={fadeUp}>
              <p className="eyebrow">{t.hero.kicker}</p>
              <h1>{t.hero.title}</h1>
              <p className="hero-text">{t.hero.text}</p>
              <div className="hero-actions">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`} className="button button-solid">
                  {t.hero.primary}
                </a>
                <a href="#services" className="button button-outline">
                  {t.hero.secondary}
                </a>
              </div>
              <ul className="hero-points" aria-label="Highlights">
                {t.hero.cards.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>

            <motion.aside className="hero-card" initial="hidden" animate="visible" variants={fadeUp}>
              <p className="mini-label">{locale === 'de' ? 'Direkter Kontakt' : locale === 'en' ? 'Direct booking' : 'Contatto diretto'}</p>
              <div className="contact-stack">
                <a href={PHONE_LINK}>{PHONE}</a>
                <a href={EMAIL_LINK}>{EMAIL}</a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}>WhatsApp</a>
              </div>
              <div className="trust-grid">
                {t.trust.map((item) => (
                  <div key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </section>

        <motion.section className="section" id="services" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
          <div className="container">
            <SectionHeading title={t.servicesTitle} text={t.servicesText} />
            <div className="service-grid">
              {t.services.map((item, index) => (
                <article className="card service-card" key={item}>
                  <span className="service-index">0{index + 1}</span>
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section className="section scenic-section" id="destinations" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
          <div className="container scenic-grid">
            <div>
              <SectionHeading title={t.reachTitle} text={t.reachText} />
              <div className="tag-block">
                <h3>{locale === 'de' ? 'Regionen' : locale === 'en' ? 'Areas' : 'Aree'}</h3>
                <div className="tags">
                  {t.destinations.areas.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div className="tag-block">
                <h3>{locale === 'de' ? 'Große Flughäfen' : locale === 'en' ? 'Major airports' : 'Aeroporti principali'}</h3>
                <div className="tags accent-tags">
                  {t.destinations.airports.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="image-stack" aria-hidden="true">
              <img src={LOUNGE_IMAGE} alt="" className="image-large" loading="lazy" />
              <img src={ROAD_IMAGE} alt="" className="image-small" loading="lazy" />
            </div>
          </div>
        </motion.section>

        <motion.section className="section muted-section" id="why" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
          <div className="container">
            <SectionHeading title={t.whyTitle} />
            <div className="why-grid">
              {t.why.map((item) => (
                <article className="card why-card" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
          <div className="container">
            <SectionHeading title={t.processTitle} />
            <div className="process-grid">
              {t.process.map((item) => (
                <article className="process-card" key={item.step}>
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section className="section contact-section" id="contact" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeUp}>
          <div className="container contact-grid">
            <div>
              <SectionHeading title={t.labels.formTitle} text={t.labels.formSubtitle} />
              <div className="contact-card card">
                <a href={PHONE_LINK}>{PHONE}</a>
                <a href={EMAIL_LINK}>{EMAIL}</a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}>WhatsApp</a>
              </div>
            </div>

            <form className="form card" onSubmit={handleSubmit} noValidate>
              <input type="text" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} tabIndex="-1" autoComplete="off" className="hp" aria-hidden="true" />
              <div className="field-grid two">
                <label>
                  <span>{t.form.name}</span>
                  <input required type="text" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
                </label>
                <label>
                  <span>{t.form.email}</span>
                  <input required type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
                </label>
              </div>
              <div className="field-grid two">
                <label>
                  <span>{t.form.phone}</span>
                  <input type="tel" name="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" />
                </label>
                <label>
                  <span>{t.form.service}</span>
                  <select name="service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                    <option value="">—</option>
                    {t.form.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="field-grid two">
                <label>
                  <span>{t.form.pickup}</span>
                  <input type="text" name="pickup" value={form.pickup} onChange={(e) => setForm({ ...form, pickup: e.target.value })} />
                </label>
                <label>
                  <span>{t.form.dropoff}</span>
                  <input type="text" name="dropoff" value={form.dropoff} onChange={(e) => setForm({ ...form, dropoff: e.target.value })} />
                </label>
              </div>
              <label>
                <span>{t.form.date}</span>
                <input type="datetime-local" name="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </label>
              <label>
                <span>{t.form.message}</span>
                <textarea required name="message" rows="6" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </label>
              <label className="consent-row">
                <input type="checkbox" required checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
                <span>{t.labels.privacy}</span>
              </label>
              <button type="submit" className="button button-solid" disabled={status === 'loading'}>
                {status === 'loading' ? t.labels.sending : t.form.submit}
              </button>
              <p className={`status ${status}`} aria-live="polite">
                {status === 'success' ? t.labels.sent : status === 'error' ? t.labels.error : ' '}
              </p>
            </form>
          </div>
        </motion.section>

        <section className="section final-cta">
          <div className="container final-cta-shell">
            <div>
              <h2>{t.cta.title}</h2>
              <p>{t.cta.text}</p>
            </div>
            <div className="final-actions">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`} className="button button-solid">
                {t.labels.whatsapp}
              </a>
              <a href={PHONE_LINK} className="button button-outline">
                {t.labels.call}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-shell">
          <p>{t.footer}</p>
          <div>
            <a href={PHONE_LINK}>{PHONE}</a>
            <a href={EMAIL_LINK}>{EMAIL}</a>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
        className="floating-whatsapp"
        aria-label={`${t.labels.whatsapp} Taxi James`}
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M19.11 17.23c-.29-.14-1.7-.84-1.96-.93-.26-.1-.45-.14-.64.14-.19.29-.74.93-.91 1.12-.17.19-.33.21-.62.07-.29-.14-1.23-.45-2.34-1.43-.87-.78-1.45-1.73-1.62-2.02-.17-.29-.02-.45.13-.59.13-.13.29-.33.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 1-.99 2.45 0 1.45 1.05 2.84 1.19 3.03.14.19 2.05 3.13 4.97 4.39.69.3 1.23.48 1.65.61.69.22 1.31.19 1.81.12.55-.08 1.7-.69 1.94-1.35.24-.67.24-1.24.17-1.35-.07-.12-.26-.19-.55-.33zM16.02 3.2C8.92 3.2 3.17 8.94 3.17 16.03c0 2.27.59 4.48 1.71 6.43L3 29l6.71-1.76a12.77 12.77 0 006.31 1.62h.01c7.09 0 12.84-5.75 12.84-12.84 0-3.43-1.33-6.65-3.76-9.08A12.74 12.74 0 0016.02 3.2zm0 23.48h-.01a10.6 10.6 0 01-5.4-1.48l-.39-.23-3.98 1.04 1.07-3.88-.25-.4a10.63 10.63 0 01-1.63-5.69c0-5.89 4.79-10.68 10.69-10.68 2.85 0 5.52 1.11 7.53 3.12a10.58 10.58 0 013.12 7.56c0 5.89-4.8 10.67-10.69 10.67z" fill="currentColor"/>
        </svg>
        <span>{t.labels.whatsapp}</span>
      </a>
    </>
  );
}

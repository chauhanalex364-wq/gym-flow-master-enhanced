import { useState } from 'react';
import Scene3D from './Scene3D';
import { gymConfig as c } from './config';

const wa = `https://wa.me/${c.brand.phone.replace('+', '')}?text=${encodeURIComponent(c.brand.whatsappMessage)}`;
const tel = `tel:${c.brand.phone}`;

function Arrow() { return <span aria-hidden="true">↗</span>; }
function Spark() { return <span className="spark" aria-hidden="true">✦</span>; }

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <header className="nav-wrap">
        <div className="nav container">
          <button className="brand" onClick={() => jump('home')} aria-label="Gym Flow home">
            <span className="brand-mark"><span>GF</span></span>
            <span className="brand-word"><strong>{c.brand.name}</strong><small>TRAIN · PERFORM · EVOLVE</small></span>
          </button>
          <nav className={`desktop-nav ${menuOpen ? 'mobile-open' : ''}`}>
            <button onClick={() => jump('about')}>About</button>
            <button onClick={() => jump('facility')}>Experience</button>
            <button onClick={() => jump('team')}>Coaches</button>
            <button onClick={() => jump('stories')}>Stories</button>
            <button onClick={() => jump('contact')}>Contact</button>
          </nav>
          <div className="nav-actions">
            <a className="ghost-btn hide-mobile" href={tel}>Call us</a>
            <a className="solid-btn nav-cta" href={wa}><span>Book a Visit</span><Arrow /></a>
            <button className="menu-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle navigation">☰</button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero section-pad">
          <div className="hero-bg"><Scene3D /></div>
          <div className="hero-overlay" />
          <div className="hero-glow" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="dot" /> {c.content.heroKicker}</div>
              <div className="hero-badge"><Spark /> PRIVATE TRAINING · PREMIUM FACILITY · COACH-LED</div>
              <h1>Build a body<br /><em>that feels alive.</em></h1>
              <p>{c.brand.subline}</p>
              <div className="hero-actions">
                <a className="solid-btn large primary-cta" href={wa}><span>Book a Free Gym Tour</span><Arrow /></a>
                <a className="outline-cta" href={tel}><span className="phone-dot" /> Talk to the Gym · {c.brand.displayPhone}</a>
              </div>
              <div className="hero-proof">
                <span><b>01</b> Personal guidance</span>
                <span><b>02</b> Progress-focused training</span>
                <span><b>03</b> Clean premium environment</span>
              </div>
              <div className="hero-meta">
                <span>{c.brand.location}</span><span className="meta-line" /><span>{c.brand.hours}</span>
              </div>
            </div>

            <div className="hero-card-wrap">
              <div className="hero-orbit-label">GYM FLOW / SIGNATURE</div>
              <div className="hero-card">
                <div className="hero-card-top"><span>EST. 2026</span><span>01 / 03</span></div>
                <div className="hero-card-title">THE<br /><em>DAILY STANDARD.</em></div>
                <div className="hero-stat"><strong>01</strong><span>Focus<br />over noise</span></div>
                <div className="hero-stat"><strong>∞</strong><span>Progress<br />over perfection</span></div>
                <div className="hero-card-foot"><span>STAY CONSISTENT</span><Arrow /></div>
              </div>
              <div className="floating-mini">
                <span className="mini-dot" /> <b>OPEN TODAY</b><small>05:00 — 22:00</small>
              </div>
            </div>
          </div>
          <div className="hero-bottomline container">
            <span>SCROLL TO EXPLORE</span><span className="line-fill" /><span>01—06</span>
          </div>
        </section>

        <section className="trust-strip dark-section">
          <div className="container trust-grid">
            <div><span>01</span><b>Purpose-built</b><small>Every detail earns its place.</small></div>
            <div><span>02</span><b>Human-led</b><small>Real coaches. Real accountability.</small></div>
            <div><span>03</span><b>Progress-first</b><small>Training designed to move you forward.</small></div>
            <div><span>04</span><b>Premium feel</b><small>Clean, calm and seriously well made.</small></div>
          </div>
        </section>

        {c.sections.showAbout && <section id="about" className="about section-pad light-section">
          <div className="container split-grid">
            <div>
              <div className="eyebrow dark"><span className="dot" /> THE GYM FLOW PHILOSOPHY</div>
              <h2>{c.content.aboutTitle}</h2>
            </div>
            <div className="about-copy">
              <p>{c.content.aboutCopy}</p>
              <div className="about-signature">{c.brand.shortName}<span>MOVE WITH PURPOSE.</span></div>
              <a className="under-link" href={wa}>Talk to the team <Arrow /></a>
            </div>
          </div>
        </section>}

        {c.sections.showFacilities && <section id="facility" className="section-pad dark-section experience-section">
          <div className="container">
            <div className="section-heading">
              <div><div className="eyebrow"><span className="dot" /> THE EXPERIENCE</div><h2>Designed to make<br /><em>training unforgettable.</em></h2></div>
              <p>Everything is intentional: the layout, light, energy, coaching and recovery. The goal is simple — make your best sessions easier to repeat.</p>
            </div>
            <div className="feature-grid">
              {c.content.facilities.map(([num, title, text]) => <article className="feature-card" key={num}>
                <div className="feature-top"><span className="feature-num">{num}</span><Arrow /></div>
                <h3>{title}</h3><p>{text}</p><div className="feature-line" />
              </article>)}
            </div>
            <div className="section-cta-row"><span>COME FEEL THE DIFFERENCE IN PERSON.</span><a className="outline-cta light" href={wa}>Reserve your tour <Arrow /></a></div>
          </div>
        </section>}

        {c.sections.showGallery && <section className="visual-band section-pad">
          <div className="container visual-grid">
            <div className="visual-poster poster-a"><div className="poster-overlay" /><span><small>01 / CAMPAIGN</small>DISCIPLINE<br /><b>IN MOTION.</b></span></div>
            <div className="visual-poster poster-b"><div className="poster-overlay" /><span><small>02 / MINDSET</small>NOISE<br /><b>OFF.</b></span></div>
            <div className="visual-note"><span>Replace demo visuals with the gym's own landscape, interior or campaign photography.</span><span>MASTER TEMPLATE / READY TO CUSTOMISE</span></div>
          </div>
        </section>}

        {c.sections.showTrainers && <section id="team" className="section-pad light-section">
          <div className="container">
            <div className="section-heading dark-heading"><div><div className="eyebrow dark"><span className="dot" /> THE COACHES</div><h2>Good coaching<br /><em>changes everything.</em></h2></div><p>Swap these profiles with the gym's real trainers during customization.</p></div>
            <div className="trainer-grid">
              {c.content.trainers.map((t, i) => <article className="trainer-card" key={t.name}>
                <div className={`trainer-avatar avatar-${i}`}><span>{t.name.split(' ').map(x => x[0]).join('')}</span><small>COACH / 0{i + 1}</small></div>
                <div className="trainer-info"><span>{t.role}</span><h3>{t.name}</h3><p>{t.text}</p></div>
              </article>)}
            </div>
          </div>
        </section>}

        {c.sections.showTestimonials && <section id="stories" className="section-pad dark-section">
          <div className="container">
            <div className="section-heading"><div><div className="eyebrow"><span className="dot" /> MEMBER STORIES</div><h2>Real voice.<br /><em>Replace with real proof.</em></h2></div><p>These are clearly marked demo testimonials and should be replaced with genuine member reviews before launch.</p></div>
            <div className="quote-grid">
              {c.content.testimonials.map((t, i) => <article className="quote-card" key={i}><div className="stars">★★★★★</div><p>“{t.text}”</p><div><strong>{t.name}</strong><span>{t.meta}</span></div></article>)}
            </div>
          </div>
        </section>}

        {c.sections.showContact && <section id="contact" className="contact section-pad light-section">
          <div className="container contact-box">
            <div>
              <div className="eyebrow dark"><span className="dot" /> VISIT / MESSAGE / TRAIN</div>
              <h2>Ready to make your<br /><em>next session count?</em></h2>
              <p>{c.brand.location}<br />{c.brand.hours}</p>
            </div>
            <div className="contact-actions">
              <a className="solid-btn large primary-cta" href={wa}><span>Book a Free Gym Tour</span><Arrow /></a>
              <a className="ghost-btn dark-ghost" href={tel}>Call {c.brand.displayPhone}</a>
            </div>
          </div>
        </section>}
      </main>

      <footer className="footer dark-section">
        <div className="container footer-inner"><div className="brand"><span className="brand-mark"><span>GF</span></span><span className="brand-word"><strong>{c.brand.name}</strong><small>TRAIN · PERFORM · EVOLVE</small></span></div><span>Premium gym web experience · Demo master template</span></div>
      </footer>

      <a className="floating-wa" href={wa} aria-label="WhatsApp Gym Flow"><span>WA</span><small>Chat</small></a>
      <a className="mobile-cta-bar" href={wa}><span><b>Ready to feel the difference?</b><small>Message us on WhatsApp</small></span><strong>Book a Tour <Arrow /></strong></a>
    </div>
  );
}

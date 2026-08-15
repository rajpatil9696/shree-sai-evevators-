export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__media">
        <img src="/assets/images/master image.png" alt="Shree Sai Elevators gold-finish elevator bank" loading="eager" />
        <div className="hero__scrim"></div>
      </div>
      <div className="container hero__content">
        <h1>SHREE SAI <span className="text-gold">ELEVATORS</span></h1>
        <h2 style={{ color: 'white' }}>Easier, Smarter and Trusted Lifts</h2>
        <p className="hero__sub">
          Shree Sai Elevators engineers, installs and maintains passenger &amp; goods elevators
          —from gearless machine rooms to hospital and capsule lifts— built for Maharashtra's
          buildings and backed by a local service team that actually picks up the phone.
        </p>
        <div className="hero__cta">
          <a href="#contact" className="btn btn--gold btn--lg">Request a Free Site Visit</a>
          <a href="/assets/docs/Shree-Sai-Elevators-Brochure.pdf" className="btn btn--outline btn--lg" download>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" />
            </svg>
            Download Brochure
          </a>
        </div>
        <div className="hero__stats">
          <div><span className="stat-num">3–20</span><span className="stat-label">passenger capacity range</span></div>
          <div><span className="stat-num">30%</span><span className="stat-label">energy saved, gearless drives</span></div>
          <div><span className="stat-num">500+</span><span className="stat-label"></span>Elevators Installed</div>
        </div>
      </div>
    </section>
  )
}

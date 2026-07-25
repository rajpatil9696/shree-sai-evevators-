export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/assets/images/logo.png" alt="Shree Sai Elevators logo" style={{ width: '400px', height: 'auto' }} />
        </div>
        <div className="footer__links">
          <h2 style={{ color: '#ffffff' }}>Explore</h2>
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#safety">Safety</a>
          <a href="#offices">Offices</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer__links">
          <h2 style={{ color: '#ffffff' }}>Get in touch</h2>
          <a href="tel:+919834562220, +919665240518, +919730128617">+919834562220, +919665240518, +919730128617</a>
          <a href="mailto:shreesaielevators8@gmail.com">shreesaielevators8@gmail.com</a>
          <a href="/assets/docs/Shree-Sai-Elevators-Brochure.pdf" download>Download Brochure</a>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>&copy; <span id="year">{year}</span> Shree Sai Elevators. All rights reserved.</p>
        <p>shreesaielevators.org</p>
      </div>
    </footer>
  )
}

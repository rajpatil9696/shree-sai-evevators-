import { useState } from 'react'

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#products', label: 'Products' },
  { href: '#safety', label: 'Safety' },
  { href: '#why', label: 'Why Us' },
  { href: '#offices', label: 'Offices' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="site-header" id="siteHeader">
      <div className="container header__inner">
        <a href="#home" className="brand">
          <img src="/assets/images/logo3.png" alt="Shree Sai Elevators logo" className="brand__logo" />
        </a>
        <nav className={`main-nav${isOpen ? ' is-open' : ''}`} id="mainNav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header__actions">
          <a href="tel:+919834562220" className="btn btn--ghost btn--sm">Call Us</a>
          <a href="#contact" className="btn btn--gold btn--sm">Get a Quote</a>
          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

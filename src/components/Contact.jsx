import { useState } from 'react'

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  location: '',
  interest: 'New elevator installation',
  message: '',
  website: '', // honeypot
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [status, setStatus] = useState({ text: '', type: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Honeypot check
    if (form.website.trim() !== '') return

    const formEl = e.target
    if (!formEl.checkValidity()) {
      formEl.reportValidity()
      return
    }

    setSubmitting(true)
    setStatus({ text: '', type: '' })

    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await res.json()

      if (res.ok && result.success) {
        setStatus({ text: "Thanks — we've received your enquiry and will call you back shortly.", type: 'success' })
        setForm(INITIAL_FORM)
      } else {
        setStatus({ text: result.message || 'Something went wrong. Please call us directly at 98345 62220.', type: 'error' })
      }
    } catch (err) {
      setStatus({ text: 'Could not send right now — please call or WhatsApp us at 98345 62220.', type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <h2 className="section-title section-title--light">Tell us about your building</h2>
          <p className="section-sub section-sub--left">
            Share the number of floors, expected passenger load and whether you have a machine
            room, and we'll get back with a site-visit slot.
          </p>

          <ul className="contact-list">
            <li>
              <span className="contact-icon">📍</span>
              <div><strong>Address</strong><p>Chinchkar Chowk, Shree Business Class Building, TC College Rd, Baramati Rural, Baramati, Maharashtra 413102</p></div>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <div><strong>Phone</strong><p><a href="tel:+919834562220">98345 62220</a> &middot; <a href="tel:+919665240518">96652 40518</a> &middot; <a href="tel:+919730128617">97301 28617</a></p></div>
            </li>
            <li>
              <span className="contact-icon">✉️</span>
              <div><strong>Email</strong><p><a href="mailto:shreesaielevators8@gmail.com">shreesaielevators8@gmail.com</a></p></div>
            </li>
            <li>
              <span className="contact-icon">💬</span>
              <div><strong>WhatsApp</strong><p><a href="https://wa.me/919834562220" target="_blank" rel="noopener">98345 62220</a> &middot; <a href="https://wa.me/919665240518" target="_blank" rel="noopener">96652 40518</a> &middot; <a href="https://wa.me/919730128617" target="_blank" rel="noopener">97301 28617</a></p></div>
            </li>
          </ul>

          <div className="social-row">
            <a href="https://instagram.com/shreesaielevators" target="_blank" rel="noopener" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
              <span>@shreesaielevators</span>
            </a>
          </div>

          <div className="map-embed">
            <iframe
              src="https://www.google.com/maps?q=Chinchkar+Chowk,+Shree+Business+Class+Building,+TC+College+Rd,+Baramati+Rural,+Baramati,+Maharashtra+413102&output=embed"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Shree Sai Elevators location map"
            />
          </div>
        </div>

        <div className="contact__form-wrap">
          <form id="contactForm" className="contact-form" noValidate onSubmit={handleSubmit}>
            <h3>Request a callback</h3>

            <div className="form-row">
              <label htmlFor="name">Full name</label>
              <input type="text" id="name" name="name" required autoComplete="name" value={form.name} onChange={handleChange} />
            </div>

            <div className="form-row form-row--split">
              <div>
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" required pattern="[0-9+\-\s]{7,15}" autoComplete="tel" value={form.phone} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="email">Email (optional)</label>
                <input type="email" id="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <label htmlFor="location">Site location / city</label>
              <input type="text" id="location" name="location" placeholder="e.g. Baramati, Pune, Beed" value={form.location} onChange={handleChange} />
            </div>

            <div className="form-row">
              <label htmlFor="interest">I'm enquiring about</label>
              <select id="interest" name="interest" value={form.interest} onChange={handleChange}>
                <option value="New elevator installation">New elevator installation</option>
                <option value="Elevator AMC / servicing">Elevator AMC / servicing</option>
                <option value="Modernisation / repair">Modernisation / repair</option>
                <option value="Spare parts">Spare parts</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" placeholder="Number of floors, passenger capacity, machine room availability, etc." value={form.message} onChange={handleChange} />
            </div>

            {/* honeypot spam trap, hidden from real visitors */}
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="website">Leave this field empty</label>
              <input type="text" id="website" name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn--gold btn--lg btn--full" id="submitBtn" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send Enquiry'}
            </button>
            <p className={`form-status${status.type ? ' ' + status.type : ''}`} id="formStatus" role="status" aria-live="polite">
              {status.text}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

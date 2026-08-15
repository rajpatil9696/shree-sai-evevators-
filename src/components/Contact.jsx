import { useState } from 'react'

// ---------------------------------------------------------------------------
// Web3Forms configuration
// Add your Web3Forms access key to the .env file:
//
// VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
//
// Do NOT hardcode the access key in this file.
// ---------------------------------------------------------------------------
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

// WhatsApp numbers offered to the visitor after a successful submission
const WHATSAPP_NUMBERS = [
  { label: '98345 62220', number: '919834562220' },
  { label: '96652 40518', number: '919665240518' },
]

// ---------------------------------------------------------------------------
// Initial/blank form state
// `website` is a honeypot field — real visitors never see or fill it in.
// ---------------------------------------------------------------------------
const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  location: '',
  interest: 'New elevator installation',
  message: '',
  website: '',
}

// Phone validation
const PHONE_PATTERN = /^[0-9+\-\s]{7,15}$/

// Email validation
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ---------------------------------------------------------------------------
// Form validation
// ---------------------------------------------------------------------------
function validate(values) {
  const errors = {}

  const name = values.name.trim()

  if (name === '' || name.length < 2) {
    errors.name = 'Please enter your full name.'
  }

  const phone = values.phone.trim()

  if (!PHONE_PATTERN.test(phone)) {
    errors.phone = 'Please enter a valid phone number.'
  }

  const email = values.email.trim()

  if (email !== '' && !EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  return errors
}

// ---------------------------------------------------------------------------
// Build WhatsApp message
// ---------------------------------------------------------------------------
function buildWhatsAppMessage(values) {
  const lines = [
    'New website enquiry',
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    values.email ? `Email: ${values.email}` : null,
    values.location ? `Location: ${values.location}` : null,
    `Interest: ${values.interest}`,
    values.message ? `Message: ${values.message}` : null,
  ].filter(Boolean)

  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// Contact Component
// ---------------------------------------------------------------------------
export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState({ text: '', type: '' })
  const [submitting, setSubmitting] = useState(false)

  // Stores the submitted enquiry for WhatsApp buttons
  const [lastEnquiry, setLastEnquiry] = useState(null)

  // -------------------------------------------------------------------------
  // Handle input changes
  // -------------------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Revalidate after field has been touched
    if (touched[name]) {
      setErrors((prev) =>
        validate({
          ...form,
          [name]: value,
        })
      )
    }
  }

  // -------------------------------------------------------------------------
  // Handle input blur
  // -------------------------------------------------------------------------
  const handleBlur = (e) => {
    const { name } = e.target

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    setErrors(validate(form))
  }

  // -------------------------------------------------------------------------
  // Handle form submission
  // -------------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault()

    // -----------------------------------------------------------------------
    // Honeypot spam protection
    // If a bot fills the hidden field, silently pretend submission succeeded.
    // -----------------------------------------------------------------------
    if (form.website.trim() !== '') {
      setStatus({
        text: "Thanks — we've received your enquiry and will call you back shortly.",
        type: 'success',
      })

      setLastEnquiry(form)
      setForm(INITIAL_FORM)
      setTouched({})
      setErrors({})

      return
    }

    // -----------------------------------------------------------------------
    // Validate form
    // -----------------------------------------------------------------------
    const fieldErrors = validate(form)

    setErrors(fieldErrors)

    setTouched({
      name: true,
      phone: true,
      email: true,
      location: true,
      interest: true,
      message: true,
    })

    if (Object.keys(fieldErrors).length > 0) {
      setStatus({
        text: 'Please fix the highlighted fields and try again.',
        type: 'error',
      })

      return
    }

    // -----------------------------------------------------------------------
    // Check Web3Forms access key
    // -----------------------------------------------------------------------
    if (!WEB3FORMS_ACCESS_KEY) {
      console.error(
        'Web3Forms access key is missing. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file.'
      )

      setStatus({
        text: 'Form configuration error. Please contact us by phone or WhatsApp.',
        type: 'error',
      })

      return
    }

    setSubmitting(true)
    setStatus({ text: '', type: '' })
    setLastEnquiry(null)

    try {
      // ---------------------------------------------------------------------
      // Send enquiry to Web3Forms
      // ---------------------------------------------------------------------
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },

        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,

          // Email subject
          subject: 'New Elevator Enquiry - Shree Sai Elevators',

          // Sender name shown in the enquiry
          from_name: 'Shree Sai Elevators Website',

          // Form information
          name: form.name,
          phone: form.phone,
          email: form.email || 'Not provided',
          location: form.location || 'Not provided',
          interest: form.interest,
          message: form.message || '(no message)',
        }),
      })

      const result = await response.json()

      // ---------------------------------------------------------------------
      // Web3Forms successful response
      // ---------------------------------------------------------------------
      if (result.success) {
        setStatus({
          text: "Thanks — we've received your enquiry and will call you back shortly.",
          type: 'success',
        })

        // Keep enquiry for WhatsApp buttons
        setLastEnquiry(form)

        // Reset form
        setForm(INITIAL_FORM)
        setTouched({})
        setErrors({})
      } else {
        throw new Error(result.message || 'Failed to send enquiry')
      }
    } catch (err) {
      console.error('Web3Forms error:', err)

      setStatus({
        text: 'Could not send right now — please call or WhatsApp us at 98345 62220.',
        type: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  // -------------------------------------------------------------------------
  // UI
  // -------------------------------------------------------------------------
  return (
    <section className="contact" id="contact">
      <div className="container contact__grid">

        {/* ================================================================
            CONTACT INFORMATION
        ================================================================ */}
        <div className="contact__info">

          <h2 className="section-title section-title--light">
            Tell us about your building
          </h2>

          <p
            className="section-sub section-sub--left"
            style={{ color: '#ffffff' }}
          >
            Share the number of floors, expected passenger load and whether
            you have a machine room, and we'll get back with a site-visit slot.
          </p>

          <ul className="contact-list">

            {/* Address */}
            <li>
              <span className="contact-icon">📍</span>

              <div>
                <strong>Address</strong>

                <p>
                  Chinchkar Chowk, Shree Business Class Building,
                  TC College Rd, Baramati Rural, Baramati,
                  Maharashtra 413102
                </p>
              </div>
            </li>

            {/* Phone */}
            <li>
              <span className="contact-icon">📞</span>

              <div>
                <strong>Phone</strong>

                <p>
                  <a href="tel:+919834562220">
                    98345 62220
                  </a>{' '}
                  &middot;{' '}

                  <a href="tel:+919665240518">
                    96652 40518
                  </a>{' '}
                  &middot;{' '}

                  <a href="tel:+919730128617">
                    97301 28617
                  </a>
                </p>
              </div>
            </li>

            {/* Email */}
            <li>
              <span className="contact-icon">✉️</span>

              <div>
                <strong>Email</strong>

                <p>
                  <a href="mailto:shreesaielevators8@gmail.com">
                    shreesaielevators8@gmail.com
                  </a>
                </p>
              </div>
            </li>

            {/* WhatsApp */}
            <li>
              <span className="contact-icon">💬</span>

              <div>
                <strong>WhatsApp</strong>

                <p>
                  <a
                    href="https://wa.me/919834562220"
                    target="_blank"
                    rel="noopener"
                  >
                    98345 62220
                  </a>{' '}
                  &middot;{' '}

                  <a
                    href="https://wa.me/919665240518"
                    target="_blank"
                    rel="noopener"
                  >
                    96652 40518
                  </a>{' '}
                  &middot;{' '}

                  <a
                    href="https://wa.me/919730128617"
                    target="_blank"
                    rel="noopener"
                  >
                    97301 28617
                  </a>
                </p>
              </div>
            </li>

          </ul>

          {/* Social */}
          <div className="social-row">

            <a
              href="https://instagram.com/shreesaielevators"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="4"
                />

                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                />
              </svg>

              <span>@shreesaielevators</span>
            </a>

          </div>

          {/* Google Maps */}
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

        {/* ================================================================
            CONTACT FORM
        ================================================================ */}
        <div className="contact__form-wrap">

          <form
            id="contactForm"
            className="contact-form"
            noValidate
            onSubmit={handleSubmit}
          >

            <h3>Request a callback</h3>

            {/* ==========================================================
                NAME
            ========================================================== */}
            <div className="form-row">

              <label htmlFor="name">
                Full name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.name && touched.name
                    ? 'field--invalid'
                    : ''
                }
                aria-invalid={Boolean(
                  errors.name && touched.name
                )}
                aria-describedby="name-error"
              />

              {errors.name && touched.name && (
                <span
                  className="field-error"
                  id="name-error"
                >
                  {errors.name}
                </span>
              )}

            </div>

            {/* ==========================================================
                PHONE + EMAIL
            ========================================================== */}
            <div className="form-row form-row--split">

              {/* Phone */}
              <div>

                <label htmlFor="phone">
                  Phone
                </label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.phone && touched.phone
                      ? 'field--invalid'
                      : ''
                  }
                  aria-invalid={Boolean(
                    errors.phone && touched.phone
                  )}
                  aria-describedby="phone-error"
                />

                {errors.phone && touched.phone && (
                  <span
                    className="field-error"
                    id="phone-error"
                  >
                    {errors.phone}
                  </span>
                )}

              </div>

              {/* Email */}
              <div>

                <label htmlFor="email">
                  Email (optional)
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? 'field--invalid'
                      : ''
                  }
                  aria-invalid={Boolean(
                    errors.email && touched.email
                  )}
                  aria-describedby="email-error"
                />

                {errors.email && touched.email && (
                  <span
                    className="field-error"
                    id="email-error"
                  >
                    {errors.email}
                  </span>
                )}

              </div>

            </div>

            {/* ==========================================================
                LOCATION
            ========================================================== */}
            <div className="form-row">

              <label htmlFor="location">
                Site location / city
              </label>

              <input
                type="text"
                id="location"
                name="location"
                placeholder="e.g. Baramati, Pune, Beed"
                value={form.location}
                onChange={handleChange}
                onBlur={handleBlur}
              />

            </div>

            {/* ==========================================================
                INTEREST
            ========================================================== */}
            <div className="form-row">

              <label htmlFor="interest">
                I'm enquiring about
              </label>

              <select
                id="interest"
                name="interest"
                value={form.interest}
                onChange={handleChange}
              >
                <option value="New elevator installation">
                  New elevator installation
                </option>

                <option value="Elevator AMC / servicing">
                  Elevator AMC / servicing
                </option>

                <option value="Modernisation / repair">
                  Modernisation / repair
                </option>

                <option value="Spare parts">
                  Spare parts
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

            </div>

            {/* ==========================================================
                MESSAGE
            ========================================================== */}
            <div className="form-row">

              <label htmlFor="message">
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Number of floors, passenger capacity, machine room availability, etc."
                value={form.message}
                onChange={handleChange}
              />

            </div>

            {/* ==========================================================
                HONEYPOT SPAM FIELD
            ========================================================== */}
            <div
              className="hp-field"
              aria-hidden="true"
            >

              <label htmlFor="website">
                Leave this field empty
              </label>

              <input
                type="text"
                id="website"
                name="website"
                tabIndex="-1"
                autoComplete="off"
                value={form.website}
                onChange={handleChange}
              />

            </div>

            {/* ==========================================================
                SUBMIT BUTTON
            ========================================================== */}
            <button
              type="submit"
              className="btn btn--gold btn--lg btn--full"
              id="submitBtn"
              disabled={submitting}
            >
              {submitting
                ? 'Sending…'
                : 'Send Enquiry'}
            </button>

            {/* ==========================================================
                STATUS MESSAGE
            ========================================================== */}
            <p
              className={`form-status${
                status.type
                  ? ' ' + status.type
                  : ''
              }`}
              id="formStatus"
              role="status"
              aria-live="polite"
            >
              {status.text}
            </p>

            {/* ==========================================================
                WHATSAPP FOLLOW-UP
            ========================================================== */}
            {status.type === 'success' && lastEnquiry && (
              <div className="whatsapp-followup">

                <p>
                  You can also send us the same details on WhatsApp:
                </p>

                <div className="whatsapp-followup__buttons">

                  {WHATSAPP_NUMBERS.map(
                    ({ label, number }) => (
                      <a
                        key={number}
                        href={`https://wa.me/${number}?text=${encodeURIComponent(
                          buildWhatsAppMessage(lastEnquiry)
                        )}`}
                        target="_blank"
                        rel="noopener"
                        className="btn btn--ghost btn--sm"
                      >
                        WhatsApp {label}
                      </a>
                    )
                  )}

                </div>

              </div>
            )}

          </form>

        </div>

      </div>
    </section>
  )
}
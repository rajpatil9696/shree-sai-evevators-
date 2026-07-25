# Shree Sai Elevators — React version

This is a React (Vite) conversion of the original static HTML/CSS/JS site. All markup,
copy, styling and behaviour have been carried over 1:1 — nothing was redesigned.

## What changed vs. the original

- `index.html` + `js/script.js` → broken into React components under `src/components/`
  (Header, FloorRail, Hero, About, Products, Safety, WhyUs, Offices, Contact, Footer,
  WhatsAppFloat), wired together in `src/App.jsx`.
- Vanilla DOM logic became React state/hooks:
  - Mobile nav toggle → `useState` in `Header.jsx`.
  - Product tabs → `useState` in `Products.jsx`.
  - Floor-rail scrollspy (active stop + moving dot) → `useEffect` scroll listener in
    `FloorRail.jsx`.
  - Contact form (validation, submit, honeypot, status message) → controlled inputs +
    `useState` in `Contact.jsx`.
- `css/style.css` is copied over unchanged into `src/styles/style.css` and imported once
  in `src/main.jsx` — no styles were altered.
- Images/PDF live in `public/assets/...` so they're referenced the same way
  (`/assets/images/...`, `/assets/docs/...`) as in the original site.
- `contact.php` is unchanged and copied into `backend/contact.php` for reference — see
  "Contact form backend" below, since Vite/React only builds the frontend.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build → dist/
npm run preview    # preview the production build
```

## Contact form backend

The original form posts JSON to `contact.php` (PHP `mail()`, no database). React itself
can't run PHP, so you have two options:

1. **Keep PHP**: deploy the built `dist/` folder alongside `backend/contact.php` on any
   PHP host (cPanel, Hostinger, etc.), and make sure `/contact.php` on that host resolves
   to it (e.g. via your web server rewrite rules, or by placing it at the site root next
   to the built files).
2. **Replace it**: swap the `fetch('/contact.php', ...)` call in
   `src/components/Contact.jsx` for whatever backend/serverless function or form service
   (Formspree, Resend, etc.) you'd rather use — the request/response shape it expects is
   `{ success: boolean, message?: string }`.

## Project structure

```
public/assets/images/   all product, safety & office photos + logo
public/assets/docs/     brochure PDF
src/components/         one component per site section
src/data/productsData.js  tab labels + door/cabin card data
src/styles/style.css    original stylesheet, unchanged
src/App.jsx             page composition
backend/contact.php     original PHP form handler (unchanged)
```

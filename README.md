# The Road - Explore Armenia

A static travel-agency landing page for a fictional Armenia tour operator, built with plain HTML, CSS and JavaScript — no framework, no build step. Deployed on Firebase Hosting.

**Live demo:** https://theroad-9bc32.web.app/

![Hero section, light mode](./screenshots/hero-light.png)
![Special offers section, dark mode](./screenshots/offer-dark.png)

## Features

- **Responsive layout**: desktop, tablet, and mobile breakpoints.
- **Dark / light mode**: CSS custom-property theming with `localStorage` persistence.
- **Interactive navbar**: sliding full-screen menu, sticky header, scroll-spy active-link highlighting.
- **Scroll-reveal animations**: sections fade/slide in via `IntersectionObserver` (respects `prefers-reduced-motion`).
- **Popular tours**: flip-animated tour cards.
- **Why Choose Us**: stats band with years of experience, travelers, destinations, and guides.
- **Special offers**: promo cards with discounted pricing.
- **Customer stories**: testimonials with a looping background video.
- **Contact form**: client-side validation (required fields, email format) with inline error messages, submits via a `mailto:` link.
- **Accessible by design**: skip-to-content link, semantic landmarks, labeled form fields, visible focus states.
- **Back-to-top button**.

## Technologies used

- **HTML5** — semantic structure.
- **CSS3** — custom properties for theming, Flexbox/Grid, `clamp()` for fluid type/spacing, keyframe animations.
- **Vanilla JavaScript** — no libraries or frameworks.
- **Firebase Hosting** — deployment (Firebase SDK is initialized in `index.html` but not otherwise used).
- **Google Fonts** — `Vollkorn` for typography.

## Running locally

There's no build step — `public/` is served as-is. Any static file server works, for example:

```bash
npx serve public
```

or open `public/index.html` directly in a browser.

## Deploying

The site deploys to Firebase Hosting from the `public/` folder:

```bash
firebase deploy
```

(Requires a local `firebase.json`/`.firebaserc` pointing at the `theroad-9bc32` project — these are gitignored and not included in this repo.)

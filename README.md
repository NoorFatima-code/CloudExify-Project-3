(CloudExify Web Dev, Month 2, Project 3)
**Name: Noor Fatima**
**Registration number: CX-INT-2026-GEN-0184**
# Noor Smile Dental Studio — Pakistan Dental Clinic Landing Page

A polished, responsive dental clinic prototype for **Noor Smile Dental Studio**, a fictional clinic in Trikha, Gujrat. The experience is designed to feel warm, considered and locally relevant while remaining easy to customise for a real clinic. We followed the **Bold Modern build track**.


## Project stack

This project uses the technologies :

| Technology | Purpose |
| --- | --- |
| HTML5 | Semantic page structure, accessibility labels and forms |
| CSS3 | Visual identity, responsive behavior, dark mode, animations and component states |
| Vanilla JavaScript | Service rendering, filters, validation, counters, sliders, chat and navigation behavior |
| Bootstrap 5 | Responsive grid, modal, navbar collapse, accordion and carousel primitives |
| Bootstrap Icons | Lightweight interface iconography |

There is no React, Tailwind, database, server-side code or build step. It runs directly as a static website.

## What is included

The landing page includes a strong hero section, appointment CTAs, animated clinic metrics, responsive service cards, category filters, expandable care details for every treatment, a service-guidance strip, an about-the-doctor section, keyboard-accessible Before & After sliders, transparent PKR pricing plans, a care-promise carousel, FAQ accordion, contact and appointment forms, light and dark themes, active-section navigation, smooth scrolling, and a front-end chat assistant with WhatsApp handoff.

The appointment forms validate Pakistani mobile number formats, required fields, date selection, service selection and contact consent. Because this is a frontend-only prototype, a successful submission displays a confirmation message rather than sending data to a server. Connect the submit handler to your preferred CRM, email service or backend when moving to production.

## Pakistan localization

The content is set up for **Trikha, Gujrat, Punjab**. Contact details use a Pakistani mobile format and WhatsApp link, prices are displayed in **PKR**, the service copy mentions English, Urdu and Punjabi support, and the page includes local appointment guidance and studio timings of Monday to Saturday, 9:00 am to 9:00 pm.

The phone number, email address, location, doctor name, timings, pricing and WhatsApp destination are sample details for the prototype. Replace them before client delivery.

## Folder structure

```
noor-smile-dental-studio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── clinic-team.png
│       ├── dental-clinic-logo.png
│       ├── dental-services-bg.png
│       └── hero-dental-modern.png
└── README.md
```

The image files are bundled locally so the downloaded package does not depend on proprietary asset paths. Bootstrap, Bootstrap Icons and Google Fonts are loaded from their public CDNs when the visitor has an internet connection.

## Run locally

No package installation is required for the website. The optional `check-enhancements.mjs` file is only a local verification helper and is not needed by the browser. From the project directory, run a simple static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. You can also open `index.html` directly, but a local server is recommended for consistent browser behavior.

## Main customization points

To change the clinic details, edit the top bar, contact panel and footer in `index.html`. The service list, pricing plans, FAQ answers, and WhatsApp number are grouped near the top of `js/script.js` inside the `clinic` object. The design tokens are defined at the beginning of `css/style.css`, making it straightforward to adjust the brand color, paper tone, surface color, typography and shadows.

The two comparison cards use the images in `assets/images/`. Replace those files with approved portfolio imagery and update their alt text. The page deliberately labels the current cards as illustrative imagery rather than presenting them as real patient outcomes.

## Bonus feature reference

| Feature | Location | Behavior |
| --- | --- | --- |
| Dark/light mode | `#themeToggle` and `setupThemeToggle( )` | Persists the selected theme in `localStorage`, syncs Bootstrap’s `data-bs-theme`, and updates the accessible label/icon |
| Smooth scroll and active nav | `setupNavigation()` | Highlights the section currently in view and closes the mobile menu after navigation |
| Animated stats | `setupStatsCounter()` | Uses `IntersectionObserver` and `requestAnimationFrame` |
| Service filters | `setupServiceFiltering()` | Filters Preventive, Smile Design and Restorative care cards |
| Service care details | `setupServiceDetails()` and `toggleServiceDetail()` | Opens an accessible panel with ideal patient fit and included visit guidance for each service |
| Before & After slider | `setupComparisons()` | Supports pointer, touch and Arrow/Home/End keyboard controls |
| Appointment validation | `validateContactForm()` and `setupModalForm()` | Validates required fields and Pakistani mobile formats |
| Care-promise carousel | Bootstrap carousel markup in `index.html` | Rotates transparent care principles without fabricated reviews |
| FAQ accordion | Bootstrap accordion markup rendered by JavaScript | Keeps one answer open at a time |
| Front-end chat | `setupChat()` | Provides quick answers and a WhatsApp handoff; no backend is required |

## Deployment

This is a static site and can be deployed to Vercel, Netlify, GitHub Pages or any standard static host. Upload the project folder as-is, keeping the relative paths between `index.html`, `css`, `js` and `assets` unchanged. For Vercel, import the folder or repository and use no build command; set the output directory to the project root if prompted.

## Accessibility and performance notes

The page includes a skip link, labelled controls, form labels, keyboard-operable sliders, descriptive image alt text, visible focus states, reduced-motion handling and responsive mobile layouts. For a production launch, compress the PNG assets to WebP or AVIF, connect the forms to a secure service, replace the sample contact details, add a privacy policy, and review the emergency-care language with the clinic.

## License and content note

This is a prototype project for presentation and learning. Clinic identity, names, contact details, pricing, imagery and copy should be replaced or approved before commercial use.

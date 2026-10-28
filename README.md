<div align="center">

# Apex Detailing · Premium Car Detailing

<em>Premium automotive care · Ceramic coating · Paint protection · Interior restoration.</em>

<br />

<a href="https://github.com/pateutz1/car-detailing">Apex Detailing</a>

<br />

<img src="showcase/Apex%20Detailing%20%C2%B7%20Prezentare%401x.png" width="100%" alt="Apex Detailing website presentation">

<br />

![Stars](https://shields.io/github/stars/pateutz1/car-detailing?style=flat-square&labelColor=0f6e68&color=76f5e1)
![Contributors](https://shields.io/github/contributors/pateutz1/car-detailing?style=flat-square&labelColor=0f6e68&color=76f5e1)
![Last commit](https://shields.io/github/last-commit/pateutz1/car-detailing?style=flat-square&labelColor=0f6e68&color=76f5e1)
![Issues](https://shields.io/github/issues/pateutz1/car-detailing?style=flat-square&labelColor=0f6e68&color=76f5e1)
![Watchers](https://shields.io/github/watchers/pateutz1/car-detailing?style=flat-square&labelColor=0f6e68&color=76f5e1)

<strong>Dark automotive design &middot; gold accents &middot; before-and-after results &middot; service pricing &middot; quote requests</strong><br>
<sub>Built with Next.js 16 and React 19. Dedicated pages cover services, results, pricing, the studio, and contact. Server-side quote validation, optional Resend email delivery, and a local inbox fallback. Available checks: ESLint and a production build.</sub>

<br />

[Stack](#stack) &middot; [The site](#the-site) &middot; [Local setup](#local-setup) &middot; [Admin panel](#admin-panel) &middot; [Deployment](#deployment)

<sub><b>AI agents / LLMs:</b> content lives in <code>src/data</code>, routes in <code>src/app</code>, and UI in <code>src/components</code>.</sub>

</div>

---

## Overview

Apex Detailing is a premium car detailing website for a studio serving Bucharest and Ilfov. Dark surfaces, gold accents, automotive imagery, and animated sections introduce the studio. Visitors can compare before-and-after results, explore services and prices, and request a quote with vehicle details and photos.

## Table of Contents

- [Apex Detailing · Premium Car Detailing](#apex-detailing--premium-car-detailing)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Stack](#stack)
  - [The site](#the-site)
  - [Architecture overview](#architecture-overview)
  - [Prerequisites](#prerequisites)
  - [Local setup](#local-setup)
    - [1. Clone and install](#1-clone-and-install)
    - [2. Environment variables](#2-environment-variables)
    - [3. Database setup](#3-database-setup)
    - [4. Git hooks](#4-git-hooks)
    - [5. Run the dev server](#5-run-the-dev-server)
  - [Commands](#commands)
  - [Admin panel](#admin-panel)
  - [Deployment](#deployment)
  - [Contributing](#contributing)
  - [Contributors](#contributors)
  - [License](#license)
  - [Support the project](#support-the-project)
  - [Connect](#connect)

---

## Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI library | [React 19](https://react.dev/) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/), Bebas Neue, Orbitron, Inter |
| Animation | [GSAP](https://gsap.com/), Framer Motion |
| Smooth scrolling | [Lenis](https://lenis.darkroom.engineering/) |
| Icons | [Lucide React](https://lucide.dev/), custom automotive SVG components |
| Galleries | [Swiper](https://swiperjs.com/), react-compare-image |
| Content | TypeScript data modules and React components |
| Email | [Resend](https://resend.com/) via HTTP API |
| Quote fallback | Local filesystem inbox |
| Package manager | npm |
| Linting | ESLint 9 with Next.js configuration |

---

## The site

The homepage is one scroll:

1. **Hero** - automotive imagery, studio positioning, and calls to action.
2. **Before and after** - three transformation previews.
3. **Process** - the steps behind the detailing work.
4. **Services** - three service previews.
5. **Pricing** - treatment and package previews.
6. **Contact** - a compact entry into enquiries and booking.

Dedicated pages cover `/services`, `/results`, `/pricing`, `/why-us`, and `/contact`. Legal information lives at `/privacy`, `/terms`, and `/cookies`. Shared navigation, footer, smooth scrolling, and a floating CTA wrap the pages. The language provider supplies English and Romanian navigation and hero copy.

---

## Architecture overview

- **Routes** - `src/app` contains pages, the root layout, global styles, and the quote-request API.
- **Content** - `src/data` contains services, prices, gallery cases, filters, results, and contact details.
- **UI** - `src/components` groups layout, pages, sections, controls, providers, and automotive icons.
- **Media** - assets live in `public/images` and `public/videos`. README presentation images live in `showcase`.
- **Quote requests** - multipart submissions go to `/api/quote-request`. Shared validation lives in `src/lib/lead-intake.ts`.
- **Photos** - up to three images, each up to 8 MB; accepted MIME types cover JPEG, PNG, WebP, HEIC, and HEIF.
- **Delivery** - Resend sends a text summary when configured. Without configuration, or on email failure, the server saves the summary and photos to `.data/lead-inbox/<submission-reference>/`. Photos are not attached to Resend emails.
- **Metadata** - page titles and descriptions use the Next.js metadata API.

---

## Prerequisites

- **Node.js** compatible with the installed Next.js 16 release.
- **npm**, used with the committed `package-lock.json`.
- A **Resend account and verified sender** for email delivery.
- A **persistent writable filesystem** for the local quote inbox.

---

## Local setup

### 1. Clone and install

```bash
git clone https://github.com/pateutz1/car-detailing.git
cd car-detailing
npm ci
```

### 2. Environment variables

Create `.env.local` at the repository root for email delivery:

```dotenv
RESEND_API_KEY=re_your_api_key
LEAD_DESTINATION_EMAIL=studio@example.com
LEAD_FROM_EMAIL=Apex Detailing <quotes@your-verified-domain.com>
```

| Variable | Required | Description |
| --- | --- | --- |
| `RESEND_API_KEY` | For email | Server-side Resend API key |
| `LEAD_DESTINATION_EMAIL` | For email | Inbox receiving quote summaries |
| `LEAD_FROM_EMAIL` | For email | Sender on a verified Resend domain |

All three values must be set to enable email. Without them, submissions use the local inbox. Restart the development server after changing environment variables.

### 3. Database setup

No database or migrations are required. Content is maintained in source files. The quote fallback creates `.data/lead-inbox` when needed.

### 4. Git hooks

No Git hooks are configured. Run the available checks before pushing:

```bash
npm run lint
npm run build
```

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Commands

| Command | Description |
| --- | --- |
| `npm ci` | Install dependencies from the lockfile |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after building |
| `npm run lint` | Run ESLint |

To run in production mode locally:

```bash
npm run build
npm run start
```

---

## Admin panel

There is no admin panel or authentication layer. Update source files and redeploy:

- Contacts: `src/data/site-config.ts`.
- Services: `src/data/services-catalog.ts`.
- Pricing: `src/data/service-pricing.ts`.
- Gallery and results: `src/data/gallery-cases.ts`, `src/data/gallery-filters.ts`, and `src/data/results-page-data.ts`.
- Navigation and hero translations: `src/components/providers/LanguageProvider.tsx`.
- Layout and section copy: `src/app` and `src/components`.

Local quote submissions can be inspected in `.data/lead-inbox` on the server. Keep this directory private and out of version control; the current `.gitignore` does not exclude it.

---

## Deployment

Deploy to a Node.js host that supports Next.js server routes.

1. Connect [pateutz1/car-detailing](https://github.com/pateutz1/car-detailing) to your hosting provider.
2. Install with `npm ci` and build with `npm run build`.
3. Configure the three email environment variables if needed.
4. Start with `npm run start`, or use the host's Next.js integration.
5. Check the public pages and submit a quote request to verify delivery.

A static export cannot support the quote endpoint. The filesystem fallback requires persistent writable storage. On serverless hosting, use a durable storage adapter before relying on this fallback; `.data/lead-inbox` is not durable there and writes may fail.

---

## Contributing

Fork, create a branch, and open a pull request. Run `npm run lint` and `npm run build`, check affected pages on desktop and mobile, and include screenshots for visual changes. Report bugs and ideas in [Issues][issues].

## Contributors

Thanks to everyone who has contributed to Apex Detailing.

<a href="https://github.com/pateutz1/car-detailing/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=pateutz1/car-detailing" alt="Contributors" />
</a>

## License

No license file is currently included in this repository. No open-source license is declared here.

## Support the project

Support Apex Detailing by starring the repository, reporting issues, or contributing improvements through pull requests.

## Connect

<div align="center">

**Apex Detailing** · [Repository][repo]

<a href="https://github.com/pateutz1/car-detailing"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" /></a>
<a href="mailto:info@apexdetailing.ro"><img src="https://img.shields.io/badge/Email-0f6e68?style=for-the-badge&logo=gmail&logoColor=white" alt="Email Apex Detailing" /></a>

</div>

[repo]: https://github.com/pateutz1/car-detailing
[issues]: https://github.com/pateutz1/car-detailing/issues
[pulls]: https://github.com/pateutz1/car-detailing/pulls
[contributors]: https://github.com/pateutz1/car-detailing/graphs/contributors

# Wealthy Harvest™ — Headless Storefront

A React + TypeScript + Vite storefront for **Wealthy Harvest™**, using
Shopify's Storefront API as a headless commerce backend and
[`vite-react-ssg`](https://github.com/Daydreamer-riri/vite-react-ssg) for
full static-site generation, deployed to GitHub Pages.

- **Repo:** `PMLLC-create/wealthyharvest`
- **Commerce backend:** Shopify (Storefront API) — products, variants,
  pricing, inventory, collections, cart, checkout, orders, payments,
  shipping, and taxes all remain Shopify's responsibility. This app never
  processes payments or duplicates that logic.
- **Content:** local MDX for now (Resources/Journal articles), behind an
  abstraction (`src/lib/content.ts`) designed so a real CMS can replace it
  later without touching routing or presentation.

---

## 1. Project structure

```
wealthyharvest/
├── .github/workflows/
│   ├── deploy.yml            # build + deploy to GitHub Pages (push to main)
│   └── ci.yml                 # lint/typecheck/test/build on pull requests
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── CNAME                  # wealthyharvest.com — for the GitHub Pages custom domain
├── scripts/
│   └── generate-sitemap.ts    # postbuild: scans dist/ and writes sitemap.xml
├── src/
│   ├── main.tsx                # vite-react-ssg entry point
│   ├── App.tsx                 # root layout (Header/Footer/Outlet/Cart)
│   ├── router.tsx              # route table, loaders, getStaticPaths
│   ├── vite-env.d.ts           # Vite client types (import.meta.env/.glob)
│   ├── mdx.d.ts                # TypeScript shape for *.mdx imports
│   ├── shopify/
│   │   ├── client.ts            # Storefront API fetch wrapper
│   │   ├── fragments.ts         # shared GraphQL fragments
│   │   ├── queries.ts
│   │   ├── mutations.ts
│   │   ├── storefront.ts        # getProducts/getProduct/createCart/etc.
│   │   └── types.ts
│   ├── hooks/                   # useProducts, useProduct, useCollections,
│   │                             useCollection, useCart (all React Query)
│   ├── context/
│   │   └── CartContext.tsx      # persisted cart id + drawer open state
│   ├── components/
│   │   ├── layout/                Header, Footer
│   │   ├── product/                ProductCard, ProductGrid, VariantSelector,
│   │   │                           QuantitySelector, AddToCartButton
│   │   ├── collection/             CollectionCard
│   │   ├── cart/                   CartDrawer, CartLineItem
│   │   ├── seo/                    Seo.tsx, StructuredData.tsx
│   │   └── ui/                     BrandMark, PriceDisplay, States,
│   │                               ErrorBoundary, Breadcrumbs, NewsletterSignup
│   ├── pages/                   Home, Shop, CollectionDetail, ProductDetail,
│   │                             CartPage, SearchPage, About, Wellness,
│   │                             Preparedness, DigitalResources, Resources,
│   │                             ResourceArticle, Contact, NotFound
│   ├── content/resources/       # local .mdx articles (see "Resources content")
│   └── lib/
│       ├── env.ts                # zod-validated Shopify env config
│       ├── content.ts            # Resources content provider (CMS-swappable)
│       ├── buildRoutes.ts        # per-route getStaticPaths implementations
│       ├── seoDefaults.ts
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 2. Dependencies installed

**Runtime:** `react`, `react-dom`, `react-router-dom` (pinned to v6 — see
note below), `vite-react-ssg`, `@tanstack/react-query`, `@mdx-js/rollup`,
`zod`

**Dev:** `vite`, `@vitejs/plugin-react`, `typescript`, `remark-frontmatter`,
`remark-mdx-frontmatter`, `tsx` (runs the postbuild sitemap script),
`eslint` + `typescript-eslint` + `eslint-plugin-react-hooks` +
`eslint-plugin-react-refresh`, `prettier`, `vitest` + `@testing-library/react`

**Important version note:** `vite-react-ssg`'s own docs say it targets
**React Router v6** specifically — React Router v7 has its own, different
built-in SSG approach. So `react-router-dom` is intentionally pinned to
`^6.30.6`, not v7, even though v7 is the current major on npm. Don't
upgrade `react-router-dom` to v7 without also migrating off
`vite-react-ssg`.

**Vite version note:** the build uses **Vite 7** (`^7.3.6`), not Vite 8.
Vite 8 defaults to the new Rust-based Rolldown bundler, and `@mdx-js/rollup`
(a classic Rollup plugin) didn't transform `.mdx` files correctly under it
during testing. Vite 7 uses the mature, standard Rollup pipeline where MDX
works correctly. Revisit this if/when MDX tooling adds official Rolldown
support.

All of the above were installed and a real `npm install` + `npm run build`
were run against these exact versions during scaffolding — the versions in
`package.json` are verified compatible, not guessed.

---

## 3. Shopify configuration still required

1. In Shopify Admin, install the **Headless** sales channel (Sales
   channels → Headless in the App Store). This provisions a Storefront
   API access token with the right scopes automatically.
2. Copy the **Storefront API access token** (public, safe for the
   browser) from Headless → Manage.
3. Copy your store's **`.myshopify.com` domain**.
4. Create at least a couple of real products in Shopify so `/shop` and
   product pages have something to render.
5. **Optional but recommended for Wellness/Preparedness pages:** create
   Shopify collections with the exact handles `wellness` and
   `preparedness`. Those two pages look for those handles specifically
   (see `src/pages/Wellness.tsx` / `Preparedness.tsx`) and show an honest
   "coming soon" empty state if the collection doesn't exist yet — no
   products are invented.
6. **To make `shop.wealthyharvest.com` resolve to Shopify checkout**
   (rather than a `myshopify.com` URL): Shopify Admin → Settings →
   Domains → Connect existing domain → follow Shopify's CNAME
   instructions for that subdomain. This is a Shopify + DNS step, not a
   code change.
7. **Do not** generate or use an Admin API token anywhere in this
   project — only the public Storefront API token belongs here.

---

## 4. Environment variables required

Copy `.env.example` to `.env.local` and fill in real values:

```
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-public-storefront-token
VITE_SHOPIFY_API_VERSION=2026-07
```

**Maintenance: Shopify API version.** `2026-07` was the current *stable*
Storefront API version, confirmed directly against Shopify's official
versioning page, at the time this project was scaffolded (`2026-10` was a
release candidate only, not yet stable). Shopify releases a new stable
version every quarter and supports each one for 12 months. Update this
value roughly once a quarter — check
[shopify.dev/docs/api/usage/versioning](https://shopify.dev/docs/api/usage/versioning)
for the current stable version before bumping it.

`.env.local` is gitignored and never committed. In CI, the same three
values are set as **GitHub Actions repository secrets** (see below) —
never as committed files.

---

## 5. GitHub configuration required (manual steps)

I don't have push access to `PMLLC-create/wealthyharvest` or any GitHub
credentials — everything above was built and verified locally in a
sandbox. To get this live, you'll need to:

1. **Add these files to the repository.** Since the repo is currently
   empty, either `git init` this project locally and push, or upload the
   files through GitHub's web UI.
2. **Add repository secrets** (Settings → Secrets and variables → Actions
   → New repository secret), one each for:
   - `VITE_SHOPIFY_STORE_DOMAIN`
   - `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   - `VITE_SHOPIFY_API_VERSION`
3. **Enable GitHub Pages** via GitHub Actions: Settings → Pages → Build
   and deployment → Source → **GitHub Actions**. (Not "Deploy from a
   branch" — this project needs the build step in `deploy.yml`.)
4. **Custom domain:** Settings → Pages → Custom domain → enter
   `wealthyharvest.com` (this matches the committed `public/CNAME` file).
   Then add the DNS records GitHub's custom-domain instructions specify
   at your DNS provider — I haven't touched DNS anywhere in this project,
   per your instructions.
5. Push to `main` (or use the workflow's manual "Run workflow" button) to
   trigger the first deploy.

---

## 6. Running locally

```bash
npm install
cp .env.example .env.local   # then fill in real Shopify values
npm run dev                  # vite-react-ssg dev — SSR-accurate dev server
npm run build                # full static build + sitemap into dist/
npm run preview              # serve the built dist/ locally
npm run typecheck
npm run lint
npm run test
```

If you want a faster, plain client-rendered dev server instead of
SSR-during-dev, temporarily change the `dev` script to `vite` instead of
`vite-react-ssg dev` (see `vite-react-ssg`'s own README for this
trade-off).

**Note on `npm run build` without real Shopify credentials:** the build
will fail loudly and intentionally — it actually calls the Storefront API
during the build (to enumerate products/collections for prerendering),
and a bad domain/token produces a clear `ShopifyApiError` rather than
silently shipping a shop with no products. This was verified directly
during scaffolding.

---

## 7. How Shopify products are managed

There's no admin UI in this project — products, prices, images,
inventory, and collections are all managed entirely in **Shopify
Admin**, exactly as with any Shopify store. The website reads that data
at build time (for prerendering) and again live in the browser (for
freshness) — see `src/shopify/storefront.ts` for the read functions and
`src/hooks/useCart.ts` for cart/checkout.

Adding a product in Shopify and re-running the deploy workflow (push to
`main`, or the manual "Run workflow" button — there's no scheduled
rebuild yet, per your instructions) is all that's needed to get it live
with its own prerendered, SEO-tagged page.

---

## 8. How content (Resources/Journal) is managed today, and later

Articles are `.mdx` files in `src/content/resources/`, each starting with
a frontmatter block:

```mdx
---
title: "Article Title"
description: "One or two sentences for meta description and article cards."
category: "Wellness"
publishedAt: "2026-09-24"
---

Article body in Markdown/MDX here.
```

Add a new file, and it's automatically picked up, listed on `/resources`,
and gets its own prerendered `/resources/:slug` page with real SEO tags —
no manual registration needed.

**This is intentionally not permanent.** All of that file-reading logic
lives in one file, `src/lib/content.ts`, behind three functions
(`getAllArticles`, `getArticle`, `getAllArticleSlugs`). Swapping to a real
CMS later means rewriting the body of that one file to call the CMS's API
instead — `src/pages/Resources.tsx`, `ResourceArticle.tsx`, and
`src/router.tsx` never need to change, since they only depend on the
`ArticleSummary`/`Article` shapes that file exports.

---

## 9. SEO — what's real and verified

Every route is genuinely prerendered to static HTML by `vite-react-ssg`
(confirmed by inspecting the actual build output during scaffolding, not
assumed): each page gets its own `<title>`, meta description, canonical
URL, Open Graph + Twitter tags, and — on product, collection, and article
pages — JSON-LD structured data (`Product`, `BreadcrumbList`, `Article`,
plus `Organization` site-wide), via `src/components/seo/Seo.tsx` and
`StructuredData.tsx`, both built on `vite-react-ssg`'s own `<Head>`
component (not a separate Helmet setup) so the tags land in the real
static file, not just a client-side-mutated `<head>`.

`/cart` and `/search` are intentionally `noindex` — their content is
per-visitor and query-dependent, with nothing stable worth indexing.
`scripts/generate-sitemap.ts` runs after the build and scans the actual
generated `dist/` output (rather than re-deriving the route list from a
second Shopify call) to write `sitemap.xml`, so it can't drift from what
was really built.

---

## 10. Portability

Nothing about the application itself is tied to GitHub Pages — that's
isolated to two files: `public/CNAME` and `.github/workflows/deploy.yml`.
The app builds to a plain static `dist/` folder. Moving to Netlify,
Vercel, or Cloudflare Pages later means pointing a new host at that same
build output, not rewriting the application.

---

## 11. Known placeholders (intentionally not invented)

Per your instructions, none of the following were invented — they're
clearly marked in the UI as placeholders and should be replaced with real
content directly in the relevant page file:

- Founder biography and photo (`src/pages/About.tsx`, `Home.tsx`)
- Homepage introduction/mission copy (`Home.tsx`)
- Real product photography (Shopify-supplied once products exist)
- Newsletter signup and Contact form are UI-complete but **not connected
  to a live email list or inbox** — see the comments in
  `NewsletterSignup.tsx` and `Contact.tsx` for where to wire a real
  provider in
- The brand mark (`src/components/ui/BrandMark.tsx`) is a restrained
  original vector placeholder, not a trace of any real logo — swap it for
  the real Wealthy Harvest logo whenever one exists

# Os Pets da Inês

Site (PT/EN) for a solo pet-sitter in Barcarena, Portugal — pet boarding, pet sitting, and dog walking.

## Pages

PT is the default locale (no prefix), EN is prefixed `/en`, same slugs otherwise:

| Page | PT | EN |
|---|---|---|
| Home | `/` | `/en` |
| About | `/sobre` | `/en/about` |
| Services hub | `/servicos` | `/en/services` |
| Pricing | `/precario` | `/en/pricing` |
| Booking conditions | `/condicoes-reserva` | `/en/booking-conditions` |
| Contacts | `/contactos` | `/en/contact` |

The route table lives in `src/routes/paths.ts`. Every one of these is prerendered to its own static HTML file at build time (`react-router.config.ts` lists every PT/EN pair in `prerender`).

## Pricing

The pricing page has a static comparison table (`PricingTable.tsx`, `TransportTable.tsx`) plus an interactive calculator (`Simulator.tsx`) that estimates cost from service type, season, boarding stay length, dog count, and day/visit count. All price bands live in `src/data/pricing.ts` — this is the file to edit when Inês changes her rates.

## i18n

PT/EN strings live in `src/i18n/locales/{pt,en}.json`, loaded via `use-intl`. Locale is derived from the URL path (`useLocale`), not a cookie or browser setting — the PT/EN toggle just navigates to the equivalent path in the other language (`useLanguageSwitchPath`).

## Images

Every photo ships as a single 768px-wide webp — no responsive `srcset`. This was deliberate: a tiered srcset setup (480w/960w, later 480/768/960) was tried and dropped because 960w was consistently over-fetched relative to actual display sizes across the site, and 480w under-served real device pixel ratios. One size, uniformly capped at 768px, covers every slot used (cards, gallery, hero, detail shots) without the complexity. Service photos are randomized per browser tab session (`useRandomImage`, backed by `sessionStorage`) rather than fixed, so repeat visitors within a session see a stable pick but different visitors/tabs see variety.

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + [React Router](https://reactrouter.com/) (Framework Mode, `ssr: false` + full prerendering)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [use-intl](https://use-intl.dev/)
- [Bun](https://bun.sh/) as package manager and script runner
- [Biome](https://biomejs.dev/) for linting/formatting
- [react-cookie-consent](https://www.npmjs.com/package/react-cookie-consent) — gates the Google Maps embed on Contacts behind consent

## Deployment

Static output only (`build/client/`). Deploys to Vercel via `.github/workflows/deploy.yml` on push to `main`.

## Releases

Commits follow [Conventional Commits](https://www.conventionalcommits.org/). `.github/workflows/release.yml` runs [semantic-release](https://semantic-release.gitbook.io/) on push to `main` to compute the next version, update `CHANGELOG.md` and `package.json`, tag, and publish a GitHub Release.

## License

Proprietary — see [LICENSE](./LICENSE).

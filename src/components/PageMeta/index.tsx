import { useTranslations } from 'use-intl'
import { priceRange } from '../../data/pricing'
import { services } from '../../data/services'
import { useLocale } from '../../hooks/useLocale'
import type { SupportedLanguage } from '../../i18n'
import { PAGE_PATHS, type PageKey } from '../../routes/paths'

interface FaqStep {
  title: string
  body: string
}

interface CancellationBlock {
  label: string
  lines: string[]
}

interface PageMetaProps {
  page: PageKey | null
}

type Translate = ReturnType<typeof useTranslations>

export const SITE_NAME = 'Os Pets da Inês'
export const DOMAIN = 'https://ospetsdaines.com'

const BUSINESS_ID = `${DOMAIN}/#business`
const AREA_SERVED = { '@type': 'Place', name: 'Oeiras, Portugal' }

const LOCAL_BUSINESS_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': BUSINESS_ID,
  name: SITE_NAME,
  url: DOMAIN,
  image: `${DOMAIN}/site/banner.png`,
  telephone: '+351927350019',
  email: 'ospetsdaines@gmail.com',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Teófilo Braga, nº 6',
    postalCode: '2730-181',
    addressLocality: 'Barcarena',
    addressCountry: 'PT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.736264,
    longitude: -9.267537,
  },
  areaServed: AREA_SERVED,
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '08:00',
    closes: '20:00',
  },
  sameAs: ['https://www.instagram.com/_pets.da.ines_/'],
}

function buildServiceLds(t: Translate, locale: SupportedLanguage) {
  const url = `${DOMAIN}${PAGE_PATHS.services[locale]}`

  return services.map(({ slug, translationKey, priceKind, unitKey }) => {
    const name = t(`services.${translationKey}.title`)
    const { min, max } = priceRange(priceKind)

    return {
      slug,
      ld: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${DOMAIN}/#service-${slug}`,
        serviceType: name,
        name,
        description: t(`services.${translationKey}.cardText`),
        url,
        image: `${DOMAIN}/services/${slug}/${slug}-01.webp`,
        provider: { '@id': BUSINESS_ID },
        areaServed: AREA_SERVED,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            priceCurrency: 'EUR',
            minPrice: min,
            maxPrice: max,
            unitText: t(`pricing.calculator.${unitKey}`),
          },
        },
      },
    }
  })
}

function buildFaqLd(t: Translate) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (t.raw('booking.steps') as FaqStep[]).map((step) => {
      const answer =
        step.body ||
        [
          t.raw('booking.cancellation.high') as CancellationBlock,
          t.raw('booking.cancellation.low') as CancellationBlock,
        ]
          .map((block) => `${block.label}: ${block.lines.join(' ')}`)
          .join(' ')
      return {
        '@type': 'Question',
        name: step.title,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      }
    }),
  }
}

export default function PageMeta({ page }: PageMetaProps) {
  const t = useTranslations()
  const locale = useLocale()

  if (page === null) {
    return (
      <>
        <title>{t('meta.notFound.title')}</title>
        <meta name="robots" content="noindex" />
      </>
    )
  }

  const title = t(`meta.${page}.title`)
  const description = t(`meta.${page}.description`)
  const url = DOMAIN ? `${DOMAIN}${PAGE_PATHS[page][locale]}` : undefined

  const serviceLds =
    page === 'services' || page === 'pricing' ? buildServiceLds(t, locale) : []
  const faqLd = page === 'booking' ? buildFaqLd(t) : undefined

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:locale"
        content={locale === 'pt' ? 'pt_PT' : 'en_US'}
      />
      {url && (
        <>
          <meta property="og:url" content={url} />
          <meta property="og:image" content={`${DOMAIN}/site/banner.png`} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="429" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={`${DOMAIN}/site/banner.png`} />
          <link rel="canonical" href={url} />
          <link
            rel="alternate"
            hrefLang="pt"
            href={`${DOMAIN}${PAGE_PATHS[page].pt}`}
          />
          <link
            rel="alternate"
            hrefLang="en"
            href={`${DOMAIN}${PAGE_PATHS[page].en}`}
          />
          <link
            rel="alternate"
            hrefLang="x-default"
            href={`${DOMAIN}${PAGE_PATHS[page].pt}`}
          />
        </>
      )}
      {page === 'home' && (
        <script type="application/ld+json">
          {JSON.stringify(LOCAL_BUSINESS_LD)}
        </script>
      )}
      {serviceLds.map(({ slug, ld }) => (
        <script key={slug} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
      {faqLd && (
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      )}
    </>
  )
}

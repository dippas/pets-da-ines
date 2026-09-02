import { useTranslations } from 'use-intl'
import { useLocale } from '../../hooks/useLocale'
import { PAGE_PATHS, type PageKey } from '../../routes/paths'

export const SITE_NAME = 'Os Pets da Inês'
export const DOMAIN = 'https://ospetsdaines.com'

const LOCAL_BUSINESS_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE_NAME,
  telephone: '+351927350019',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Teófilo Braga, nº 6',
    postalCode: '2730-181',
    addressLocality: 'Barcarena',
    addressCountry: 'PT',
  },
  openingHours: 'Mo-Su 08:00-20:00',
  sameAs: ['https://www.instagram.com/_pets.da.ines_/'],
}

interface PageMetaProps {
  page: PageKey
}

export default function PageMeta({ page }: PageMetaProps) {
  const t = useTranslations()
  const locale = useLocale()
  const title = t(`meta.${page}.title`)
  const description = t(`meta.${page}.description`)
  const url = DOMAIN ? `${DOMAIN}${PAGE_PATHS[page][locale]}` : undefined

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
    </>
  )
}

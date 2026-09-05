import { StarIcon } from '@phosphor-icons/react/ssr'
import { useTranslations } from 'use-intl'
import Button from '../../components/Button'
import Carousel from '../../components/Carousel'
import Img from '../../components/Img'
import Label from '../../components/Label'
import ServiceCard from '../../components/ServiceCard'
import TestimonialQuote from '../../components/TestimonialQuote'
import { services } from '../../data/services'
import { useLocale } from '../../hooks/useLocale'
import PawBlob from '../../icons/PawBlob'
import { pagePath } from '../../routes/paths'

const WHATSAPP_HREF = 'https://wa.me/351927350019'
const STAR_RANKS = [1, 2, 3, 4, 5]

interface Quote {
  quote: string
  author: string
  rating: number
  date: string
  url: string
}

export default function Home() {
  const t = useTranslations()
  const locale = useLocale()
  const servicesPath = pagePath('services', locale)
  const quotes = t.raw('home.testimonials.quotes') as Quote[]

  return (
    <>
      <section className="overflow-hidden lg:hidden">
        <div className="relative">
          <Img
            src="/site/hero.webp"
            alt={t('home.heroAlt')}
            width={768}
            height={1024}
            loading="eager"
            fetchPriority="high"
            className="h-hero-compact block w-full object-cover"
          />
        </div>
        <div className="relative mx-4 -mt-12 rounded-4xl bg-white p-6 shadow-2xl sm:mx-6 sm:-mt-16 sm:p-10">
          <Label tracking="eyebrow" className="mb-3">
            {t('home.eyebrow')}
          </Label>
          <h1 className="mb-4 text-3xl leading-tight font-bold tracking-tight text-ink sm:text-4xl">
            {t('home.heading')}
          </h1>
          <p className="mb-4 text-lg prose">{t('home.body1')}</p>
          <p className="mb-6 text-base prose">{t('home.body2')}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to={WHATSAPP_HREF} className="flex-1">
              {t('common.cta.freeAssessment')}
            </Button>
            <Button to={servicesPath} variant="outline" className="flex-1">
              {t('common.cta.seeServices')}
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto hidden max-w-6xl gap-16 px-8 py-20 lg:grid lg:grid-cols-2 lg:items-start">
        <div>
          <Label tracking="eyebrow" className="mb-6">
            {t('home.eyebrow')}
          </Label>
          <h1 className="mb-6 text-6xl leading-none font-bold tracking-tight text-ink">
            {t('home.heading')}
          </h1>
          <p className="mb-4 max-w-measure-sm text-xl prose">
            {t('home.body1')}
          </p>
          <p className="mb-10 max-w-measure-sm text-lg prose">
            {t('home.body2')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button to={WHATSAPP_HREF}>{t('common.cta.freeAssessment')}</Button>
            <Button to={servicesPath} variant="outline">
              {t('common.cta.seeServices')}
            </Button>
          </div>
        </div>
        <div className="relative">
          <PawBlob className="absolute -top-4.5 -right-4.5 size-47.5 rotate-12 opacity-40" />
          <Img
            src="/site/hero.webp"
            alt={t('home.heroAlt')}
            width={768}
            height={1024}
            loading="eager"
            fetchPriority="high"
            className="h-hero-wide relative w-full rounded-blob-lg object-cover shadow-2xl"
          />
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-navy-subtle bg-panel py-16 sm:py-20">
        <PawBlob className="pointer-events-none absolute -top-16 -right-20 size-72 rotate-12 opacity-50" />
        <div className="relative mx-auto mb-10 max-w-6xl px-4 sm:px-8">
          <h2 className="text-3xl font-bold text-ink sm:text-5xl">
            {t('home.services.heading')}
          </h2>
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-6 px-4 sm:px-8 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <div className="relative mx-auto mt-10 max-w-6xl px-4 sm:flex sm:flex-wrap sm:items-center sm:gap-3 sm:px-8">
          <Label
            tracking="badge"
            className="mb-3 block text-navy-secondary sm:mb-0 sm:inline"
          >
            {t('home.badges.allServices')}
          </Label>
          <div className="flex flex-col gap-2 sm:contents">
            <span className="badge-pill w-full text-center sm:w-auto">
              {t('home.badges.assessment')}
            </span>
            <span className="badge-pill w-full text-center sm:w-auto">
              {t('home.badges.updates')}
            </span>
            <span className="badge-pill w-full text-center sm:w-auto">
              {t('home.badges.pets')}
            </span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy text-cream">
        <PawBlob
          className="pointer-events-none absolute -bottom-24 -left-20 size-80 rotate-12 opacity-20"
          color="var(--color-gold)"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20">
          <div className="mb-10">
            <Label tracking="eyebrow" className="mb-3 text-gold">
              {t('home.testimonials.eyebrow')}
            </Label>
            <h2 className="text-3xl font-bold text-off-white sm:text-5xl">
              {t('home.testimonials.heading')}
            </h2>
            {locale === 'en' && (
              <p className="mt-3 text-sm text-off-white-muted">
                {t('home.testimonials.translatedNotice')}
              </p>
            )}
          </div>
          <Carousel
            ariaLabel={t('home.testimonials.heading')}
            items={quotes.map((item) => (
              <blockquote
                key={item.author}
                className="flex min-h-84 flex-col justify-between gap-6 rounded-3xl border border-off-white-subtle bg-off-white-faint p-8"
              >
                <TestimonialQuote quote={item.quote} />
                <footer className="flex items-center justify-between gap-4">
                  <span className="text-sm font-bold tracking-wide text-gold uppercase">
                    {item.author}
                  </span>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="flex gap-0.5" aria-hidden="true">
                      {STAR_RANKS.filter((star) => star <= item.rating).map(
                        (star) => (
                          <StarIcon
                            key={star}
                            size={14}
                            weight="fill"
                            color="var(--color-gold)"
                          />
                        ),
                      )}
                    </span>
                    <span className="sr-only">{item.rating}/5</span>
                    <Button
                      to={item.url}
                      variant="bare"
                      ariaLabel={t('home.testimonials.viewOnGoogle')}
                      className="text-xs text-off-white-muted hover:text-off-white-secondary hover:underline"
                    >
                      {item.date}
                    </Button>
                  </div>
                </footer>
              </blockquote>
            ))}
          />
        </div>
      </section>
    </>
  )
}

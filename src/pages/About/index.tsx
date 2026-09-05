import { useTranslations } from 'use-intl'
import Img from '../../components/Img'
import PawBlob from '../../icons/PawBlob'

export default function About() {
  const t = useTranslations()

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="relative">
          <PawBlob
            className="absolute -top-3 -left-3 size-32 -rotate-45 opacity-50 sm:size-40"
            color="var(--color-gold)"
          />
          <Img
            src="/site/about.webp"
            alt={t('about.photoAlt')}
            width={768}
            height={1029}
            loading="eager"
            fetchPriority="high"
            className="h-about-photo relative w-full rounded-3xl object-cover shadow-xl sm:rounded-blob"
          />
        </div>
        <div>
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-ink sm:text-6xl">
            {t('about.heading')}
          </h1>
          <p className="mb-6 text-xl prose">{t('about.body1')}</p>
          <p className="mb-6 text-lg prose">{t('about.body2')}</p>
          <p className="mb-6 text-lg prose">{t('about.body3')}</p>
          <p className="text-lg prose">{t('about.body4')}</p>
        </div>
      </div>
    </section>
  )
}

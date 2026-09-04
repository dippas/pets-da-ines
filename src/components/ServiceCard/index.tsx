import { ArrowRightIcon } from '@phosphor-icons/react/ssr'
import { useTranslations } from 'use-intl'
import type { ServiceDescriptor } from '../../data/services'
import { useLocale } from '../../hooks/useLocale'
import { useServicePhoto } from '../../hooks/useServicePhoto'
import { pagePath } from '../../routes/paths'
import Button from '../Button'
import Img from '../Img'

export default function ServiceCard({
  service,
}: {
  service: ServiceDescriptor
}) {
  const t = useTranslations()
  const locale = useLocale()
  const servicesPath = pagePath('services', locale)
  const title = t(`services.${service.translationKey}.title`)
  const photo = useServicePhoto(service.slug, `card:${service.slug}`)

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-2xl sm:flex-row lg:flex-col">
      <Img
        src={photo}
        alt={t(`services.${service.translationKey}.photoAlt`)}
        className="aspect-square w-full object-cover sm:w-2/5 sm:shrink-0 lg:w-full"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-3xl leading-tight font-bold text-ink">{title}</h3>
        <p className="flex-1 text-base prose">
          {t(`services.${service.translationKey}.cardText`)}
        </p>
        <div>
          <Button to={servicesPath} variant="outline">
            {t('common.cta.learnMore')}
            <ArrowRightIcon size={16} weight="bold" />
          </Button>
        </div>
      </div>
    </article>
  )
}

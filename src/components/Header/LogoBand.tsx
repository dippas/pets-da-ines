import { Link, useLocation } from 'react-router'
import { useTranslations } from 'use-intl'
import { useLocale } from '../../hooks/useLocale'
import { pagePath } from '../../routes/paths'
import Img from '../Img'

export default function LogoBand() {
  const t = useTranslations()
  const locale = useLocale()
  const homePath = pagePath('home', locale)
  const { pathname } = useLocation()

  return (
    <Link
      to={homePath}
      className="flex min-w-0 items-center gap-3 sm:gap-4"
      aria-current={pathname === homePath ? 'page' : undefined}
    >
      <Img
        src="/site/logo.webp"
        alt={t('common.brand.name')}
        loading="eager"
        width={200}
        height={200}
        className="size-14 shrink-0 rounded-full border-2 border-white/85 object-cover shadow-md sm:size-18"
      />
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-xl font-bold tracking-tight text-ink sm:text-3xl">
          {t('common.brand.name')}
        </span>
        <span className="text-xs font-medium tracking-tagline text-ink-secondary uppercase">
          {t('common.brand.tagline')}
        </span>
      </span>
    </Link>
  )
}

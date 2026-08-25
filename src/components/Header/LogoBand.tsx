import { Link, useLocation } from 'react-router'
import { useTranslations } from 'use-intl'
import { useLocale } from '../../hooks/useLocale'
import { pagePath } from '../../routes/paths'
import InstagramLink from './InstagramLink'
import LanguageSwitcher from './LanguageSwitcher'

export default function LogoBand() {
  const t = useTranslations()
  const locale = useLocale()
  const homePath = pagePath('home', locale)
  const { pathname } = useLocation()

  return (
    <div className="border-b-4 border-gold bg-lavender">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <Link
          to={homePath}
          className="flex min-w-0 items-center gap-3 sm:gap-4"
          aria-current={pathname === homePath ? 'page' : undefined}
        >
          <img
            src="/site/logo.webp"
            alt={t('common.brand.name')}
            className="size-14 shrink-0 rounded-full border-2 border-white/85 object-cover shadow-md sm:size-18"
          />
          <span className="flex min-w-0 flex-col gap-1">
            <span className="truncate text-xl font-bold tracking-tight text-ink sm:text-3xl">
              {t('common.brand.name')}
            </span>
            <span className="text-xs font-medium tracking-tagline text-ink-secondary uppercase">
              {t('common.brand.tagline')}
            </span>
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <InstagramLink />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}

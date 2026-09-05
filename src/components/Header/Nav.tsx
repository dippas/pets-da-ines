import { type KeyboardEvent, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { useTranslations } from 'use-intl'
import { useLocale } from '../../hooks/useLocale'
import { cn } from '../../lib/cn'
import { pagePath } from '../../routes/paths'
import Button from '../Button'

const WHATSAPP_HREF = 'https://wa.me/351927350019'

const pillClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'focus-ring rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200',
    isActive
      ? 'bg-lavender text-indigo'
      : 'text-ink hover:bg-lavender hover:text-indigo',
  )

interface NavProps {
  hideLinks?: boolean
}

export default function Nav({ hideLinks = false }: NavProps) {
  const t = useTranslations()
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  function closeOnEscape(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && open) {
      setOpen(false)
      toggleRef.current?.focus()
    }
  }

  const links = [
    { to: pagePath('about', locale), label: t('common.nav.about') },
    { to: pagePath('services', locale), label: t('common.nav.services') },
    { to: pagePath('pricing', locale), label: t('common.nav.pricing') },
    { to: pagePath('booking', locale), label: t('common.nav.booking') },
    { to: pagePath('contact', locale), label: t('common.nav.contact') },
  ]

  return (
    <nav
      onKeyDown={closeOnEscape}
      className={cn(
        'sticky top-0 z-20 border-b border-ink-subtle bg-cream',
        hideLinks && 'hidden',
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-8 lg:hidden">
        <Button
          ref={toggleRef}
          variant="bare"
          onClick={() => setOpen((isOpen) => !isOpen)}
          ariaLabel={t('common.nav.menu')}
          ariaExpanded={open}
          ariaControls="mobile-menu"
          className="flex size-11 flex-col items-center justify-center gap-1"
        >
          <span
            className={cn('menu-bar', open && 'translate-y-1.5 rotate-45')}
          />
          <span className={cn('menu-bar', open && 'opacity-0')} />
          <span
            className={cn('menu-bar', open && '-translate-y-1.5 -rotate-45')}
          />
        </Button>
      </div>

      {open && !hideLinks && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full flex flex-col border-t border-ink-subtle bg-cream px-4 pb-4 shadow-lg sm:px-8 lg:hidden"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'focus-ring border-b border-ink-subtle py-4 text-lg font-semibold',
                  isActive ? 'text-indigo' : 'text-ink',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Button to={WHATSAPP_HREF} className="mt-4 px-4">
            {t('common.cta.freeAssessmentShort')}
          </Button>
        </div>
      )}

      <div className="mx-auto hidden max-w-6xl flex-wrap items-center gap-2 px-4 py-2 sm:px-8 lg:flex">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end className={pillClass}>
            {link.label}
          </NavLink>
        ))}
        <Button to={WHATSAPP_HREF} className="ml-auto px-6 py-3 text-xs">
          {t('common.cta.freeAssessmentShort')}
        </Button>
      </div>
    </nav>
  )
}

import type { SupportedLanguage } from '../i18n'

export const PAGE_PATHS = {
  home: { pt: '/', en: '/en' },
  about: { pt: '/sobre', en: '/en/about' },
  services: { pt: '/servicos', en: '/en/services' },
  pricing: { pt: '/precario', en: '/en/pricing' },
  booking: { pt: '/condicoes-reserva', en: '/en/booking-conditions' },
  contact: { pt: '/contactos', en: '/en/contact' },
} as const

export type PageKey = keyof typeof PAGE_PATHS

export function pagePath(page: PageKey, locale: SupportedLanguage): string {
  return PAGE_PATHS[page][locale]
}

export function pageForPath(pathname: string): PageKey {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname

  for (const [page, paths] of Object.entries(PAGE_PATHS)) {
    if (path === paths.pt || path === paths.en) {
      return page as PageKey
    }
  }
  return 'home'
}

export function switchLocalePath(pathname: string): string {
  for (const paths of Object.values(PAGE_PATHS)) {
    if (pathname === paths.pt) {
      return paths.en
    }
    if (pathname === paths.en) {
      return paths.pt
    }
  }
  return pathname.startsWith('/en')
    ? pathname.slice(3) || '/'
    : `/en${pathname}`
}

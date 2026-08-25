import { useLocation } from 'react-router'
import { defaultLanguage, type SupportedLanguage } from '../i18n'
import { switchLocalePath } from '../routes/paths'

const EN_PREFIX = '/en'

export function useLocale(): SupportedLanguage {
  const { pathname } = useLocation()
  const isEnglish =
    pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`)
  return isEnglish ? 'en' : defaultLanguage
}

export function useLanguageSwitchPath(): string {
  const { pathname } = useLocation()
  return switchLocalePath(pathname)
}

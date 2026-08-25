import type { SupportedLanguage } from '.'
import en from './locales/en.json'
import pt from './locales/pt.json'

export const messages: Record<SupportedLanguage, typeof pt> = { pt, en }

export const supportedLanguages = ['pt', 'en'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]
export const defaultLanguage: SupportedLanguage = 'pt'

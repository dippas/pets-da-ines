import { Link } from 'react-router'
import { useTranslations } from 'use-intl'
import { useLanguageSwitchPath, useLocale } from '../../hooks/useLocale'
import { type SupportedLanguage, supportedLanguages } from '../../i18n'

function LanguageOption({
  language,
  switchPath,
}: {
  language: SupportedLanguage
  switchPath: string
}) {
  const t = useTranslations()
  const locale = useLocale()

  if (locale === language) {
    return (
      <span className="border-b-2 border-indigo pb-0.5 text-ink">
        {t(`common.language.${language}`)}
      </span>
    )
  }

  return (
    <Link
      to={switchPath}
      className="text-ink-secondary transition-colors duration-200 hover:text-ink"
    >
      {t(`common.language.${language}`)}
    </Link>
  )
}

export default function LanguageSwitcher() {
  const switchPath = useLanguageSwitchPath()
  const [firstLanguage, secondLanguage] = supportedLanguages

  return (
    <div className="flex items-center gap-2 text-xs font-bold tracking-wide">
      <LanguageOption language={firstLanguage} switchPath={switchPath} />
      <span aria-hidden="true" className="text-ink-faint">
        |
      </span>
      <LanguageOption language={secondLanguage} switchPath={switchPath} />
    </div>
  )
}

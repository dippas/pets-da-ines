import { useTranslations } from 'use-intl'
import ErrorMessage from '../../components/ErrorMessage'
import { useLocale } from '../../hooks/useLocale'
import { pagePath } from '../../routes/paths'

export default function NotFound() {
  const t = useTranslations()
  const locale = useLocale()
  const homePath = pagePath('home', locale)

  return (
    <ErrorMessage
      eyebrow={t('error.notFound.eyebrow')}
      heading={t('error.notFound.heading')}
      body={t('error.notFound.body')}
      homePath={homePath}
    />
  )
}

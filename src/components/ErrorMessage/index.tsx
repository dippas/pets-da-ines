import { useTranslations } from 'use-intl'
import Button from '../Button'
import Label from '../Label'

interface ErrorMessageProps {
  eyebrow: string
  heading: string
  body: string
  homePath: string
  showHomeLink?: boolean
}

export default function ErrorMessage({
  eyebrow,
  heading,
  body,
  homePath,
  showHomeLink = true,
}: ErrorMessageProps) {
  const t = useTranslations()

  return (
    <div className="mx-auto flex flex-1 max-w-6xl flex-col items-center justify-center px-4 py-12 text-center sm:px-8">
      <Label tracking="eyebrow" className="mb-4">
        {eyebrow}
      </Label>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-ink sm:text-6xl">
        {heading}
      </h1>
      <p className="mx-auto mb-8 max-w-measure text-lg prose">{body}</p>
      {showHomeLink && <Button to={homePath}>{t('error.backHome')}</Button>}
    </div>
  )
}

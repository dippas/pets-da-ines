import { InstagramLogoIcon } from '@phosphor-icons/react/ssr'
import { useTranslations } from 'use-intl'

const INSTAGRAM_URL = 'https://www.instagram.com/_pets.da.ines_/'

export default function InstagramLink() {
  const t = useTranslations()

  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noreferrer"
      className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors duration-200 hover:bg-white/60"
    >
      <InstagramLogoIcon size={22} weight="light" />
      <span className="sr-only">{t('contact.instagramLabel')}</span>
    </a>
  )
}

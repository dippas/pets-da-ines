import { useTranslations } from 'use-intl'
import Img from '../Img'
import Label from '../Label'

const ADDRESS_LINE1 = 'Rua Teófilo Braga, nº 6'
const ADDRESS_LINE2 = '2730-181 Barcarena'
const WHATSAPP_HREF = 'https://wa.me/351927350019'
const EMAIL = 'ospetsdaines@gmail.com'
const INSTAGRAM_URL = 'https://www.instagram.com/_pets.da.ines_/'
const COMPLAINTS_BOOK_URL = 'https://www.livroreclamacoes.pt/Inicio/'

export default function Footer() {
  const t = useTranslations()

  return (
    <footer className="mt-auto bg-charcoal text-off-white-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-8 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-3 lg:col-span-1">
          <Img
            src="/site/logo.webp"
            alt={t('common.brand.name')}
            width={200}
            height={200}
            loading="lazy"
            decoding="async"
            className="mb-4 size-16 rounded-full object-cover"
          />
          <div className="mb-2 text-2xl font-bold text-off-white">
            {t('common.brand.name')}
          </div>
          <p className="mb-3 text-sm prose-invert">
            {t('common.footer.tagline')}
          </p>
          <p className="text-xs text-off-white-muted">
            {t('common.footer.founded')}
          </p>
        </div>
        <div>
          <Label as="h2" tracking="label" className="mb-4">
            {t('common.footer.addressTitle')}
          </Label>
          <p className="text-sm prose-invert">
            {ADDRESS_LINE1}
            <br />
            {ADDRESS_LINE2}
          </p>
        </div>
        <div>
          <Label as="h2" tracking="label" className="mb-4">
            {t('common.footer.hoursTitle')}
          </Label>
          <p className="text-sm prose-invert">{t('common.footer.hours')}</p>
        </div>
        <div>
          <Label as="h2" tracking="label" className="mb-4">
            {t('common.footer.contactTitle')}
          </Label>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer"
              className="text-off-white-strong hover:text-gold"
            >
              WhatsApp 927 350 019
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-off-white-strong hover:text-gold"
            >
              {EMAIL}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="text-off-white-strong hover:text-gold"
            >
              @_pets.da.ines_
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-off-white-subtle">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-6 px-4 py-6 text-xs sm:px-8">
          <span>{t('common.footer.rights')}</span>
          <a
            href={COMPLAINTS_BOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="text-off-white-secondary underline hover:text-gold"
          >
            {t('common.footer.complaintsBook')}
          </a>
        </div>
      </div>
    </footer>
  )
}

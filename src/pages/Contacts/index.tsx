import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  InstagramLogoIcon,
  WhatsappLogoIcon,
} from '@phosphor-icons/react/ssr'
import { useEffect, useState } from 'react'
import { Cookies, getCookieConsentValue } from 'react-cookie-consent'
import { useTranslations } from 'use-intl'
import Button from '../../components/Button'
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_NAME,
} from '../../components/CookieBanner'
import Label from '../../components/Label'

const WHATSAPP_HREF = 'https://wa.me/351927350019'
const EMAIL = 'ospetsdaines@gmail.com'
const INSTAGRAM_URL = 'https://www.instagram.com/_pets.da.ines_/'
const MAPS_URL = 'https://maps.app.goo.gl/YzGZmehdjhm61MWg7'
const MAPS_EMBED_SRC =
  'https://maps-api-ssl.google.com/maps?hl=pt-PT&ll=38.736264,-9.267537&output=embed&q=38.736266,-9.267587&z=15'

function mapAllowed() {
  if (import.meta.env.SSR) {
    return false
  }

  return getCookieConsentValue(COOKIE_NAME) === 'true'
}

export default function Contacts() {
  const t = useTranslations()
  const [mapConsent, setMapConsent] = useState(mapAllowed)

  useEffect(() => {
    function sync() {
      setMapConsent(mapAllowed())
    }

    window.addEventListener(COOKIE_CONSENT_EVENT, sync)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, sync)
  }, [])

  function acceptCookies() {
    Cookies.set(COOKIE_NAME, 'true', { expires: 365 })
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
      <h1 className="mb-12 text-4xl font-bold tracking-tight text-ink sm:text-6xl">
        {t('contact.heading')}
      </h1>

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noreferrer"
          className="contact-card relative overflow-hidden rounded-3xl bg-navy text-cream"
        >
          <span className="pointer-events-none absolute -top-11 -right-11 size-36 rounded-full border border-gold-ring" />
          <span className="icon-circle relative bg-gold-strong">
            <WhatsappLogoIcon
              size={22}
              weight="light"
              color="var(--color-gold)"
            />
          </span>
          <span>
            <Label className="mb-2 block text-gold">
              {t('contact.whatsappLabel')}
            </Label>
            <span className="block font-heading text-2xl font-semibold sm:text-3xl">
              +351 927 350 019
            </span>
          </span>
        </a>

        <a href={`mailto:${EMAIL}`} className="card contact-card text-ink">
          <span className="icon-circle bg-panel">
            <EnvelopeSimpleIcon
              size={22}
              weight="light"
              color="var(--color-indigo)"
            />
          </span>
          <span>
            <Label className="mb-2 block text-ink-muted">
              {t('contact.emailLabel')}
            </Label>
            <span className="block font-heading text-xl font-medium wrap-break-word sm:text-2xl">
              {EMAIL}
            </span>
          </span>
        </a>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="card contact-card text-ink"
        >
          <span className="icon-circle bg-panel">
            <InstagramLogoIcon
              size={22}
              weight="light"
              color="var(--color-indigo)"
            />
          </span>
          <span>
            <Label className="mb-2 block text-ink-muted">
              {t('contact.instagramLabel')}
            </Label>
            <span className="block font-heading text-xl font-medium sm:text-2xl">
              @_pets.da.ines_
            </span>
          </span>
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card flex flex-col gap-4 p-8">
          <Label className="text-ink-muted">{t('contact.whereLabel')}</Label>
          <span className="font-heading text-2xl leading-snug font-medium sm:text-3xl">
            Rua Teófilo Braga, nº 6
            <br />
            2730-181 Barcarena
          </span>
          <span className="text-sm prose">{t('contact.hoursNote')}</span>
          <div className="mt-auto">
            <Button to={MAPS_URL} variant="outline">
              {t('common.cta.openMaps')}
              <ArrowRightIcon size={16} weight="bold" />
            </Button>
          </div>
        </div>
        {mapConsent ? (
          <iframe
            title={t('contact.mapTitle')}
            src={MAPS_EMBED_SRC}
            className="h-contact-map w-full rounded-3xl border-0"
          />
        ) : (
          <div className="card flex h-contact-map w-full flex-col items-center justify-center gap-4 p-8 text-center">
            <p className="text-sm prose">
              {t('common.cookieBanner.mapPlaceholder')}
            </p>
            <Button variant="outline" onClick={acceptCookies}>
              {t('common.cookieBanner.accept')}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

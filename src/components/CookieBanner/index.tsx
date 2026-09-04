import CookieConsent from 'react-cookie-consent'
import { useTranslations } from 'use-intl'

export const COOKIE_NAME = 'cookie-consent'
export const COOKIE_CONSENT_EVENT = 'cookie-consent-change'

function notify() {
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT))
}

export default function CookieBanner() {
  const t = useTranslations()

  return (
    <CookieConsent
      location="bottom"
      cookieName={COOKIE_NAME}
      cookieValue="true"
      declineCookieValue="false"
      enableDeclineButton
      expires={365}
      disableStyles
      customContainerAttributes={{
        role: 'region',
        'aria-label': t('common.cookieBanner.label'),
      }}
      buttonText={t('common.cookieBanner.accept')}
      declineButtonText={t('common.cookieBanner.decline')}
      ariaAcceptLabel={t('common.cookieBanner.accept')}
      ariaDeclineLabel={t('common.cookieBanner.decline')}
      containerClasses="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-4 border-t border-ink-subtle bg-white p-4 shadow-2xl sm:flex-row sm:justify-between sm:p-6"
      contentClasses="m-0 flex-1 text-sm prose"
      buttonWrapperClasses="flex shrink-0 gap-3"
      buttonClasses="btn-base btn-solid"
      declineButtonClasses="btn-base btn-outline"
      onAccept={notify}
      onDecline={notify}
    >
      {t('common.cookieBanner.text')}
    </CookieConsent>
  )
}

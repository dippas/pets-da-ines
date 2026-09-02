import baloo2Semibold from '@fontsource/baloo-2/files/baloo-2-latin-600-normal.woff2?url'
import karlaRegular from '@fontsource/karla/files/karla-latin-400-normal.woff2?url'
import karlaMedium from '@fontsource/karla/files/karla-latin-500-normal.woff2?url'
import karlaSemibold from '@fontsource/karla/files/karla-latin-600-normal.woff2?url'
import karlaBold from '@fontsource/karla/files/karla-latin-700-normal.woff2?url'
import { Analytics } from '@vercel/analytics/react'
import type { ReactNode } from 'react'
import {
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router'
import { IntlProvider } from 'use-intl'
import CookieBanner from './components/CookieBanner'
import PageMeta from './components/PageMeta'
import { useLocale } from './hooks/useLocale'
import { messages } from './i18n/messages'
import { pageForPath } from './routes/paths'
import './index.css'

const criticalFonts = [
  baloo2Semibold,
  karlaRegular,
  karlaMedium,
  karlaSemibold,
  karlaBold,
]

export function Layout({ children }: { children: ReactNode }) {
  const locale = useLocale()

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="/site/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {criticalFonts.map((href) => (
          <link
            key={href}
            rel="preload"
            as="font"
            type="font/woff2"
            href={href}
            crossOrigin="anonymous"
          />
        ))}
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  const locale = useLocale()
  const { pathname } = useLocation()
  const page = pageForPath(pathname)

  return (
    <IntlProvider
      locale={locale}
      messages={messages[locale]}
      timeZone="Europe/Lisbon"
    >
      <PageMeta page={page} />
      <Outlet />
      <CookieBanner />
      <Analytics />
    </IntlProvider>
  )
}

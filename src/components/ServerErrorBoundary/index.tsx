import { Component, type ReactNode } from 'react'
import { useLocation } from 'react-router'
import { useTranslations } from 'use-intl'
import { useLocale } from '../../hooks/useLocale'
import { pagePath } from '../../routes/paths'
import ErrorMessage from '../ErrorMessage'
import Nav from '../Header/Nav'

function ServerErrorContent() {
  const t = useTranslations()
  const locale = useLocale()
  const { pathname } = useLocation()
  const homePath = pagePath('home', locale)

  return (
    <>
      <title>{t('meta.serverError.title')}</title>
      <meta name="robots" content="noindex" />
      <Nav hideLinks />
      <main id="main-content" className="flex flex-1 flex-col">
        <ErrorMessage
          eyebrow={t('error.serverError.eyebrow')}
          heading={t('error.serverError.heading')}
          body={t('error.serverError.body')}
          homePath={homePath}
          showHomeLink={pathname !== homePath}
        />
      </main>
    </>
  )
}

interface ServerErrorBoundaryProps {
  children: ReactNode
}

interface ServerErrorBoundaryState {
  hasError: boolean
}

export default class ServerErrorBoundary extends Component<
  ServerErrorBoundaryProps,
  ServerErrorBoundaryState
> {
  state: ServerErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <ServerErrorContent />
    }
    return this.props.children
  }
}

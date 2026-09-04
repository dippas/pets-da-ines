import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Nav from '../components/Header/Nav'
import ServerErrorBoundary from '../components/ServerErrorBoundary'

export default function SiteLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <ServerErrorBoundary>
        <Nav />
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
      </ServerErrorBoundary>
      <Footer />
    </div>
  )
}

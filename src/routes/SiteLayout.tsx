import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import LogoBand from '../components/Header/LogoBand'
import Nav from '../components/Header/Nav'

export default function SiteLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <header>
        <LogoBand />
      </header>
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

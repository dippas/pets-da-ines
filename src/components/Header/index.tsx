import InstagramLink from './InstagramLink'
import LanguageSwitcher from './LanguageSwitcher'
import LogoBand from './LogoBand'

export default function Header() {
  return (
    <header className="border-b-4 border-gold bg-lavender">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <LogoBand />
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <InstagramLink />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}

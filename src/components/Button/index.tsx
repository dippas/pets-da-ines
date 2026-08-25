import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../../lib/cn'

interface ButtonProps {
  to?: string
  onClick?: () => void
  active?: boolean
  ariaLabel?: string
  ariaExpanded?: boolean
  children: ReactNode
  variant?: 'solid' | 'outline' | 'link' | 'bare'
  className?: string
}

const variants = {
  solid: 'btn-solid',
  outline: 'btn-outline',
  link: 'btn-link',
  bare: '',
}

function isInternal(to: string) {
  return to.startsWith('/')
}

export default function Button({
  to,
  onClick,
  active,
  ariaLabel,
  ariaExpanded,
  children,
  variant = 'solid',
  className: extraClassName,
}: ButtonProps) {
  const className = cn('btn-base', variants[variant], extraClassName)

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        className={className}
      >
        {children}
      </button>
    )
  }

  const href = to ?? '#'

  if (isInternal(href)) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'use-intl'
import { cn } from '../../lib/cn'
import Button from '../Button'

export default function TestimonialQuote({ quote }: { quote: string }) {
  const t = useTranslations()
  const ref = useRef<HTMLParagraphElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [canExpand, setCanExpand] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (el) {
      setCanExpand(el.scrollHeight > el.clientHeight + 1)
    }
  }, [])

  return (
    <div>
      <p
        ref={ref}
        className={cn(
          'text-lg leading-relaxed font-medium text-off-white',
          !expanded && 'line-clamp-6',
        )}
      >
        <q>{quote}</q>
      </p>
      {canExpand && (
        <Button
          variant="bare"
          onClick={() => setExpanded((value) => !value)}
          ariaExpanded={expanded}
          className="mt-2 text-sm font-semibold text-gold hover:text-cream"
        >
          {expanded
            ? t('home.testimonials.readLess')
            : t('home.testimonials.readMore')}
        </Button>
      )}
    </div>
  )
}

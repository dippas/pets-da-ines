import type { ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type LabelTracking = 'eyebrow' | 'widest' | 'label' | 'badge'

interface LabelProps {
  as?: ElementType
  id?: string
  tracking?: LabelTracking
  children: ReactNode
  className?: string
}

const trackingClass: Record<LabelTracking, string> = {
  eyebrow: 'label-eyebrow',
  widest: 'label-widest',
  label: 'label-section',
  badge: 'label-badge',
}

export default function Label({
  as: Tag = 'span',
  id,
  tracking = 'widest',
  children,
  className,
}: LabelProps) {
  return (
    <Tag id={id} className={cn(trackingClass[tracking], className)}>
      {children}
    </Tag>
  )
}

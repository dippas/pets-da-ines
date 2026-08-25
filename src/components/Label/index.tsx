import type { ElementType, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type LabelTracking = 'eyebrow' | 'widest' | 'label' | 'badge'

interface LabelProps {
  as?: ElementType
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
  tracking = 'widest',
  children,
  className,
}: LabelProps) {
  return (
    <Tag className={cn(trackingClass[tracking], className)}>{children}</Tag>
  )
}

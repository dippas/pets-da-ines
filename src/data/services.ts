import type { PriceKind } from './pricing'

export type ServiceSlug = 'pet-boarding' | 'pet-sitting' | 'dog-walking'
export type ServiceTranslationKey = 'petBoarding' | 'petSitting' | 'dogWalking'
export type ServiceUnitKey = 'perNight' | 'perVisit' | 'perWalk'

export interface ServiceDescriptor {
  slug: ServiceSlug
  translationKey: ServiceTranslationKey
  priceKind: PriceKind
  unitKey: ServiceUnitKey
}

export const services: ServiceDescriptor[] = [
  {
    slug: 'pet-boarding',
    translationKey: 'petBoarding',
    priceKind: 'boarding',
    unitKey: 'perNight',
  },
  {
    slug: 'pet-sitting',
    translationKey: 'petSitting',
    priceKind: 'visit',
    unitKey: 'perVisit',
  },
  {
    slug: 'dog-walking',
    translationKey: 'dogWalking',
    priceKind: 'visit',
    unitKey: 'perWalk',
  },
]

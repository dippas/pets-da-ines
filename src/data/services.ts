export type ServiceSlug = 'pet-boarding' | 'pet-sitting' | 'dog-walking'
export type ServiceTranslationKey = 'petBoarding' | 'petSitting' | 'dogWalking'

export interface ServiceDescriptor {
  slug: ServiceSlug
  translationKey: ServiceTranslationKey
}

export const services: ServiceDescriptor[] = [
  { slug: 'pet-boarding', translationKey: 'petBoarding' },
  { slug: 'pet-sitting', translationKey: 'petSitting' },
  { slug: 'dog-walking', translationKey: 'dogWalking' },
]

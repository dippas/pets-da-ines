import type { ServiceSlug } from '../data/services'
import { useRandomImage } from './useRandomImage'

const PHOTO_COUNTS: Record<ServiceSlug, number> = {
  'pet-boarding': 10,
  'pet-sitting': 21,
  'dog-walking': 18,
}

export function servicePhotoPool(slug: ServiceSlug): string[] {
  return Array.from(
    { length: PHOTO_COUNTS[slug] },
    (_, index) =>
      `/services/${slug}/${slug}-${String(index + 1).padStart(2, '0')}.webp`,
  )
}

export function useServicePhoto(slug: ServiceSlug, key: string): string {
  return useRandomImage(servicePhotoPool(slug), key)
}

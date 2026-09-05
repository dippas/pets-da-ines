import type { ServiceSlug } from '../data/services'

const PHOTO_COUNTS: Record<ServiceSlug, number> = {
  'pet-boarding': 10,
  'pet-sitting': 21,
  'dog-walking': 18,
}

// set in vite.config.ts, so a build always inlines it; `|| 0` only keeps a
// missing value from turning every photo index into NaN
const WEEK = Number(import.meta.env.VITE_PHOTO_WEEK) || 0

function photoUrl(slug: ServiceSlug, index: number): string {
  return `/services/${slug}/${slug}-${String(index + 1).padStart(2, '0')}.webp`
}

export function servicePhotoPool(slug: ServiceSlug): string[] {
  return Array.from({ length: PHOTO_COUNTS[slug] }, (_, index) =>
    photoUrl(slug, index),
  )
}

export function servicePhoto(slug: ServiceSlug): string {
  return photoUrl(slug, WEEK % PHOTO_COUNTS[slug])
}

// starts one past the photo servicePhoto() picks, so the detail photo is never
// repeated in the gallery below it
export function galleryOrder(slug: ServiceSlug): number[] {
  const count = PHOTO_COUNTS[slug]
  const start = WEEK % count

  return Array.from(
    { length: count - 1 },
    (_, index) => (start + index + 1) % count,
  )
}

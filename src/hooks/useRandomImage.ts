import { useState } from 'react'

export function useRandomImage(pool: string[], key: string): string {
  const [image] = useState(() => {
    if (import.meta.env.SSR) {
      return pool[0]
    }

    const storageKey = `photo:${key}`
    const stored = sessionStorage.getItem(storageKey)

    if (stored && pool.includes(stored)) {
      return stored
    }

    const picked = pool[Math.floor(Math.random() * pool.length)]
    sessionStorage.setItem(storageKey, picked)

    return picked
  })

  return image
}

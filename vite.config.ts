import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const DAY_MS = 24 * 60 * 60 * 1000
const WEEK_MS = 7 * DAY_MS

// the unix epoch (1970-01-01) is a Thursday, so shift by 4 days: the bucket then
// turns over on Monday 00:00 UTC, same day the cron fires at 14:00 UTC
const EPOCH_TO_MONDAY = 4 * DAY_MS

// frozen at build time so the prerendered HTML and the hydrated render pick the
// same photo; the weekly deploy is what advances it
process.env.VITE_PHOTO_WEEK = String(
  Math.floor((Date.now() - EPOCH_TO_MONDAY) / WEEK_MS),
)

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  ssr: {
    noExternal: ['react-cookie-consent'],
  },
})

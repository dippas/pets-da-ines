import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// frozen at build time so the prerendered HTML and the hydrated render pick the
// same photo; the weekly deploy is what advances it
process.env.VITE_PHOTO_WEEK = String(Math.floor(Date.now() / 604_800_000))

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  ssr: {
    noExternal: ['react-cookie-consent'],
  },
})

import { readFileSync, writeFileSync } from 'node:fs'
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// frozen at build time so the prerendered HTML and the hydrated render pick the
// same photo; the weekly deploy is what advances it
process.env.VITE_PHOTO_WEEK = String(Math.floor(Date.now() / 604_800_000))

// keeps the deployed X-App-Version header in sync with package.json
const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const vercelConfig = JSON.parse(readFileSync('vercel.json', 'utf8'))
const globalHeaders = vercelConfig.headers[0].headers
const versionHeader = globalHeaders.find(
  (h: { key: string }) => h.key === 'X-App-Version',
)
if (versionHeader) {
  versionHeader.value = pkg.version
} else {
  globalHeaders.unshift({ key: 'X-App-Version', value: pkg.version })
}
writeFileSync('vercel.json', `${JSON.stringify(vercelConfig, null, 2)}\n`)

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],
  ssr: {
    noExternal: ['react-cookie-consent'],
  },
})

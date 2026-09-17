import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { Config } from '@react-router/dev/config'
import { PAGE_PATHS } from './src/routes/paths'

const prerenderPaths = Object.values(PAGE_PATHS).flatMap((paths) => [
  paths.pt,
  paths.en,
])

export default {
  appDirectory: 'src',
  ssr: false,
  prerender: prerenderPaths,
  // the SPA fallback is renamed to index.html when '/' is not prerendered, and
  // the middleware fetches it by name to answer unknown paths with a 404 body
  buildEnd({ reactRouterConfig }) {
    const shell = join(
      reactRouterConfig.buildDirectory,
      'client',
      '__spa-fallback.html',
    )

    if (!existsSync(shell)) {
      throw new Error(`${shell} is missing: the middleware 404 depends on it`)
    }
  },
} satisfies Config

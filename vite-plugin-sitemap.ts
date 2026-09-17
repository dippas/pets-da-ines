import { execSync } from 'node:child_process'
import type { Plugin } from 'vite'
import { PAGE_PATHS } from './src/routes/paths'

const SITE_URL = 'https://ospetsdaines.com'

// the HEAD commit date, not the build date: the weekly photo deploy rebuilds the
// same commit, and a lastmod that moves without a content change gets discounted
function contentDate() {
  try {
    return execSync('git log -1 --format=%cs', { encoding: 'utf8' }).trim()
  } catch {
    return new Date().toISOString().slice(0, 10)
  }
}

export function sitemap(): Plugin {
  return {
    name: 'sitemap',
    apply: 'build',
    generateBundle() {
      if (this.environment.name !== 'client') {
        return
      }

      const lastmod = contentDate()
      const urls = Object.values(PAGE_PATHS)
        .flatMap(({ pt, en }) => [pt, en])
        .map(
          (path) =>
            `  <url><loc>${SITE_URL}${path}</loc><lastmod>${lastmod}</lastmod></url>`,
        )
        .join('\n')

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

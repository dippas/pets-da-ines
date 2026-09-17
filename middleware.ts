import { next } from '@vercel/functions'
import { version } from './package.json'
import { pageForPath } from './src/routes/paths'

// the react-router preset builds through @vercel/remix-builder, which drops the
// whole api/ directory (ignoreRuntimes: ["@vercel/node"]); middleware is the one
// node entrypoint the preset still compiles, so the cron lands here
const CRON_PATH = '/api/cron/rotate-photos'

const SPA_SHELL = '/__spa-fallback.html'

export const config = { runtime: 'nodejs' }

export default async function middleware(request: Request) {
  const { pathname } = new URL(request.url)

  if (pathname !== CRON_PATH) {
    // the preset's catch-all rewrite answers unknown paths with the shell at
    // status 200, which Google reads as a soft 404; serve the same shell (the
    // splat route renders NotFound with noindex) under the real status instead
    if (!pathname.includes('.') && pageForPath(pathname) === null) {
      // the shell sits behind SSO on protected deployment URLs, so the caller's
      // cookie goes with it; manual redirect keeps a login page from a followed
      // challenge chain out of the 404 body
      const shell = await fetch(new URL(SPA_SHELL, request.url), {
        redirect: 'manual',
        headers: { cookie: request.headers.get('cookie') ?? '' },
      }).catch(() => null)

      if (!shell?.ok) {
        return new Response('SPA fallback unavailable', { status: 500 })
      }

      return new Response(shell.body, {
        status: 404,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'x-robots-tag': 'noindex',
        },
      })
    }

    return next({ headers: { 'X-App-Version': version } })
  }

  const cronSecret = process.env.CRON_SECRET
  const deployHookUrl = process.env.DEPLOY_HOOK_URL

  if (
    !cronSecret ||
    request.headers.get('authorization') !== `Bearer ${cronSecret}`
  ) {
    return new Response('Unauthorized', { status: 401 })
  }

  if (!deployHookUrl) {
    return new Response('Missing DEPLOY_HOOK_URL', { status: 500 })
  }

  await fetch(deployHookUrl, { method: 'POST' })

  return new Response('OK')
}

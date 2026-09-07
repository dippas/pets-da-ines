import { next } from '@vercel/functions'
import { version } from './package.json'

// the react-router preset builds through @vercel/remix-builder, which drops the
// whole api/ directory (ignoreRuntimes: ["@vercel/node"]); middleware is the one
// node entrypoint the preset still compiles, so the cron lands here
const CRON_PATH = '/api/cron/rotate-photos'

export default async function middleware(request: Request) {
  if (new URL(request.url).pathname !== CRON_PATH) {
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

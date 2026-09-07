export async function GET(request: Request) {
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

import { next } from '@vercel/functions'
import { version } from './package.json'

export default function middleware() {
  return next({ headers: { 'X-App-Version': version } })
}

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
} satisfies Config

import type { Config } from '@react-router/dev/config';
export default { appDirectory: 'src', ssr: false, prerender: ['/', '/education', '/work', '/research', '/projects', '/teaching', '/404'] } satisfies Config;

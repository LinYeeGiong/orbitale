export const siteConfig = {
  name: 'Lin',
  title: 'Lin / Lab Notes',
  description: '记录研究、工程、写作与日常的个人数字花园。',
  locale: 'zh-CN',
  timezone: 'Asia/Shanghai',
  navigation: [
    { label: '首页', href: '/' },
    { label: '关于', href: '/about/' },
    { label: '学习', href: '/notes/' },
    { label: '随笔', href: '/essays/' },
    { label: 'Daily', href: '/daily/' },
  ],
} as const;

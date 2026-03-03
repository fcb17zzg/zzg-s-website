import type { FootballGallery, WorkExperience } from '@/lib/types';

export const profile = {
  name: '赵佐郜',
  headline: '热爱系统与网络工程的 C/C++ 开发者',
  bio: '重庆邮电大学软件工程本科在读。长期关注操作系统、网络通信与高性能服务端开发，持续在 Linux 体系下打磨工程能力。当前在安恒信息从事安全网关相关研发，围绕 IKE/IPsec 通道、数据面关键路径与后端控制面协同进行功能迭代和性能优化。',
  location: "中国",
  github: 'https://github.com/fcb17zzg',
  tags: ['C/C++', 'Linux 系统开发', '网络与安全', '工程化实践'],
};

export const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/life', label: 'Life' },
  { href: '/thoughts', label: 'Thoughts' },
];

export const socialLinks = [
  { href: 'https://github.com/fcb17zzg', label: 'GitHub', external: true },
  {
    href: 'https://www.linkedin.com/in/%E4%BD%90%E9%83%9C-%E8%B5%B5-130085392/',
    label: 'LinkedIn',
    external: true,
  },
  { href: 'mailto:1459181201@qq.com', label: 'Email', external: false },
];

export const wechatId = 'FCB_REAL_MUCHEN';

export const techStack = [
  'C++',
  'C',
  'Golang',
  'Linux',
  'TCP/IP',
  'Epoll',
  'MySQL',
  'Redis',
  'StrongSwan',
  'VPP',
  'DPDK',
];

export const projects = [
  {
    name: '个人网站（当前项目）',
    desc: '基于 Next.js App Router 的多页面个人站，支持 Markdown 内容驱动与静态生成。',
    url: 'https://github.com/fcb17zzg/zzg-s-website',
    tags: ['Next.js', 'TypeScript', 'SSG'],
  },
  {
    name: '工程实践记录集',
    desc: '沉淀常用脚手架、脚本与开发流程模板，提升个人项目交付效率。',
    url: 'https://github.com/fcb17zzg',
    tags: ['Node.js', 'Python'],
  },
];

export const hobbies = ['音乐', '足球', '吉他', '电影', '游戏'];

export const workExperience: WorkExperience = {
  company: '安恒信息技术股份有限公司',
  role: 'C/C++ 开发工程师',
  period: '2025.09 - 至今',
  summary:
    '负责安全网关类产品核心模块开发与维护，聚焦隧道协议与高性能数据面场景，推动功能迭代与稳定性提升。',
  highlights: [
    '参与 StrongSwan、VPP、DPDK 等框架二次开发，围绕 IKE/IPsec 场景进行性能优化与问题定位。',
    '在数据面基于 C 语言实现安全引擎关键路径逻辑，提升系统可靠性与处理效率。',
    '在控制面使用 Golang 维护配置下发与状态上报服务，保障前后端链路协同。',
    '使用 Apipost、dlv、gdb、Wireshark 等工具分析控制流与报文路径，支撑线上问题排查。',
  ],
  tech: ['C', 'C++', 'Golang', 'StrongSwan', 'VPP', 'DPDK', 'IKE/IPsec'],
};

export const footballGallery: FootballGallery = {
  title: '足球队组织与活动',
  images: [
    {
      src: '/images/football/team-1.jpg',
      alt: '足球队赛前合影',
    },
    {
      src: '/images/football/team-2.jpg',
      alt: '足球队比赛过程',
    },
    {
      src: '/images/football/team-3.jpg',
      alt: '足球队训练活动',
    },
  ],
};

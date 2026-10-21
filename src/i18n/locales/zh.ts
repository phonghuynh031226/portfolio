import type { TranslationSchema } from "../types";

export const zh: TranslationSchema = {
  nav: {
    about: "关于我",
    projects: "项目",
    resume: "经历",
    blog: "博客",
    contact: "联系",
    donate: "赞助",
  },
  home: {
    greeting_prefix: "你好，我是",
    greeting_suffix: "👋",
    bio: "软件工程专业学生，热衷于 AI、编程与前沿科技。",
    quote: "“机遇宛如日出。倘若等待过久，你终将错失。”",
    btn_projects: "→ 查看项目",
    btn_contact: "→ 与我联系",
    about_title: "关于我",
    about_desc: "我从研究现有代码、动手修改与重新构建开始接触编程，探索背后的运行机制。最初的好奇尝试，如今已成为我真正热爱的追求。",
  },
  notFound: {
    title: "404",
    subTitle: "迷路了吗？🥲",
    desc: "这个页面可能尚未编写，或者被 AI 吃掉了。",
    backHome: "→ 返回首页",
  },
  error: {
    title: "无法加载此页面",
    desc: "请重试！",
    tryAgain: "重试",
    backHome: "返回首页",
  },
  lang: {
    selectLanguage: "选择语言",
    autoDetected: "根据 IP 自动识别",
    current: "语言",
  },
};

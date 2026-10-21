import type { TranslationSchema } from "../types";

export const en: TranslationSchema = {
  nav: {
    about: "About",
    projects: "Projects",
    resume: "Experience",
    blog: "Blog",
    contact: "Contact",
    donate: "Donate",
  },
  home: {
    greeting_prefix: "Hi, I am",
    greeting_suffix: "👋",
    bio: "Software engineering student passionate about AI, code, and cutting-edge tech.",
    quote: "“Opportunity is like a sunrise. If you wait too long, you will miss it.”",
    btn_projects: "→ View Projects",
    btn_contact: "→ Get in touch",
    about_title: "About Me",
    about_desc: "I started coding by tinkering with existing projects, testing, rebuilding, and figuring out how everything worked under the hood. What began as casual curiosity quickly became my true passion.",
  },
  notFound: {
    title: "404",
    subTitle: "Lost your way? 🥲",
    desc: "This page might still be in progress or got eaten by an AI.",
    backHome: "→ Back to home",
  },
  error: {
    title: "Could not load this page",
    desc: "Please try again!",
    tryAgain: "Try again",
    backHome: "Back to home",
  },
  lang: {
    selectLanguage: "Select language",
    autoDetected: "Auto-detected by IP",
    current: "Language",
  },
};

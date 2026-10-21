export type SupportedLang = 'vi' | 'th' | 'en' | 'ja' | 'ko' | 'zh';

export interface TranslationSchema {
  nav: {
    about: string;
    projects: string;
    resume: string;
    blog: string;
    contact: string;
    donate: string;
  };
  home: {
    greeting_prefix: string;
    greeting_suffix: string;
    bio: string;
    quote: string;
    btn_projects: string;
    btn_contact: string;
    about_title: string;
    about_desc: string;
  };
  notFound: {
    title: string;
    subTitle: string;
    desc: string;
    backHome: string;
  };
  error: {
    title: string;
    desc: string;
    tryAgain: string;
    backHome: string;
  };
  lang: {
    selectLanguage: string;
    autoDetected: string;
    current: string;
  };
}

export interface LanguageInfo {
  code: SupportedLang;
  label: string;
  nativeName: string;
  flag: string;
  short: string;
}

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
  projects: {
    title: string;
    desc: string;
    view_details: string;
    default_desc: string;
  };
  resume: {
    title: string;
    desc: string;
    education_title: string;
    education_status: string;
    experience_title: string;
    internship_role: string;
    internship_time: string;
    skills_title: string;
    cat_languages: string;
    cat_frontend: string;
    cat_backend: string;
    cat_tools: string;
    cat_other: string;
    skill_learning: string;
    skill_basic: string;
    coffee_skill: string;
    office_skill: string;
  };
  blog: {
    title: string;
    desc: string;
    tab_news: string;
    tab_stories: string;
    empty_text: string;
  };
  contact: {
    title: string;
    desc: string;
    name_label: string;
    email_label: string;
    message_label: string;
    message_placeholder: string;
    btn_send: string;
    btn_sending: string;
    btn_sent: string;
    reply_soon: string;
  };
  donate: {
    title: string;
    desc_p1: string;
    coffee_text: string;
    desc_p2: string;
    noodles_text: string;
    desc_p3: string;
    tier_coffee: string;
    tier_noodles: string;
    qr_title: string;
    bank_label: string;
    account_no_label: string;
    account_holder_label: string;
    note_label: string;
    thank_you: string;
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

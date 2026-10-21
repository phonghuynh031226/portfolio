import type { TranslationSchema } from "../types";

export const ja: TranslationSchema = {
  nav: {
    about: "自己紹介",
    projects: "プロジェクト",
    resume: "経歴",
    blog: "ブログ",
    contact: "お問い合わせ",
    donate: "寄付",
  },
  home: {
    greeting_prefix: "こんにちは、",
    greeting_suffix: "です 👋",
    bio: "ソフトウェア開発を専攻する学生。AI、プログラミング、最新技術に強い関心を持っています。",
    quote: "「チャンスは日の出のようなものだ。長く待ちすぎると見逃してしまう。」",
    btn_projects: "→ プロジェクトを見る",
    btn_contact: "→ お問い合わせ",
    about_title: "私について",
    about_desc: "既存のコードをいじったり、改造して再構築したりしながら、仕組みを解き明かすことから始めました。最初は遊び感覚でしたが、やがてプログラミングが真の情熱へと変わりました。",
  },
  notFound: {
    title: "404",
    subTitle: "道に迷いましたか？ 🥲",
    desc: "このページはまだ作成されていないか、AIに食べられてしまったようです。",
    backHome: "→ ホームに戻る",
  },
  error: {
    title: "ページを読み込めませんでした",
    desc: "もう一度お試しください！",
    tryAgain: "再試行",
    backHome: "ホームへ",
  },
  lang: {
    selectLanguage: "言語を選択",
    autoDetected: "IPアドレスから自動判定",
    current: "言語",
  },
};

import type { TranslationSchema } from "../types";

export const ko: TranslationSchema = {
  nav: {
    about: "소개",
    projects: "프로젝트",
    resume: "경력",
    blog: "블로그",
    contact: "연락처",
    donate: "후원",
  },
  home: {
    greeting_prefix: "안녕하세요, 저는",
    greeting_suffix: "입니다 👋",
    bio: "소프트웨어 공학 전공 학생으로 AI, 코딩, 최신 기술에 열정을 가지고 있습니다.",
    quote: "“기회는 일출과 같다. 너무 오래 기다리면 놓치게 된다.”",
    btn_projects: "→ 프로젝트 보기",
    btn_contact: "→ 연락하기",
    about_title: "소개",
    about_desc: "기존 코드를 만져보고, 다시 빌드해보며 뒷단의 동작 원리를 탐구하면서 프로그래밍을 시작했습니다. 단순한 호기심에서 시작된 코딩이 이제는 진정한 열정이 되었습니다.",
  },
  notFound: {
    title: "404",
    subTitle: "길을 잃으셨나요? 🥲",
    desc: "이 페이지는 아직 작성되지 않았거나 AI가 삼켜버린 것 같습니다.",
    backHome: "→ 홈으로 이동",
  },
  error: {
    title: "페이지를 불러올 수 없습니다",
    desc: "다시 시도해 주세요!",
    tryAgain: "다시 시도",
    backHome: "홈으로",
  },
  lang: {
    selectLanguage: "언어 선택",
    autoDetected: "IP 기반 자동 감지",
    current: "언어",
  },
};

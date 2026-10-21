import type { TranslationSchema } from "../types";

export const vi: TranslationSchema = {
  nav: {
    about: "Giới thiệu",
    projects: "Dự án",
    resume: "Kinh nghiệm",
    blog: "Blog",
    contact: "Liên hệ",
    donate: "Donate",
  },
  home: {
    greeting_prefix: "Hi, mình là",
    greeting_suffix: "👋",
    bio: "Sinh viên ngành phát triển phần mềm, yêu thích AI, code và những công nghệ mới.",
    quote: "“Cơ hội giống như bình minh. Nếu bạn chờ quá lâu, bạn sẽ bỏ lỡ nó.”",
    btn_projects: "→ Xem dự án",
    btn_contact: "→ Liên hệ với mình",
    about_title: "Về mình",
    about_desc: "Mình bắt đầu với lập trình bằng việc mày mò những đoạn code có sẵn, thử sửa, thử build lại và tìm hiểu cách mọi thứ hoạt động phía sau. Từ những lần “vọc cho vui”, coding dần trở thành điều mình thật sự đam mê.",
  },
  notFound: {
    title: "404",
    subTitle: "Lạc đường rồi 🥲",
    desc: "Trang này hình như chưa được code, hoặc bị AI ăn mất.",
    backHome: "→ Về trang chủ",
  },
  error: {
    title: "Trang này không tải được",
    desc: "Thử lại nhé!",
    tryAgain: "Thử lại",
    backHome: "Về trang chủ",
  },
  lang: {
    selectLanguage: "Chọn ngôn ngữ",
    autoDetected: "Tự động nhận diện từ IP",
    current: "Ngôn ngữ",
  },
};

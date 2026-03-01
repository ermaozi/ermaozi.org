export const SITE = {
  website: "https://ermaozi.org/",
  author: "Ermaozi",
  profile: "https://ermaozi.org/about/",
  desc: "Ermaozi 的博客，分享机场评测、科学上网与实用教程。",
  title: "Ermaozi 机场评测与推荐",
  ogImage: "ermaozi-og.webp", // ubicado en la carpeta public
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 8,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showGalleries: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "编辑本文",
    url: "https://ermaozi.org/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "zh-CN", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  introAudio: {
    enabled: true, // mostrar/ocultar el reproductor en el hero
    src: "/audio/intro-web.mp3", // ruta al archivo (relativa a /public)
    label: "INTRO.MP3", // etiqueta display en el reproductor
    duration: 30, // duración en segundos (para la barra de progreso fija)
  },
} as const;

// Files in /public are served next to index.html after build.
const base = import.meta.env.BASE_URL;

export const STUDENT = {
  name: "รติพงษ์ ครองระวะ",
  id: "664245045",
  group: "66/44",
};

export const SLIDES = {
  src: `${base}MattressGraph_Presentation.pdf`,
  title: "สไลด์งานที่ 5",
};

export const WORKS = [
  {
    no: 1,
    kind: "Google Colab",
    href: "https://colab.research.google.com/drive/1lAnbn_lRK-ns3CYHGOapIXgMMOzbBtQS?usp=sharing",
  },
  {
    no: 2,
    kind: "รายงาน PDF",
    sub: "ระบบแนะนำชมรมด้วย Neo4j",
    pdf: { src: `${base}664245045_Ratipong.pdf`, title: "รายงานงานที่ 2" },
  },
  {
    no: 3,
    kind: "Google Drive",
    href: "https://drive.google.com/file/d/1id6Yqki3yn12QQITlrpGH7xi-0mg2oIV/view?usp=sharing",
  },
  {
    no: 4,
    kind: "Google Drive",
    href: "https://drive.google.com/file/d/16ATqUiZ1yXi9cXjB_FqAz8TdF--8idMu/view?usp=sharing",
  },
  {
    no: 5,
    kind: "Streamlit App",
    sub: "Mattress Type Recommender",
    href: "https://mattresstype-ffwjgjm82x5z9yg35enmvc.streamlit.app/",
    slides: SLIDES,
  },
];

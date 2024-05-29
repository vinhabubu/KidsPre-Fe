import { ROUTES } from "./routerWeb";
export const MENU_ADMIN = [
  {
    label: "Dashboard",
    active: false,
    src: ROUTES.ADMIN_DASHBOARD,
    icon: <i className="fas fa-home"></i>,
  },
  {
    label: "User",
    active: false,
    src: ROUTES.ADMIN_USER,
    icon: <i className="fas fa-users"></i>,
  },
];

export const MENU_MANAGER = [
  {
    label: "Topic",
    active: false,
    src: ROUTES.ADMIN_TOPIC,
    icon: <i className="fas fa-shapes"></i>,
  },
  {
    label: "Category",
    active: false,
    src: ROUTES.ADMIN_CATEGORY,
    icon: <i className="fas fa-sitemap"></i>,
  },
  {
    label: "Lesson",
    active: false,
    src: ROUTES.ADMIN_LESSON,
    icon: <i className="fas fa-book-open"></i>,
  },
  {
    label: "Question",
    active: false,
    src: ROUTES.ADMIN_QUESTION,
    icon: <i className="fas fa-question"></i>,
  },
  {
    label: "Quiz",
    active: false,
    src: ROUTES.ADMIN_QUIZ,
    icon: <i className="far fa-question-circle"></i>,
  },
];

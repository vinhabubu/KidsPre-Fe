import AdminLayout from "components/layout/AdminLayout";
import UserLayout from "components/layout/UserLayout";
import { ROUTES } from "constants/routerWeb";
import AdminCategory from "pages/Admin/Category";
import AdminDashboard from "pages/Admin/Dashboard";
import AdminLesson from "pages/Admin/Lesson";
import AdminQuestion from "pages/Admin/Question";
import AdminQuiz from "pages/Admin/Quiz";
import AdminTopic from "pages/Admin/Topic";
import AdminUsers from "pages/Admin/User";
import Quiz from "pages/Client/Quiz/Quiz";
import RankQuiz from "pages/Client/Quiz/RankQuiz";
import ResultQuiz from "pages/Client/Quiz/ResultQuiz";
import StartQuiz from "pages/Client/Quiz/StartQuiz";
import Lesson from "pages/Client/Topic/Lesson";
import Topic from "pages/Client/Topic/Topic";
import DetailUser from "pages/Client/User/DetailUser";
import HomePage from "pages/HomePage";
import Login from "pages/Login";
import PageNotFound from "pages/NotFoundPage";
import Register from "pages/Register";

export const EnumHome = {
  1: ROUTES.ADMIN_HOME_PAGE,
  2: ROUTES.ADMIN_HOME_PAGE,
  3: ROUTES.HOME_PAGE,
};

export const adminRoutes = [
  {
    path: ROUTES.ADMIN_HOME_PAGE,
    name: "Admin Layout",
    element: <AdminLayout />,
    children: [
      { isRoot: true, name: "Dashboard Page", element: <AdminDashboard /> },
      {
        path: ROUTES.ADMIN_DASHBOARD,
        name: "Dashboard Page",
        element: <AdminDashboard />,
      },
      { path: ROUTES.ADMIN_USER, name: "Users", element: <AdminUsers /> },
      { path: "*", name: "Not Found Page", element: <PageNotFound /> },
    ],
  },
];

export const managerRoutes = [
  {
    path: ROUTES.ADMIN_HOME_PAGE,
    name: "Admin Layout",
    element: <AdminLayout />,
    children: [
      { isRoot: true, name: "Topic", element: <AdminTopic /> },
      {
        path: ROUTES.ADMIN_TOPIC,
        name: "Topic",
        element: <AdminTopic />,
      },
      {
        path: ROUTES.ADMIN_CATEGORY,
        name: "Category",
        element: <AdminCategory />,
      },
      {
        path: ROUTES.ADMIN_LESSON,
        name: "Lesson",
        element: <AdminLesson />,
      },
      {
        path: ROUTES.ADMIN_QUESTION,
        name: "Question",
        element: <AdminQuestion />,
      },
      {
        path: ROUTES.ADMIN_QUIZ,
        name: "Quiz",
        element: <AdminQuiz />,
      },
      { path: "*", name: "Not Found Page", element: <PageNotFound /> },
    ],
  },
];

export const userRoutes = [
  {
    path: ROUTES.TOPIC,
    name: "Topic",
    element: <Topic />,
  },
  {
    path: ROUTES.LESSON,
    name: "Lesson",
    element: <Lesson />,
  },
  {
    path: ROUTES.QUIZ,
    name: "Quiz",
    element: <Quiz />,
  },
  {
    path: ROUTES.START_QUIZ,
    name: "StartQuiz",
    element: <StartQuiz />,
  },
  {
    path: ROUTES.RESULT_QUIZ,
    name: "ResultQuiz",
    element: <ResultQuiz />,
  },
  {
    path: ROUTES.USER_DETAIL,
    name: "UserDetail",
    element: <DetailUser />,
  },
  {
    path: ROUTES.RANK_QUIZ,
    name: "RankQuiz",
    element: <RankQuiz />,
  },
];

export const publicRoutes = [
  {
    path: ROUTES.HOME_PAGE,
    name: "User Layout",
    element: <UserLayout />,
    children: [
      { isRoot: true, name: "Login Page", element: <HomePage /> },
      ...userRoutes,
    ],
  },
  { path: ROUTES.LOGIN, name: "Login Page", element: <Login /> },
  { path: ROUTES.REGISTER, name: "Register Page", element: <Register /> },
  { path: "*", name: "Not Found Page", element: <PageNotFound /> },
];

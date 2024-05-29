/* quy phạm khai báo rootReducer */
import { combineReducers } from "redux";

import categoryReducer from "./Category/reducer";
import dashboardReducer from "./Dashboard/reducer";
import lessonReducer from "./Lesson/reducer";
import loginReducer from "./Login/reducer";
import questionReducer from "./Question/reducer";
import quizReducer from "./Quiz/reducer";
import toastReducer from "./Toast/reducer";
import topicReducer from "./Topic/reducer";
import userReducer from "./User/reducer";

const rootReducer = combineReducers({
  loginReducer,
  toastReducer,
  userReducer,
  topicReducer,
  categoryReducer,
  lessonReducer,
  questionReducer,
  quizReducer,
  dashboardReducer,
});

export default rootReducer;

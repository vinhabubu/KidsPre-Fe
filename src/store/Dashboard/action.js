import * as ActionTypes from "./constant";

export const actionDashboard = () => ({
  type: ActionTypes.DASHBOARD,
});

export const actionDashboardSuccess = (payload) => ({
  type: ActionTypes.DASHBOARD_SUCCESS,
  payload,
});

export const actionDashboardFailed = (error) => ({
  type: ActionTypes.DASHBOARD_FAILED,
  error,
});

export const actionStaticQuiz = () => ({
  type: ActionTypes.STATIC_QUIZ,
});

export const actionStaticQuizSuccess = (payload) => ({
  type: ActionTypes.STATIC_QUIZ_SUCCESS,
  payload,
});

export const actionStaticQuizFailed = (error) => ({
  type: ActionTypes.STATIC_QUIZ_FAILED,
  error,
});

export const actionStaticRank = () => ({
  type: ActionTypes.STATIC_RANK,
});

export const actionStaticRankSuccess = (payload) => ({
  type: ActionTypes.STATIC_RANK_SUCCESS,
  payload,
});

export const actionStaticRankFailed = (error) => ({
  type: ActionTypes.STATIC_RANK_FAILED,
  error,
});

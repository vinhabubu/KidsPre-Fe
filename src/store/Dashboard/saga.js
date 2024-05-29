import { ENDPOINT } from "constants/routerApi";
import { get } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import {
  actionDashboardFailed,
  actionDashboardSuccess,
  actionStaticQuizFailed,
  actionStaticQuizSuccess,
  actionStaticRankFailed,
  actionStaticRankSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiDashboard() {
  try {
    const response = yield call(get, ENDPOINT.DASHBOARD);

    if (response.status === 200) {
      yield put(actionDashboardSuccess(response.data));
    } else {
      yield put(actionDashboardFailed());
    }
  } catch (error) {
    yield put(actionDashboardFailed(error.response.data.error));
  }
}

function* callApiStaticQuiz() {
  try {
    const response = yield call(get, ENDPOINT.STATIC_QUIZ);

    if (response.status === 200) {
      yield put(actionStaticQuizSuccess(response.data.data));
    } else {
      yield put(actionStaticQuizFailed());
    }
  } catch (error) {
    yield put(actionStaticQuizFailed(error.response.data.error));
  }
}

function* callApiStaticRank() {
  try {
    const response = yield call(get, ENDPOINT.STATIC_RANK);

    if (response.status === 200) {
      yield put(actionStaticRankSuccess(response.data.data));
    } else {
      yield put(actionStaticRankFailed());
    }
  } catch (error) {
    yield put(actionStaticRankFailed(error.response.data.error));
  }
}

export default function* dashboardSaga() {
  yield all([
    yield takeLeading(ActionTypes.DASHBOARD, callApiDashboard),
    yield takeLeading(ActionTypes.STATIC_QUIZ, callApiStaticQuiz),
    yield takeLeading(ActionTypes.STATIC_RANK, callApiStaticRank),
  ]);
}

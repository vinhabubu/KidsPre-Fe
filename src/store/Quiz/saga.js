import { ENDPOINT } from "constants/routerApi";
import { get, post, put as puts, remove } from "helper/ajax";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import {
  actionAddFailed,
  actionAddSuccess,
  actionDeleteFailed,
  actionDeleteSuccess,
  actionDetailFailed,
  actionDetailSuccess,
  actionEditFailed,
  actionEditSuccess,
  actionGetListFailed,
  actionGetListSuccess,
  actionHistoryFailed,
  actionHistorySuccess,
  actionRankFailed,
  actionRankSuccess,
  actionSubmitFailed,
  actionSubmitSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiList({ params }) {
  try {
    const response = yield call(get, ENDPOINT.LIST_QUIZ, params);
    if (response.status === 200) {
      yield put(actionGetListSuccess(response.data));
    } else {
      yield put(actionGetListFailed());
    }
  } catch (error) {
    yield put(actionGetListFailed(error.response.data.error));
  }
}

function* callApiAdd({ params }) {
  try {
    const response = yield call(post, ENDPOINT.ADD_QUIZ, params);

    if (response.status === 200) {
      yield put(actionAddSuccess(response.data.data));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionAddFailed());
      yield put(
        addToast({
          text: "Add quiz failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionAddFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Add quiz failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiEdit({ params }) {
  try {
    const { id, name, idtopic, idcategory, idcreated, image, groupquestion } =
      params;
    const response = yield call(puts, ENDPOINT.EDIT_QUIZ + id, {
      name,
      idtopic,
      idcategory,
      idcreated,
      image,
      groupquestion,
    });

    if (response.status === 200) {
      yield put(actionEditSuccess(response.data.data));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionEditFailed());
      yield put(
        addToast({
          text: "Update quiz failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionEditFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update quiz failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiDelete({ id }) {
  try {
    const response = yield call(remove, ENDPOINT.DELETE_QUIZ + id);

    if (response.status === 200) {
      yield put(actionDeleteSuccess(id));
      yield put(
        addToast({
          text: response.data.message,
          type: "success",
          title: "",
        })
      );
    } else {
      yield put(actionDeleteFailed());
      yield put(
        addToast({
          text: "Delete quiz failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionDeleteFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Delete quiz failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiDetail({ id }) {
  try {
    const response = yield call(get, ENDPOINT.DETAIL_QUIZ + id);

    if (response.status === 200) {
      yield put(actionDetailSuccess(response.data.data));
    } else {
      yield put(actionDetailFailed());
    }
  } catch (error) {
    yield put(actionDetailFailed(error.response.data.error));
  }
}

function* callApiRankQuiz({ id }) {
  try {
    const response = yield call(get, ENDPOINT.RANK_QUIZ + id);

    if (response.status === 200) {
      yield put(actionRankSuccess(response.data.data));
    } else {
      yield put(actionRankFailed());
    }
  } catch (error) {
    yield put(actionRankFailed(error.response.data.error));
  }
}

function* callApiHistoryQuiz({ id }) {
  try {
    const response = yield call(get, ENDPOINT.HISTORY_QUIZ + id);

    if (response.status === 200) {
      yield put(actionHistorySuccess(response.data.data));
    } else {
      yield put(actionHistoryFailed());
    }
  } catch (error) {
    yield put(actionHistoryFailed(error.response.data.error));
  }
}

function* callApiSubmitQuiz({ params }) {
  try {
    const response = yield call(post, ENDPOINT.SUBMIT_QUIZ, params);

    if (response.status === 200) {
      yield put(actionSubmitSuccess(response.data.score));
      addToast({
        text: "Nạp bài thành công",
        type: "success",
        title: "",
      });
    } else {
      yield put(actionSubmitFailed());
      addToast({
        text: "Nạp bài thất bại",
        type: "danger",
        title: "",
      });
    }
  } catch (error) {
    yield put(actionDetailFailed(error.response.data.error));
  }
}

export default function* quizSaga() {
  yield all([
    yield takeLeading(ActionTypes.LIST, callApiList),
    yield takeLatest(ActionTypes.ADD, callApiAdd),
    yield takeLatest(ActionTypes.EDIT, callApiEdit),
    yield takeLatest(ActionTypes.DELETE, callApiDelete),
    yield takeLatest(ActionTypes.DETAIL, callApiDetail),
    yield takeLatest(ActionTypes.SUBMIT, callApiSubmitQuiz),
    yield takeLatest(ActionTypes.RANK, callApiRankQuiz),
    yield takeLatest(ActionTypes.HISTORY, callApiHistoryQuiz),
  ]);
}

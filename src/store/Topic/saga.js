import { ENDPOINT } from "constants/routerApi";
import { get, post, put as puts, remove } from "helper/ajax";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import {
  actionAddFailed,
  actionAddSuccess,
  actionDeleteFailed,
  actionDeleteSuccess,
  actionEditFailed,
  actionEditSuccess,
  actionGetListFailed,
  actionGetListSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiList({ params }) {
  try {
    const response = yield call(get, ENDPOINT.LIST_TOPIC, params);
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
    const response = yield call(post, ENDPOINT.ADD_TOPIC, params);

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
          text: "Add topic failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionAddFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Add topic failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiEdit({ params }) {
  try {
    const { id, name, image, video, description, nameessay, contentessay } =
      params;
    const response = yield call(puts, ENDPOINT.EDIT_TOPIC + id, {
      name,
      image,
      video,
      description,
      nameessay,
      contentessay,
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
          text: "Update topic failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionEditFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update topic failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiDelete({ id }) {
  try {
    const response = yield call(remove, ENDPOINT.DELETE_TOPIC + id);

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
          text: "Update topic failed",
          type: "danger",
          title: "",
        })
      );
    }
  } catch (error) {
    yield put(actionDeleteFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update topic failed",
        type: "danger",
        title: "",
      })
    );
  }
}

export default function* topicSaga() {
  yield all([
    yield takeLeading(ActionTypes.LIST, callApiList),
    yield takeLatest(ActionTypes.ADD, callApiAdd),
    yield takeLatest(ActionTypes.EDIT, callApiEdit),
    yield takeLatest(ActionTypes.DELETE, callApiDelete),
  ]);
}

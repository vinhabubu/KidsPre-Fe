import produce from "immer";
import * as ActionTypes from "./constant";
// DEFAULT STATE
const status = { isLoading: false, isSuccess: false, isFailure: false };
const initialState = {
  listStatus: { ...status, isLoadmore: false },
  actionStatus: { ...status },
  rankStatus: { ...status },
  historyStatus: { ...status },
  submitStatus: { ...status },
  list: [],
  rank: [],
  history: [],
  detail: {},
  params: { limit: 10, page: 1 },
  meta: {
    total: 0,
  },
  result: {},
};

const quizReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.LIST:
        draft.listStatus.isLoading = true;
        draft.listStatus.isSuccess = false;
        draft.listStatus.isFailure = false;
        if (action.isLoadmore) {
          draft.listStatus.isLoadmore = true;
        }
        draft.params = action.params;
        break;

      case ActionTypes.LIST_SUCCESS:
        draft.listStatus.isLoading = false;
        draft.listStatus.isSuccess = true;
        draft.list = action.payload.data;
        draft.meta.total = action.payload.total;
        if (state.listStatus.isLoadmore) {
          draft.listStatus.isLoadmore = false;
          draft.list = [...state.list, ...action.payload.data];
        } else {
          draft.list = action.payload.data;
        }
        break;

      case ActionTypes.LIST_FAILED:
        draft.listStatus.isLoading = false;
        draft.listStatus.isFailure = true;
        draft.listStatus.isLoadmore = false;
        draft.list = [];
        break;

      case ActionTypes.ADD:
        draft.actionStatus.isLoading = true;
        draft.actionStatus.isSuccess = false;
        draft.actionStatus.isFailure = false;
        break;

      case ActionTypes.ADD_SUCCESS:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isSuccess = true;
        draft.list = [action.payload, ...state.list];
        break;

      case ActionTypes.ADD_FAILED:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isFailure = true;
        break;

      case ActionTypes.EDIT:
        draft.actionStatus.isLoading = true;
        draft.actionStatus.isSuccess = false;
        draft.actionStatus.isFailure = false;
        break;

      case ActionTypes.EDIT_SUCCESS:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isSuccess = true;
        draft.list = state.list.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        break;

      case ActionTypes.EDIT_FAILED:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isFailure = true;
        break;

      case ActionTypes.DELETE:
        draft.actionStatus.isLoading = true;
        draft.actionStatus.isSuccess = false;
        draft.actionStatus.isFailure = false;
        break;

      case ActionTypes.DELETE_SUCCESS:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isSuccess = true;
        draft.list = state.list.filter((item) => item.id !== action.id);
        break;

      case ActionTypes.DELETE_FAILED:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isFailure = true;
        break;

      case ActionTypes.DETAIL:
        draft.actionStatus.isLoading = true;
        draft.actionStatus.isSuccess = false;
        draft.actionStatus.isFailure = false;
        break;

      case ActionTypes.DETAIL_SUCCESS:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isSuccess = true;
        draft.detail = action.payload;
        break;

      case ActionTypes.DETAIL_FAILED:
        draft.actionStatus.isLoading = false;
        draft.actionStatus.isFailure = true;
        break;

      case ActionTypes.SUBMIT:
        draft.submitStatus.isLoading = true;
        draft.submitStatus.isSuccess = false;
        draft.submitStatus.isFailure = false;
        break;

      case ActionTypes.SUBMIT_SUCCESS:
        draft.submitStatus.isLoading = false;
        draft.submitStatus.isSuccess = true;
        draft.result = action.payload;
        break;

      case ActionTypes.SUBMIT_FAILED:
        draft.submitStatus.isLoading = false;
        draft.submitStatus.isFailure = true;
        break;

      case ActionTypes.RANK:
        draft.rankStatus.isLoading = true;
        draft.rankStatus.isSuccess = false;
        draft.rankStatus.isFailure = false;
        break;

      case ActionTypes.RANK_SUCCESS:
        draft.rankStatus.isLoading = false;
        draft.rankStatus.isSuccess = true;
        draft.rank = action.payload;
        break;

      case ActionTypes.RANK_FAILED:
        draft.rankStatus.isLoading = false;
        draft.rankStatus.isFailure = true;
        break;

      case ActionTypes.HISTORY:
        draft.historyStatus.isLoading = true;
        draft.historyStatus.isSuccess = false;
        draft.historyStatus.isFailure = false;
        break;

      case ActionTypes.HISTORY_SUCCESS:
        draft.historyStatus.isLoading = false;
        draft.historyStatus.isSuccess = true;
        draft.history = action.payload;
        break;

      case ActionTypes.HISTORY_FAILED:
        draft.historyStatus.isLoading = false;
        draft.historyStatus.isFailure = true;
        break;

      case ActionTypes.RESET_SUBMIT:
        draft.submitStatus = { ...status };
        draft.result = {};
        break;

      case ActionTypes.RESET_DATA:
        return initialState;

      default:
        return state;
    }
  });
};

export default quizReducer;

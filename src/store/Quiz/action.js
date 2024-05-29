import * as ActionTypes from "./constant";

export const actionGetList = (params, isLoadmore = false) => ({
  type: ActionTypes.LIST,
  params,
  isLoadmore,
});

export const actionGetListSuccess = (payload) => ({
  type: ActionTypes.LIST_SUCCESS,
  payload,
});

export const actionGetListFailed = (error) => ({
  type: ActionTypes.LIST_FAILED,
  error,
});

export const actionAdd = (params) => ({
  type: ActionTypes.ADD,
  params,
});

export const actionAddSuccess = (payload) => ({
  type: ActionTypes.ADD_SUCCESS,
  payload,
});

export const actionAddFailed = (error) => ({
  type: ActionTypes.ADD_FAILED,
  error,
});

export const actionEdit = (params) => ({
  type: ActionTypes.EDIT,
  params,
});

export const actionEditSuccess = (payload) => ({
  type: ActionTypes.EDIT_SUCCESS,
  payload,
});

export const actionEditFailed = (error) => ({
  type: ActionTypes.EDIT_FAILED,
  error,
});

export const actionDelete = (id) => ({
  type: ActionTypes.DELETE,
  id,
});

export const actionDeleteSuccess = (id) => ({
  type: ActionTypes.DELETE_SUCCESS,
  id,
});

export const actionDeleteFailed = (error) => ({
  type: ActionTypes.DELETE_FAILED,
  error,
});

export const actionDetail = (id) => ({
  type: ActionTypes.DETAIL,
  id,
});

export const actionDetailSuccess = (payload) => ({
  type: ActionTypes.DETAIL_SUCCESS,
  payload,
});

export const actionDetailFailed = (error) => ({
  type: ActionTypes.DETAIL_FAILED,
  error,
});

export const actionSubmit = (params) => ({
  type: ActionTypes.SUBMIT,
  params,
});

export const actionSubmitSuccess = (payload) => ({
  type: ActionTypes.SUBMIT_SUCCESS,
  payload,
});

export const actionSubmitFailed = (error) => ({
  type: ActionTypes.SUBMIT_FAILED,
  error,
});

export const actionRank = (id) => ({
  type: ActionTypes.RANK,
  id,
});

export const actionRankSuccess = (payload) => ({
  type: ActionTypes.RANK_SUCCESS,
  payload,
});

export const actionRankFailed = (error) => ({
  type: ActionTypes.RANK_FAILED,
  error,
});

export const actionHistory = (id) => ({
  type: ActionTypes.HISTORY,
  id,
});

export const actionHistorySuccess = (payload) => ({
  type: ActionTypes.HISTORY_SUCCESS,
  payload,
});

export const actionHistoryFailed = (error) => ({
  type: ActionTypes.HISTORY_FAILED,
  error,
});

export const resetData = () => ({
  type: ActionTypes.RESET_DATA,
});

export const resetSubmit = () => ({
  type: ActionTypes.RESET_SUBMIT,
});

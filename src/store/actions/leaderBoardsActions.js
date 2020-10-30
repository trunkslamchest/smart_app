import * as actionTypes from './actionTypes'

import leaderBoardsFunctions from '../../utility/leaderBoardsFunctions'
import { fetch } from '../../utility/paths'

export const getOverallLeaderBoards = () => {
  return dispatch => {
    console.log('test')
    leaderBoardsFunctions('getOverallLeaderBoards', fetch.get.overallLeaderBoards)
    .then(res => {
      // dispatch(updateLeaderBoardsStatus("fetchOverallLeaderBoardsSuccess"))
      dispatch(setOverallLeaderBoards(res))
    })
  }
}

const setOverallLeaderBoards = (res) => {
  return {
    type: actionTypes.GET_OVERALL_LEADERBOARDS,
    overall: res
  }
}

export const getCatLeaderBoards = () => {
  return dispatch => {
    leaderBoardsFunctions('getCatLeaderBoards', fetch.get.catLeaderBoards)
    .then(res => {
      // dispatch(updateLeaderBoardsStatus("fetchCatLeaderBoardsSuccess"))
      dispatch(setCatLeaderBoards(res))
    })
  }
}

const setCatLeaderBoards = (res) => {
  return {
    type: actionTypes.GET_CAT_LEADERBOARDS,
    cat: res
  }
}

export const clearLeaderBoards = () => {
  return {
    type: actionTypes.CLEAR_LEADERBOARDS,
    overall: null,
    cat: null,
  }
}

export const updateLeaderBoardsStatus = (status) => {
  return {
    type: actionTypes.UPDATE_LEADERBOARDS_STATUS,
    status: status
  }
}
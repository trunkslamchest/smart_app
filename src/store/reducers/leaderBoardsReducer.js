import * as actionTypes from '../actions/actionTypes'

const initialState = {
  overall: null,
  cat: null,
  status: null,
  loading: false
}

const getOverallLeaderBoards = (currentState, action) => {
  return {
    ...currentState,
    overall: action.overall
  }
}

const getCatLeaderBoards = (currentState, action) => {
  return {
    ...currentState,
    cat: action.cat
  }
}

const clearLeaderBoards = (currentState, action) => {
  return {
    ...currentState,
    overall: action.overall,
    cat: action.cat
  }
}

const updateLeaderBoardsStatus = (currentState, action) => {
  return {
    ...currentState,
    status: action.status
  }
}

const updateLeaderBoardsLoadingStatus = (currentState, action) => {
  return {
    ...currentState,
    loading: action.loading
  }
}

const leaderBoardsReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case(actionTypes.GET_OVERALL_LEADERBOARDS): return getOverallLeaderBoards(currentState, action)
    case(actionTypes.GET_CAT_LEADERBOARDS): return getCatLeaderBoards(currentState, action)
    case(actionTypes.CLEAR_LEADERBOARDS): return clearLeaderBoards(currentState, action)
    case(actionTypes.UPDATE_LEADERBOARDS_STATUS): return updateLeaderBoardsStatus(currentState, action)
    case(actionTypes.UPDATE_LEADERBOARDS_LOADING_STATUS): return updateLeaderBoardsLoadingStatus(currentState, action)
    default: return currentState
  }
}

export default leaderBoardsReducer
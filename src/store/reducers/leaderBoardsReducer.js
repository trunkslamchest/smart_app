import * as actionTypes from '../actions/actionTypes'

const initialState = {
  overall: null,
  cat: null,
  status: null
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
  console.log(action)

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

const leaderBoardsReducer = (currentState, action) => {
  switch(action.type) {
    case(actionTypes.GET_OVERALL_LEADERBOARDS): return getOverallLeaderBoards(currentState, action)
    case(actionTypes.GET_CAT_LEADERBOARDS): return getCatLeaderBoards(currentState, action)
    case(actionTypes.CLEAR_LEADERBOARDS): return clearLeaderBoards(currentState, action)
    case(actionTypes.UPDATE_LEADERBOARDS_STATUS): return updateLeaderBoardsStatus(currentState, action)
    default: return initialState
  }
}

export default leaderBoardsReducer
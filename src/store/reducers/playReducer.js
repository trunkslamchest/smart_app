import * as actionTypes from '../actions/actionTypes'

const initialState = {
  gameMode: null
}

const setGameMode = (currentState, action) => {
  return {
    ...currentState,
    gameMode: action.gameMode
  }
}

const resetGameMode = (currentState, action) => {
  return {
    ...currentState,
    gameMode: null
  }
}

const playReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GAME_MODE: return setGameMode(currentState, action)
    case actionTypes.RESET_GAME_MODE: return resetGameMode(currentState, action)
    default: return currentState
  }
}

export default playReducer
import * as actionTypes from './actionTypes'

export const setGameMode = (mode) => {
  return {
    type: actionTypes.SET_GAME_MODE,
    gameMode: mode
  }
}

export const resetGameMode = () => {
  return {
    type: actionTypes.RESET_GAME_MODE,
    gameMode: null
  }
}
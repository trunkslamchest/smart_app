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

export const setQuestion = (question) => {
  return {
    type: actionTypes.SET_QUESTION,
    question: question
  }
}

export const resetQuestion = () => {
  return {
    type: actionTypes.RESET_QUESTION,
    question: null
  }
}

export const setGameState = (gameState) => {
  return {
    type: actionTypes.SET_GAME_STATE,
    gameState: gameState
  }
}

export const resetGameState = () => {
  return {
    type: actionTypes.RESET_GAME_STATE,
    gameState: null
  }
}

export const setAnswer = (answer) => {
  return {
    type: actionTypes.SET_ANSWER,
    answer: answer
  }
}

export const resetAnswer = () => {
  return {
    type: actionTypes.RESET_ANSWER ,
    answer: null
  }
}

export const getAnswerResults = (results) => {
  return {
    type: actionTypes.GET_ANSWER_RESULTS,
    results: results
  }
}
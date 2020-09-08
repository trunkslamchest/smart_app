import * as actionTypes from '../actions/actionTypes'

const initialState = {
  gameMode: null,
  gameState: null,
  question: null,
  answer: null,
  results: null
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

const setQuestion = (currentState, action) => {
  return {
    ...currentState,
    question: action.question
  }
}

const resetQuestion = (currentState, action) => {
  return {
    ...currentState,
    question: null
  }
}

const setGameState = (currentState, action) => {
  return {
    ...currentState,
    gameState: action.gameState
  }
}

const resetGameState = (currentState, action) => {
  return {
    ...currentState,
    gameState: null
  }
}

const setAnswer = (currentState, action) => {
  return {
    ...currentState,
    answer: action.answer
  }
}

const resetAnswer = (currentState, action) => {
  return {
    ...currentState,
    answer: null
  }
}

const getAnswerResults = (currentState, action) => {
  return {
    ...currentState,
    results: action.results
  }
}

const playReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GAME_MODE: return setGameMode(currentState, action)
    case actionTypes.RESET_GAME_MODE: return resetGameMode(currentState, action)
    case actionTypes.SET_QUESTION: return setQuestion(currentState, action)
    case actionTypes.RESET_QUESTION: return resetQuestion(currentState, action)
    case actionTypes.SET_GAME_STATE: return setGameState(currentState, action)
    case actionTypes.RESET_GAME_STATE: return resetGameState(currentState, action)
    case actionTypes.SET_ANSWER: return setAnswer(currentState, action)
    case actionTypes.RESET_ANSWER: return resetAnswer(currentState, action)
    case actionTypes.GET_ANSWER_RESULTS: return getAnswerResults(currentState, action)
    default: return currentState
  }
}

export default playReducer
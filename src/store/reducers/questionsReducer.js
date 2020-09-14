import * as actionTypes from '../actions/actionTypes'

const initialState = {
  questions: null,
  question: {},
  totals: null
}

const storeQuestionTotals = (currentState, action) => {
  return {
    ...currentState,
    totals: action.totals,
  }
}

const getQuestionTotals = (currentState, action) => {
  return {
    ...currentState,
    totals: null,
  }
}

const clearQuestionTotals = (currentState, action) => {
  return {
    ...currentState,
    totals: action.totals,
  }
}

const getQuickQuestion = (currentState, action) => {
  return {
    ...currentState,
    question: action.question
  }
}

const getDiffQuestion = (currentState, action) => {
  return {
    ...currentState,
    question: action.question
  }
}

const getCatQuestion = (currentState, action) => {
  return {
    ...currentState,
    question: action.question
  }
}

export const questionsReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_QUESTION_TOTALS: return getQuestionTotals(currentState, action)
    case actionTypes.STORE_QUESTION_TOTALS: return storeQuestionTotals(currentState, action)
    case actionTypes.CLEAR_QUESTION_TOTALS: return clearQuestionTotals(currentState, action)
    case actionTypes.GET_QUICK_QUESTION: return getQuickQuestion(currentState, action)
    case actionTypes.GET_DIFF_QUESTION: return getDiffQuestion(currentState, action)
    case actionTypes.GET_CAT_QUESTION: return getCatQuestion(currentState, action)

    default: return currentState
  }
}

export default questionsReducer
import * as actionTypes from '../actions/actionTypes'

const initialState = {
  questions: null,
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

export const questionsReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_QUESTION_TOTALS: return getQuestionTotals(currentState, action)
    case actionTypes.STORE_QUESTION_TOTALS: return storeQuestionTotals(currentState, action)

    default: return currentState
  }
}

export default questionsReducer
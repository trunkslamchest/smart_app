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

const updateQuestionTotalsFromPlayController = (currentState, action) => {
  let uTotals = currentState.totals

  console.log(uTotals, action.result)

  if(action.result.result === 'Correct') {
    uTotals.difficulty[action.result.difficulty].correct += 1
    uTotals.category[action.result.category].correct += 1
    uTotals.all.correct += 1
  }

  if(action.result.result === 'Incorrect') {
    uTotals.difficulty[action.result.difficulty].incorrect += 1
    uTotals.category[action.result.category].incorrect += 1
    uTotals.all.incorrect += 1
  }

  uTotals.difficulty[action.result.difficulty].answers += 1
  uTotals.category[action.result.category].answers += 1
  uTotals.all.answers += 1

  return {
    ...currentState,
    totals: uTotals
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
    case actionTypes.UPDATE_QUESTION_TOTALS_FROM_PLAY_CONTROLLER: return updateQuestionTotalsFromPlayController(currentState, action)
    case actionTypes.GET_QUICK_QUESTION: return getQuickQuestion(currentState, action)
    case actionTypes.GET_DIFF_QUESTION: return getDiffQuestion(currentState, action)
    case actionTypes.GET_CAT_QUESTION: return getCatQuestion(currentState, action)

    default: return currentState
  }
}

export default questionsReducer
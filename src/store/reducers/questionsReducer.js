import * as actionTypes from '../actions/actionTypes'

const initialState = {
  questions: null,
  question: {},
  totals: null
}

const storeQuestionTotals = (currentState, action) => { return { ...currentState, totals: action.totals, } }

const getQuestionTotals = (currentState, action) => { return { ...currentState, totals: null, } }

const clearQuestionTotals = (currentState, action) => { return { ...currentState, totals: action.totals, } }

const updateQuestionTotalsFromPlayController = (currentState, action) => {
  let uTotals = { ...currentState.totals }

  uTotals.all.totals.answers += 1
  uTotals.difficulty[action.result.difficulty].totals.answers += 1
  uTotals.category[action.result.category].totals.answers += 1

  if(action.result.result === 'Correct') {
    uTotals.all.totals.correct += 1
    uTotals.difficulty[action.result.difficulty].totals.correct += 1
    uTotals.category[action.result.category].totals.correct += 1
  }

  if(action.result.result === 'Incorrect') {
    uTotals.all.totals.incorrect += 1
    uTotals.difficulty[action.result.difficulty].totals.incorrect += 1
    uTotals.category[action.result.category].totals.incorrect += 1
  }

  if(action.result.result === 'Outta Time') {
    uTotals.all.totals.outta_time += 1
    uTotals.difficulty[action.result.difficulty].totals.outta_time += 1
    uTotals.category[action.result.category].totals.outta_time += 1
  }

  uTotals.all.totals.total_time = uTotals.all.totals.total_time + action.result.time
  uTotals.difficulty[action.result.difficulty].totals.total_time = uTotals.difficulty[action.result.difficulty].totals.total_time + action.result.time
  uTotals.category[action.result.category].totals.total_time = uTotals.category[action.result.category].totals.total_time + action.result.time

  uTotals.all.averages.questions.avgTime = uTotals.all.totals.total_time / uTotals.all.totals.answers
  uTotals.difficulty[action.result.difficulty].averages.questions.avgTime = uTotals.difficulty[action.result.difficulty].totals.total_time / uTotals.difficulty[action.result.difficulty].totals.answers
  uTotals.category[action.result.category].averages.questions.avgTime = uTotals.category[action.result.category].totals.total_time / uTotals.category[action.result.category].totals.answers

  uTotals.all.averages.questions.correct = (uTotals.all.totals.correct / uTotals.all.totals.answers) * 100
  uTotals.difficulty[action.result.difficulty].averages.questions.correct = (uTotals.difficulty[action.result.difficulty].totals.correct / uTotals.difficulty[action.result.difficulty].totals.answers) * 100
  uTotals.category[action.result.category].averages.questions.correct = (uTotals.category[action.result.category].totals.correct / uTotals.category[action.result.category].totals.answers) * 100

  uTotals.all.averages.questions.incorrect = (uTotals.all.totals.incorrect / uTotals.all.totals.answers) * 100
  uTotals.difficulty[action.result.difficulty].averages.questions.incorrect = (uTotals.difficulty[action.result.difficulty].totals.incorrect / uTotals.difficulty[action.result.difficulty].totals.answers) * 100
  uTotals.category[action.result.category].averages.questions.incorrect = (uTotals.category[action.result.category].totals.incorrect / uTotals.category[action.result.category].totals.answers) * 100

  uTotals.all.averages.questions.outtaTime = (uTotals.all.totals.outta_time / uTotals.all.totals.answers) * 100
  uTotals.difficulty[action.result.difficulty].averages.questions.outtaTime = (uTotals.difficulty[action.result.difficulty].totals.outta_time / uTotals.difficulty[action.result.difficulty].totals.answers) * 100
  uTotals.category[action.result.category].averages.questions.outtaTime = (uTotals.category[action.result.category].totals.outta_time / uTotals.category[action.result.category].totals.answers) * 100

  return { ...currentState, totals: uTotals }
}

const getQuickQuestion = (currentState, action) => { return { ...currentState, question: action.question } }

const getDiffQuestion = (currentState, action) => { return { ...currentState, question: action.question } }

const getCatQuestion = (currentState, action) => { return { ...currentState, question: action.question } }

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
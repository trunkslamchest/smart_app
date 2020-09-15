import * as actionTypes from '../actions/actionTypes'

const initialState = {
  info: null,
  questions: null
}

const storeUserInfo = (currentState, action) => {
  return {
    ...currentState,
    info: action.info
  }
}

const storeUserQuestions = (currentState, action) => {
  return {
    ...currentState,
    questions: action.questions
  }
}

const clearUserInfo = (currentState, action) => {
  return {
    ...currentState,
    info: action.info
  }
}

const clearUserQuestions = (currentState, action) => {
  return {
    ...currentState,
    questions: action.questions
  }
}

const updateUserInfo = (currentState, action) => {
  return{
    ...currentState,
    info: action.info
  }
}

const updateUserQuestions = (currentState, action) => {
  return{
    ...currentState,
    questions: action.questions
  }
}

const updateUserQuestionIdsFromPlayController = (currentState, action) => {
  let qIds

  if(currentState.questions.ids) qIds = [ ...currentState.questions.ids, action.ids ]
  if(!currentState.questions.ids) qIds = [ action.ids ]

  return{
    ...currentState,
    questions: { ...currentState.questions, ids: qIds }
  }
}

const updateUserQuestionsFromPlayController = (currentState, action) => {
  let questions = currentState.questions

  if(!questions[action.question.difficulty]) {
    questions[action.question.difficulty] = {
      'categories': {
        [action.question.category]: {
          [action.question.qid]: {
            answer: action.question.answer.choice,
            correct_answer: action.question.results.correct_answer,
            question: action.question.question,
            result: action.question.results.result,
            time: action.question.answer.time
          }
        }
      }
    }
  } else if(!questions[action.question.difficulty].categories[action.question.category]) {
    questions[action.question.difficulty].categories[action.question.category] = {
      [action.question.qid]: {
        answer: action.question.answer.choice,
        correct_answer: action.question.results.correct_answer,
        question: action.question.question,
        result: action.question.results.result,
        time: action.question.answer.time
      }
    }
  } else {
    questions[action.question.difficulty].categories[action.question.category][action.question.qid] = {
      answer: action.question.answer.choice,
      correct_answer: action.question.results.correct_answer,
      question: action.question.question,
      result: action.question.results.result,
      time: action.question.answer.time
    }
  }

  return{
    ...currentState,
    questions: questions
  }
}

const updateUserQuestionTotalsFromPlayController = (currentState, action) => {
  let totals = currentState.questions.totals
  // console.log(currentState, action.obj)

  // if(totals.all.avg_time === 0) totals.all.avg_time = action.totals.answer.time
  // else totals.all.avg_time = ((totals.all.avg_time + action.totals.answer.time) / 2.00) * 100

  // totals.all = totals.all + 1

  // console.log(totals)
  // console.log((totals.all.avg_time + parseFloat(action.totals.answer.time)))
  return {
    ...currentState,

  }
}

const deleteUser = (currentState, action) => {
  return{
    ...currentState,
    info: action.info,
    questions: action.questions
  }
}

const userReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.STORE_USER_INFO: return storeUserInfo(currentState, action)
    case actionTypes.STORE_USER_QUESTIONS: return storeUserQuestions(currentState, action)
    case actionTypes.CLEAR_USER_INFO: return clearUserInfo(currentState, action)
    case actionTypes.CLEAR_USER_QUESTIONS: return clearUserQuestions(currentState, action)
    case actionTypes.UPDATE_USER_INFO: return updateUserInfo(currentState, action)
    case actionTypes.UPDATE_USER_QUESTIONS: return updateUserQuestions(currentState, action)
    case actionTypes.UPDATE_USER_QUESTIONIDS_FROM_PLAY_CONTROLLER: return updateUserQuestionIdsFromPlayController(currentState, action)
    case actionTypes.UPDATE_USER_QUESTIONS_FROM_PLAY_CONTROLLER: return updateUserQuestionsFromPlayController(currentState, action)
    case actionTypes.UPDATE_USER_QUESTION_TOTALS_FROM_PLAY_CONTROLLER: return updateUserQuestionTotalsFromPlayController(currentState, action)
    case actionTypes.DELETE_USER: return deleteUser(currentState, action)
    default: return currentState
  }
}

export default userReducer
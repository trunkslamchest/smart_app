import * as actionTypes from './actionTypes'

export const storeUserInfo = (info) => {
  return {
    type: actionTypes.STORE_USER_INFO,
    info: info
  }
}

export const storeUserQuestions = (questions) => {
  return {
    type: actionTypes.STORE_USER_QUESTIONS,
    questions: questions
  }
}
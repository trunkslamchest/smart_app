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

export const clearUserInfo = () => {
  return {
    type: actionTypes.CLEAR_USER_INFO,
    info: null
  }
}

export const clearUserQuestions = () => {
  return {
    type: actionTypes.CLEAR_USER_QUESTIONS,
    questions: null
  }
}
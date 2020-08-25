import * as actionTypes from './actionTypes'

import { fetch } from '../../utility/paths'
import userFunctions from '../../utility/userFunctions'

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

export const updateUserInfo = (obj, props) => {
  return dispatch => {
    userFunctions('patch', fetch.patch.user, obj)
    .then(res => {
      dispatch(storeUserInfo(obj.info))
    })
  }
}
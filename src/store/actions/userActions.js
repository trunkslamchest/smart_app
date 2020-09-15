import * as actionTypes from './actionTypes'
// import { authLogOut } from './authActions'
import { routes, fetch } from '../../utility/paths'
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
      if(res) {
        dispatch(storeUserInfo(obj.info))
        props.history.push( routes.dashboard_profile )
      }
    })
  }
}

export const updateUserQuestions = () => {
  return dispatch => {
  if(localStorage.id) {
      userFunctions('getUser', fetch.get.user, localStorage.id)
      .then(userRes => {
        dispatch(storeUserQuestions(userRes.questions))
      })
    }
  }
}

export const updateUserQuestionIdsFromPlayController = (ids) => {
  return {
    type: actionTypes.UPDATE_USER_QUESTIONIDS_FROM_PLAY_CONTROLLER,
    ids: ids
  }
}

export const updateUserQuestionsFromPlayController = (question) => {
  return {
    type: actionTypes.UPDATE_USER_QUESTIONS_FROM_PLAY_CONTROLLER,
    question: question
  }
}

export const updateUserQuestionTotalsFromPlayController = (obj) => {
  return {
    type: actionTypes.UPDATE_USER_QUESTION_TOTALS_FROM_PLAY_CONTROLLER,
    totals: obj
  }
}


export const deleteUser = (obj, props) => {
  return dispatch => {
    userFunctions('delete', fetch.delete.user, obj)
    .then(res => {
      console.log(res)
      // if(res) dispatch(authLogOut(props))
    })
  }
}
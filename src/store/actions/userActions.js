import * as actionTypes from './actionTypes'
import { fetch } from '../../utility/paths'

import {
  authUpdateStatus
} from './authActions'

import {
  updateVoteStatus,
  updateCommentStatus
} from './playActions'

import userFunctions from '../../utility/userFunctions'

export const storeUserInfo = (info) => {
  return dispatch => {
    dispatch(authUpdateStatus('storeUserInfo', true))
    dispatch(initStoreUserInfo(info))
  }
}

export const initStoreUserInfo = (info) => {
  return {
    type: actionTypes.STORE_USER_INFO,
    info: info
  }
}

export const storeUserQuestions = (questions) => {
  return dispatch => {
    dispatch(authUpdateStatus('storeUserQuestions', true))
    dispatch(initStoreUserQuestions(questions))
  }
}

export const initStoreUserQuestions = (questions) => {
  return {
    type: actionTypes.STORE_USER_QUESTIONS,
    questions: questions
  }
}

export const updateUserInfo = (authType, obj) => {
  return dispatch => {
    dispatch(authUpdateStatus('updateUserInfo', true))
    userFunctions('patch', fetch.patch.user, obj)
    .then(res => {
      if(res) {
        dispatch(authUpdateStatus('updateUserInfoSuccess', true))
        dispatch(storeUserInfo(obj.info))
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

export const clearUserInfo = () => {
  return dispatch => {
    dispatch(authUpdateStatus('clearUserInfo', true))
    dispatch(initClearUserInfo())
  }
}

const initClearUserInfo = () => {
  return {
    type: actionTypes.CLEAR_USER_INFO,
    info: null
  }
}

export const clearUserQuestions = () => {
  return dispatch => {
    dispatch(authUpdateStatus('clearUserQuestions', true))
    dispatch(initClearUserQuestions())
  }
}

const initClearUserQuestions = () => {
  return {
    type: actionTypes.CLEAR_USER_QUESTIONS,
    questions: null
  }
}

export const deleteUser = (id) => {
  return dispatch => {
    userFunctions('delete', fetch.delete.user, {uid: id})
    .then(res => {
      console.log(res)
      dispatch(authUpdateStatus('deleteLocalUserSuccess', true))
    })
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

export const updateUserQuestionTotalsFromPlayController = (result) => {
  return {
    type: actionTypes.UPDATE_USER_QUESTION_TOTALS_FROM_PLAY_CONTROLLER,
    result: result
  }
}

export const updateUserVotesFromPlayController = (id, vote) => {
  return dispatch => {
    dispatch(updateVoteStatus('voteSuccess', true))
    dispatch(initUpdateUserVotesFromPlayController(id, vote))
  }
}

const initUpdateUserVotesFromPlayController = (id, vote) => {
  return {
    type: actionTypes.UPDATE_USER_VOTES_FROM_PLAY_CONTROLLER,
    qid: id,
    vote: vote
  }
}

export const updateUserCommentsFromPlayController = (id, comment) => {
  return dispatch => {
    dispatch(updateCommentStatus('commentSuccess', true))
    dispatch(initUpdateUserCommentsFromPlayController(id, comment))
  }
}

export const initUpdateUserCommentsFromPlayController = (id, comment) => {
  return {
    type: actionTypes.UPDATE_USER_COMMENTS_FROM_PLAY_CONTROLLER,
    cid: id,
    comment: comment
  }
}
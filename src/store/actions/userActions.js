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
import questionsFunctions from '../../utility/questionsFunctions'


export const storeUserInfo = (info, experience, achievements, settings) => {
  return dispatch => {
    dispatch(authUpdateStatus('storeUserInfo', true))
    dispatch(initStoreUserInfo(info, experience, achievements, settings))
  }
}

export const initStoreUserInfo = (info, experience, achievements, settings) => {
  return { type: actionTypes.STORE_USER_INFO, info: info, experience: experience, achievements: achievements, settings: settings }
}

export const updateUserInfo = (authType, obj) => {
  return dispatch => {
    dispatch(authUpdateStatus('updateUserInfo', true))
    userFunctions('patch', fetch.patch.user, obj)
    .then((userRes) => {
      // if(userRes){
        dispatch(authUpdateStatus('updateUserInfoSuccess', true))
        dispatch(initUpdateUserInfo(obj.info))
      // }
    })
  }
}

const initUpdateUserInfo = (info) => {
  return {
    type: actionTypes.UPDATE_USER_INFO,
    info: info
  }
}

export const clearUserInfo = () => {
  return dispatch => {
    dispatch(authUpdateStatus('clearUserInfo', true))
    dispatch(initClearUserInfo())
  }
}

const initClearUserInfo = () => { return { type: actionTypes.CLEAR_USER_INFO, info: null } }

export const storeUserQuestions = (questions) => {
  return dispatch => {
    dispatch(authUpdateStatus('storeUserQuestions', true))
    dispatch(initStoreUserQuestions(questions))
  }
}

export const storeUserSettings = (settings) => {
  return dispatch => {
    // dispatch(authUpdateStatus('storeUserSettings', true))
    dispatch(initStoreUserSettings(settings))
  }
}

export const initStoreUserSettings = (settings) => {
  return { type: actionTypes.STORE_USER_SETTINGS, settings: settings }
}

export const updateUserSettings = (obj) => {
  return dispatch => {
    // dispatch(authUpdateStatus('updateUserSettings', true))
    userFunctions('patch', fetch.patch.userSettings, obj)
    .then((userRes) => {
      // if(userRes){
        // console.log(userRes)
        // dispatch(authUpdateStatus('updateUserSettingsSuccess', true))
        dispatch(storeUserSettings(userRes))
      // }
    })
  }
}

export const clearUserSettings = () => {
  return dispatch => {
    // dispatch(authUpdateStatus('clearUserSettings', true))
    dispatch(initClearUserSettings())
  }
}

const initClearUserSettings = () => { return { type: actionTypes.CLEAR_USER_SETTINGS, settings: null } }

export const initStoreUserQuestions = (questions) => { return { type: actionTypes.STORE_USER_QUESTIONS, questions: questions } }

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

export const clearUserQuestions = () => {
  return dispatch => {
    dispatch(authUpdateStatus('clearUserQuestions', true))
    dispatch(initClearUserQuestions())
  }
}

const initClearUserQuestions = () => { return { type: actionTypes.CLEAR_USER_QUESTIONS, questions: null } }

export const deleteUser = (id) => {
  return dispatch => {
    userFunctions('delete', fetch.delete.user, {uid: id})
    .then(res => {
      console.log(res)
      dispatch(authUpdateStatus('deleteLocalUserSuccess', true))
    })
  }
}

export const updateUserPerformanceFromPlayController = (res) => {
  return {
    type: actionTypes.UPDATE_USER_PERFORMANCE_FROM_PLAY_CONTROLLER,
    res: res
  }
}

export const updateUserExperienceFromPlayController = (xp) => {
  return {
    type: actionTypes.UPDATE_USER_EXPERIENCE_FROM_PLAY_CONTROLLER,
    total: xp
  }
}

export const updateUserAchievementsFromPlayController = (achievements) => {
  return {
    type: actionTypes.UPDATE_USER_ACHIEVEMENTS_FROM_PLAY_CONTROLLER,
    achievements: achievements
  }
}

export const updateUserQuestionIdsFromPlayController = (ids) => { return { type: actionTypes.UPDATE_USER_QUESTIONIDS_FROM_PLAY_CONTROLLER, ids: ids } }

export const updateUserQuestionsFromPlayController = (question) => {
  return {
    type: actionTypes.UPDATE_USER_QUESTIONS_FROM_PLAY_CONTROLLER,
    question: question
  }
}

export const updateUserQuestionTotalsFromPlayController = (result) => { return { type: actionTypes.UPDATE_USER_QUESTION_TOTALS_FROM_PLAY_CONTROLLER, result: result } }

export const updateUserVotesFromPlayController = (res) => {
  return dispatch => {
    dispatch(updateVoteStatus('voteSuccess', true))
    dispatch(initUpdateUserVotesFromPlayController(res))
  }
}

const initUpdateUserVotesFromPlayController = (res) => {
  return {
    type: actionTypes.UPDATE_USER_VOTES_FROM_PLAY_CONTROLLER,
    res: res
  }
}

export const updateUserCommentsFromPlayController = (id, comment) => {
  return dispatch => {
    dispatch(updateCommentStatus('commentSuccess', true))
    dispatch(initUpdateUserCommentsFromPlayController(id, comment))
  }
}

export const initUpdateUserCommentsFromPlayController = (res) => {
  return {
    type: actionTypes.UPDATE_USER_COMMENTS_FROM_PLAY_CONTROLLER,
    res: res
  }
}

export const deleteUserComment = (obj) => {
  return dispatch => {
    questionsFunctions('deleteQuestionComment', fetch.delete.questionComment, { cid: obj.cid, qid: obj.qid, difficulty: obj.difficulty, category: obj.category })
    .then(() => userFunctions('deleteUserComment', fetch.delete.userComment, { uid: obj.uid, qid: obj.qid, cid: obj.cid, difficulty: obj.difficulty, category: obj.category })
      .then(cRes => {
        dispatch(initDeleteUserComment(cRes))
      })
    )
  }
}

const initDeleteUserComment = (res) => { return { type: actionTypes.DELETE_USER_COMMENT, res: res } }

export const editUserComment = (obj) => {
  return dispatch => {
    questionsFunctions('editQuestionComment', fetch.patch.editQuestionComment, obj)
    .then((qRes) => {
      userFunctions('editUserComment', fetch.patch.editUserComment, { uid: qRes.uid, cid: qRes.cid, qid: qRes.qid, difficulty: qRes.difficulty, category: qRes.category, comment: qRes.comment })
      .then(cRes => {
        dispatch(initEditUserComment(cRes))
      })
    })
  }
}

const initEditUserComment = (res) => { return { type: actionTypes.EDIT_USER_COMMENT, res: res } }
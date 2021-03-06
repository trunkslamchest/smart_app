import * as actionTypes from './actionTypes'
import { fetch } from '../../utility/paths'

import {
  authUpdateStatus
} from './authActions'

import {
  updateVoteStatus,
  updateCommentStatus
} from './playActions'

import {
  updateStaticQuestionVoteStatus,
  updateStaticQuestionCommentStatus
} from './questionsActions'

import userFunctions from '../../utility/userFunctions'
import questionsFunctions from '../../utility/questionsFunctions'

export const storeUserInfo = (info, experience, achievements, settings) => {
  return {
    type: actionTypes.STORE_USER_INFO,
    info: info, experience: experience,
    achievements: achievements,
    settings: settings
  }
}

export const updateUserInfo = (authType, obj) => {
  return dispatch => {
    userFunctions('patch', fetch.patch.user, obj)
    .then((res) => {
      dispatch(initUpdateUserInfo(obj.info))
      dispatch(authUpdateStatus('updateUserSuccess', true))
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
  return {
    type: actionTypes.CLEAR_USER_INFO,
    info: null,
    experience: null,
    achievements: null
  }
}

export const storeUserQuestions = (questions) => {
  return {
    type: actionTypes.STORE_USER_QUESTIONS,
    questions: questions
  }
}

export const storeUserSettings = (settings) => {
  return {
    type: actionTypes.STORE_USER_SETTINGS,
    settings: settings
  }
}

export const updateUserSettings = (obj) => {
  return dispatch => {
    userFunctions('patch', fetch.patch.userSettings, obj)
    .then((userRes) => {
      dispatch(storeUserSettings(userRes))
    })
  }
}

export const clearUserSettings = () => {
  return {
    type: actionTypes.CLEAR_USER_SETTINGS,
    settings: null
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

export const clearUserQuestions = () => {
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

export const updateUserLoginTime = (obj) => {
  return dispatch => {
    userFunctions('patchUserLoginTime', fetch.patch.userLoginTime, obj)
    .then(res => {
      if(!!res.error) console.log(res.error)
      else {
        dispatch(initUpdateUserLoginTime({
          time: res.time,
          day: res.day,
          month: res.month, year: res.year
        }))
      }
    })
  }
}

const initUpdateUserLoginTime = (time) => {
  return {
    type: actionTypes.UPDATE_USER_LOGIN_TIME,
    login_time: time
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

export const updateUserQuestionIdsFromPlayController = (ids) => {
  return {
    type: actionTypes.UPDATE_USER_QUESTIONIDS_FROM_PLAY_CONTROLLER,
    ids: ids
  }
}

export const updateUserQuestionsFromPlayController = (qid, question) => {
  return {
    type: actionTypes.UPDATE_USER_QUESTIONS_FROM_PLAY_CONTROLLER,
    qid: qid,
    question: question
  }
}

export const updateUserQuestionTotalsFromPlayController = (userTotals) => {
  return {
    type: actionTypes.UPDATE_USER_QUESTION_TOTALS_FROM_PLAY_CONTROLLER,
    userTotals: userTotals
  }
}

export const updateUserVotesFromPlayController = (vote) => {
  return dispatch => {
    dispatch(initUpdateUserVotesFromPlayController(vote))
    if(vote.type === 'play') dispatch(updateVoteStatus('voteSuccess', true))
    if(vote.type === 'static') dispatch(updateStaticQuestionVoteStatus('voteSuccess', true))
  }
}

const initUpdateUserVotesFromPlayController = (res) => {
  return {
    type: actionTypes.UPDATE_USER_VOTES_FROM_PLAY_CONTROLLER,
    res: res
  }
}

export const updateUserCommentsFromPlayController = (comment) => {
  return dispatch => {
    dispatch(initUpdateUserCommentsFromPlayController(comment))
    if(comment.type === 'play') dispatch(updateCommentStatus('commentSuccess', true))
    if(comment.type === 'static') dispatch(updateStaticQuestionCommentStatus('commentSuccess', true))
  }
}

export const initUpdateUserCommentsFromPlayController = (res) => {
  return {
    type: actionTypes.UPDATE_USER_COMMENTS_FROM_PLAY_CONTROLLER,
    res: res
  }
}

export const editUserComment = (obj) => {
  return dispatch => {
    questionsFunctions('editQuestionComment', fetch.patch.editQuestionComment, obj)
    .then((res) => {
      dispatch(initEditUserComment(res))
    })
  }
}

const initEditUserComment = (res) => {
  return {
    type: actionTypes.EDIT_USER_COMMENT,
    question: res.question,
    comment: res.comment
  }
}

export const deleteUserComment = (obj) => {
  return dispatch => {
    questionsFunctions('deleteQuestionComment', fetch.delete.questionComment, obj)
    .then((res) => {
      dispatch(initDeleteUserComment(res))
    })
  }
}

const initDeleteUserComment = (res) => {
  return {
    type: actionTypes.DELETE_USER_COMMENT,
    question: res.question,
    comment: res.comment
  }
}
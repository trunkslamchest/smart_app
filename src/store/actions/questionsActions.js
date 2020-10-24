import * as actionTypes from './actionTypes'

import {
  setQuestion,
  updateGameStatus
} from './playActions'

import {
  authUpdateStatus
} from './authActions'

import { fetch } from '../../utility/paths'

import questionsFunctions from '../../utility/questionsFunctions'

export const storeQuestionTotals = (totals) => {
  return dispatch => {
    dispatch(authUpdateStatus('storeQuestionsLocal', true))
    dispatch(initStoreQuestionTotals(totals))
  }
}

const initStoreQuestionTotals = (totals) => {
  return {
    type: actionTypes.STORE_QUESTION_TOTALS,
    totals: totals
  }
}

export const getQuestionTotals = (props) => {
  return dispatch => {
    questionsFunctions('get', fetch.get.questionsTotals)
    .then(res => {
      dispatch(authUpdateStatus('getQuestionsLocalSuccess', true))
      dispatch(storeQuestionTotals(res))
    })
  }
}

export const clearQuestionTotals = () => {
  return dispatch => {
    dispatch(authUpdateStatus('clearQuestionTotalsSuccess', true))
    dispatch(initClearQuestionTotals())
  }
}

const initClearQuestionTotals = () => {
  return {
    type: actionTypes.CLEAR_QUESTION_TOTALS,
    totals: null
  }
}

export const updateQuestionTotalsFromPlayController = (result) => {
  return dispatch => {
    dispatch(updateGameStatus('updateQuestionTotalsSuccess', true))
    dispatch(initUpdateQuestionTotalsFromPlayController(result))
  }
}

const initUpdateQuestionTotalsFromPlayController = (result) => {
  return {
    type: actionTypes.UPDATE_QUESTION_TOTALS_FROM_PLAY_CONTROLLER,
    result: result
  }
}

export const getQuickQuestion = (obj) => {
  return dispatch => {
    questionsFunctions('getQuickQuestion', fetch.get.quickQuestion, obj)
    .then(res => {
      dispatch(setQuestion(res))
    })
  }
}

export const getDiffQuestion = (obj) => {
  return dispatch => {
    questionsFunctions('getDiffQuestion', fetch.get.diffQuestion, obj)
    .then(res => {
      dispatch(setQuestion(res))
    })
  }
}

export const getCatQuestion = (obj) => {
  return dispatch => {
    questionsFunctions('getCatQuestion', fetch.get.catQuestion, obj)
    .then(res => {
      dispatch(setQuestion(res))
    })
  }
}

export const getStaticQuestion = (obj) => {
  return dispatch => {
    dispatch(updateQuestionStatus('getStaticQuestion'))
    questionsFunctions('getStaticQuestion', fetch.get.staticQuestion, obj)
    .then(res => {
      dispatch(updateQuestionStatus('StaticQuestionSuccss'))
      dispatch(initSetStaticQuestion(res))
    })
  }
}

const initSetStaticQuestion = (res) => {
  return {
    type: actionTypes.GET_STATIC_QUESTION,
    res: res
  }
}

export const clearStaticQuestion = (obj) => {
  return dispatch => {
    dispatch(updateQuestionStatus('ClearStaticQuestion'))
    dispatch(initClearStaticQuestion())
  }
}

const initClearStaticQuestion = () => {
  return {
    type: actionTypes.CLEAR_STATIC_QUESTION,
    res: null
  }
}


export const updateQuestionStatus = (status) => {
  return {
    type: actionTypes.UPDATE_QUESTION_STATUS,
    status: status
  }
}

export const clearQuestionStatus = (obj) => {
  return dispatch => {
    dispatch(updateQuestionStatus('ClearQuestionStatus'))
    dispatch(initClearQuestionStatus())
  }
}

const initClearQuestionStatus = () => {
  return {
    type: actionTypes.CLEAR_QUESTION_STATUS,
    status: null
  }
}

export const setStaticUserQuestion = (res) => {
  return {
    type: actionTypes.SET_STATIC_USER_QUESTION,
    res: res
  }
}

export const clearStaticUserQuestion = (res) => {
  return {
    type: actionTypes.CLEAR_STATIC_USER_QUESTION,
    res: null
  }
}

export const updateStaticQuestionVotes = (votes) => {
  return {
    type: actionTypes.UPDATE_STATIC_QUESTION_VOTES,
    votes: votes
  }
}
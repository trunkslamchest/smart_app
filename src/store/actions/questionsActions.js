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
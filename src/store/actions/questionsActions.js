import * as actionTypes from './actionTypes'
import {
  setQuestion,
  // setGameState
} from './playActions'

import { fetch } from '../../utility/paths'

import questionsFunctions from '../../utility/questionsFunctions'

export const storeQuestionTotals = (totals) => {
  return {
    type: actionTypes.STORE_QUESTION_TOTALS,
    totals: totals
  }
}

export const getQuestionTotals = (props) => {
  return dispatch => {
    questionsFunctions('get', fetch.get.questionsTotals)
    .then(res => {
      dispatch(storeQuestionTotals(res))
    })
  }
}

export const clearQuestionTotals = () => {
  return {
    type: actionTypes.CLEAR_QUESTION_TOTALS,
    totals: null
  }
}

export const updateQuestionTotalsFromPlayController = (result) => {
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
import * as actionTypes from './actionTypes'
import { setQuestion } from './playActions'

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

export const getQuickQuestion = (obj) => {
  return dispatch => {
    questionsFunctions('getQuickQuestion', fetch.get.quickQuestion, obj)
    .then(res => {
      // console.log(res)
      dispatch(setQuestion(res))
    })
    // console.log(obj)
  }
}
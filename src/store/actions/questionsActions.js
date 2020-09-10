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

export const getQuickQuestion = (obj) => {
  return dispatch => {
    questionsFunctions('getQuickQuestion', fetch.get.quickQuestion, obj)
    .then(res => {
      // console.log(res)
      dispatch(setQuestion(res))
      // dispatch(setGameState(''))
    })
    // console.log(obj)
  }
}

export const getDiffQuestion = (obj) => {
  return dispatch => {
    questionsFunctions('getDiffQuestion', fetch.get.diffQuestion, obj)
    .then(res => {
      // console.log(res)
      dispatch(setQuestion(res))
      // dispatch(setGameState(''))
    })
    // console.log(obj)
  }
}

export const getCatQuestion = (obj) => {
  return dispatch => {
    questionsFunctions('getCatQuestion', fetch.get.catQuestion, obj)
    .then(res => {
      // console.log(res)
      dispatch(setQuestion(res))
      // dispatch(setGameState(''))
    })
    // console.log(obj)
  }
}
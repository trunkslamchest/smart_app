import * as actionTypes from './actionTypes'

import { fetch } from '../../utility/paths'

import questionsFunctions from '../../utility/questionsFunctions'

export const setGameMode = (mode) => {
  return {
    type: actionTypes.SET_GAME_MODE,
    gameMode: mode
  }
}

export const resetGameMode = () => {
  return {
    type: actionTypes.RESET_GAME_MODE,
    gameMode: null
  }
}

export const setQuestion = (question) => {
  return {
    type: actionTypes.SET_QUESTION,
    question: question
  }
}

export const updateQuestion = (results) => {
  return {
    type: actionTypes.UPDATE_QUESTION,
    results: results
  }
}

export const resetQuestion = () => {
  return {
    type: actionTypes.RESET_QUESTION,
    question: null
  }
}

export const setGameState = (gameState) => {
  return {
    type: actionTypes.SET_GAME_STATE,
    gameState: gameState
  }
}

export const resetGameState = () => {
  return {
    type: actionTypes.RESET_GAME_STATE,
    gameState: null
  }
}

export const setGameQset = (gameQset) => {
  return {
    type: actionTypes.SET_GAME_QSET,
    gameQset: gameQset
  }
}

export const resetGameQset = () => {
  return {
    type: actionTypes.RESET_GAME_QSET,
    gameQset: null
  }
}

export const setAnswer = (answer) => {
  return {
    type: actionTypes.SET_ANSWER,
    answer: answer
  }
}

export const resetAnswer = () => {
  return {
    type: actionTypes.RESET_ANSWER ,
    answer: null
  }
}

export const getResults = (obj) => {
  return dispatch => {
    questionsFunctions('getQuestionResults', fetch.get.questionResults, obj)
    .then(res => {
      dispatch(setResults({result: res.answerResult, correct_answer: res.correct}))
      dispatch(updateQuestion({answers: res.answers, votes: res.votes, comments: res.comments}))
    })
  }
}

export const setResults = (results) => {
  return {
    type: actionTypes.SET_RESULTS,
    results: results
  }
}

export const resetResults = () => {
  return {
    type: actionTypes.RESET_RESULTS,
    results: null
  }
}

export const setVote = (obj) => {
  return dispatch => {
    questionsFunctions('patchQuestionVote', fetch.patch.questionVote, obj)
    .then(res => {
      dispatch(updateVotes(res))
    })
  }
}

const updateVotes = (obj) => {
  return {
    type: actionTypes.SET_VOTE,
    votes: obj,
    voted: true
  }
}

export const resetVote = () => {
  return {
    type: actionTypes.RESET_VOTE,
    voted: false
  }
}

export const setComment = (obj) => {
  return dispatch => {
    questionsFunctions('patchQuestionComment', fetch.patch.questionComment, obj)
    .then(res => {
      dispatch(updateComments(res))
    })
  }
}

const updateComments = (res) => {
  return {
    type: actionTypes.SET_COMMENT,
    comments: res.commentsObj,
    comment: res.commentObj,
    commented: true
  }
}

export const resetComment = () => {
  return {
    type: actionTypes.RESET_COMMENT,
    comment: null,
    commented: false
  }
}
import * as actionTypes from './actionTypes'

import { fetch } from '../../utility/paths'

import questionsFunctions from '../../utility/questionsFunctions'

export const updateGameStatus = (status, loading) => {
  return {
    type: actionTypes.UPDATE_GAME_STATUS,
    status: status,
    loading: loading
  }
}

export const setGameMode = (mode) => {
  return {
    type: actionTypes.SET_GAME_MODE,
    status: 'setGameModeSuccess',
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
    status: 'setQuestionSuccess',
    question: question
  }
}

export const updateQuestion = (results) => {
  return {
    type: actionTypes.UPDATE_QUESTION,
    status: 'updateQuestionSuccess',
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
    status: 'setQsetSuccess',
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
  return dispatch => {
    dispatch(updateGameStatus('setAnswerSuccess', true))
    dispatch(initSetAnswer(answer))
  }
}

const initSetAnswer = (answer) => {
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
    status: 'setResultsSuccess',
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

export const updateVoteStatus = (status, loading) => {
  return {
    type: actionTypes.UPDATE_VOTE_STATUS,
    voteStatus: status,
    voteLoading: loading
  }
}

const updateVotes = (obj) => {
  return {
    type: actionTypes.SET_VOTE,
    votes: obj
  }
}

export const resetVote = () => {
  return {
    type: actionTypes.RESET_VOTE,
    voteStatus: null,
    voteLoading: false
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

export const updateCommentStatus = (status, loading) => {
  return {
    type: actionTypes.UPDATE_COMMENT_STATUS,
    commentStatus: status,
    commentLoading: loading
  }
}

const updateComments = (res) => {
  return {
    type: actionTypes.SET_COMMENT,
    comments: res.commentsObj,
    comment: res.commentObj
  }
}

export const resetComment = () => {
  return {
    type: actionTypes.RESET_COMMENT,
    comment: null,
    commentStatus: null,
    commentLoading: false
  }
}

export const deleteQuestionComment = (cid) => {
  return dispatch => {
    dispatch(initDeleteQuestionComment(cid))
  }
}

const initDeleteQuestionComment = (cid) => {
  return {
    type: actionTypes.DELETE_QUESTION_COMMENT,
    comment: null,
    cid: cid
  }
}
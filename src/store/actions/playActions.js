import * as actionTypes from './actionTypes'

import {
  updateAchievements
} from './achievementActions'

import {
  updateStaticQuestionVotes,
  updateStaticQuestionComments,
  deleteStaticQuestionComment,
  editStaticQuestionComment
} from './questionsActions'

import { fetch } from '../../utility/paths'

import questionsFunctions from '../../utility/questionsFunctions'

export const updateGameStatus = (status, loading) => { return { type: actionTypes.UPDATE_GAME_STATUS, status: status, loading: loading } }

export const setGameMode = (mode) => { return { type: actionTypes.SET_GAME_MODE, status: 'setGameModeSuccess', gameMode: mode } }

export const resetGameMode = () => { return { type: actionTypes.RESET_GAME_MODE, gameMode: null } }

export const setQuestion = (question) => { return { type: actionTypes.SET_QUESTION, status: 'setQuestionSuccess', question: question } }

export const updateQuestion = (results) => { return { type: actionTypes.UPDATE_QUESTION, status: 'updateQuestionSuccess', results: results } }

export const resetQuestion = () => { return { type: actionTypes.RESET_QUESTION, question: null } }

export const setGameState = (gameState) => { return { type: actionTypes.SET_GAME_STATE, gameState: gameState } }

export const resetGameState = () => { return { type: actionTypes.RESET_GAME_STATE, gameState: null } }

export const setGameQset = (gameQset) => { return { type: actionTypes.SET_GAME_QSET, status: 'setQsetSuccess', gameQset: gameQset } }

export const resetGameQset = () => { return { type: actionTypes.RESET_GAME_QSET, gameQset: null } }

export const setAnswer = (answer) => {
  return dispatch => {
    dispatch(updateGameStatus('setAnswerSuccess', true))
    dispatch(initSetAnswer(answer))
  }
}

const initSetAnswer = (answer) => {  return { type: actionTypes.SET_ANSWER, answer: answer } }

export const resetAnswer = () => { return { type: actionTypes.RESET_ANSWER , answer: null } }

export const getResults = (obj) => {
  return dispatch => {
    questionsFunctions('getQuestionResults', fetch.get.questionResults, obj)
    .then(res => {
      dispatch(setResults({ result: res.answerResult, correct_answer: res.correct, avg_time: res.avg_time, performance: res.performance, experience: res.experience, achievements: res.achievements.user }))
      dispatch(updateAchievements(res.achievements.all))
      dispatch(updateQuestion({answers: res.answers, diffRating: res.diffRating, perfRating: res.perfRating, votes: res.votes, comments: res.comments }))
    })
  }
}

export const setResults = (results) => { return { type: actionTypes.SET_RESULTS, status: 'setResultsSuccess', results: results } }

export const resetResults = () => { return { type: actionTypes.RESET_RESULTS, results: null } }

export const setVote = (obj) => {
  return dispatch => {
    questionsFunctions('patchQuestionVote', fetch.patch.questionVote, obj)
    .then(res => {
      let voteTotals = { good: res.good, neutral: res.neutral, bad: res.bad, total: res.total, rating: res.rating },
          userVote = { vid: res.vid, vote: res.vote, value: res.value }
      if(obj.type === 'play') dispatch(updateVotes(voteTotals, userVote))
      if(obj.type === 'static') {
        delete voteTotals.rating
        dispatch(updateStaticQuestionVotes(voteTotals, userVote, res.rating))
      }
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

const updateVotes = (votes, vote) => {
  return {
    type: actionTypes.SET_VOTE,
    votes: votes,
    vote: vote
  }
}

export const resetVote = () => { return { type: actionTypes.RESET_VOTE, voteStatus: null, voteLoading: false } }

export const setComment = (obj) => {
  return dispatch => {
    questionsFunctions('patchQuestionComment', fetch.patch.questionComment, obj)
    .then(res => {
      if(obj.type === 'play') dispatch(updateComments(res))
      if(obj.type === 'static') dispatch(updateStaticQuestionComments(res))
    })
  }
}

export const updateCommentStatus = (status, loading) => { return { type: actionTypes.UPDATE_COMMENT_STATUS, commentStatus: status, commentLoading: loading } }

const updateComments = (res) => { return { type: actionTypes.SET_COMMENT, comments: res.commentsObj, comment: res.commentObj } }

export const resetComment = () => { return { type: actionTypes.RESET_COMMENT, comment: null, commentStatus: null, commentLoading: false } }

export const editQuestionComment = (obj) => {
  return dispatch => {
    if(obj.question.type === 'play') dispatch(initEditQuestionComment(obj))
    if(obj.question.type === 'static') dispatch(editStaticQuestionComment(obj))
  }
}

const initEditQuestionComment = (obj) => { return { type: actionTypes.EDIT_QUESTION_COMMENT, cid: obj.comment.cid, comment: obj.comment.comment, timestamp: obj.comment.timestamp } }

export const deleteQuestionComment = (obj) => {
  return dispatch => {
    if(obj.type === 'play') dispatch(initDeleteQuestionComment(obj.cid))
    if(obj.type === 'static') dispatch(deleteStaticQuestionComment(obj.cid))
  }
}

const initDeleteQuestionComment = (cid) => { return { type: actionTypes.DELETE_QUESTION_COMMENT, comment: null, cid: cid } }

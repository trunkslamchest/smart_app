import * as actionTypes from './actionTypes'

import {
  setQuestion,
  updateGameStatus
} from './playActions'

import { fetch } from '../../utility/paths'

import questionsFunctions from '../../utility/questionsFunctions'

export const storeQuestionTotals = (totals) => {
  return {
    type: actionTypes.STORE_QUESTION_TOTALS,
    totals: totals
  }
}

// export const getQuestionTotals = () => {
//   return dispatch => {
//     questionsFunctions('get', fetch.get.questionsTotals)
//     .then(res => {
//       dispatch(storeQuestionTotals(res))
//     })
//   }
// }

export const clearQuestionTotals = () => {
  return dispatch => {
    dispatch(initClearQuestionTotals())
  }
}

const initClearQuestionTotals = () => {
  return {
    type: actionTypes.CLEAR_QUESTION_TOTALS,
    totals: null
  }
}

export const updateQuestionTotalsFromPlayController = (totals) => {
  return dispatch => {
    dispatch(updateGameStatus('updateQuestionTotalsSuccess', true))
    dispatch(initUpdateQuestionTotalsFromPlayController(totals))
  }
}

const initUpdateQuestionTotalsFromPlayController = (totals) => {
  return {
    type: actionTypes.UPDATE_QUESTION_TOTALS_FROM_PLAY_CONTROLLER,
    totals: totals
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
    questionsFunctions('getStaticQuestion', fetch.get.staticQuestion, obj)
    .then(res => {
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

export const updateQuestionLoadingStatus = (bool) => {
  return {
    type: actionTypes.UPDATE_QUESTION_LOADING_STATUS,
    loading: bool
  }
}

export const clearQuestionStatus = (obj) => {
  return dispatch => {
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

export const updateStaticQuestionVotes = (votes, vote, rating) => {
  return dispatch => {
    dispatch(updateStaticQuestionVoteStatus('updateStaticQuestionVote'))
    dispatch(initUpdateStaticQuestionVotes(votes, rating))
    dispatch(updateStaticUserVote(vote))
  }
}

const initUpdateStaticQuestionVotes = (votes, rating) => {
  return {
    type: actionTypes.UPDATE_STATIC_QUESTION_VOTES,
    votes: votes,
    rating: rating
  }
}

export const updateStaticQuestionVoteStatus = (status) => {
  return {
    type: actionTypes.UPDATE_STATIC_QUESTION_VOTE_STATUS,
    voteStatus: status
  }
}

export const clearStaticQuestionVoteStatus = () => {
  return {
    type: actionTypes.CLEAR_STATIC_QUESTION_VOTE_STATUS,
    voteStatus: null
  }
}

export const updateStaticUserVote = (vote) => {
  return dispatch => {
    dispatch(updateStaticQuestionVoteStatus('updateStaticUserVote'))
    dispatch(initUpdateStaticUserVote(vote))
  }
}

const initUpdateStaticUserVote = (vote) => {
  return {
    type: actionTypes.UPDATE_STATIC_USER_VOTE,
    vote: vote
  }
}

export const clearStaticUserVote = () => {
  return {
    type: actionTypes.CLEAR_STATIC_USER_VOTE,
    vote: null
  }
}

export const updateStaticQuestionComments = (obj) => {
  return dispatch => {
    dispatch(commentLoading(true))
    dispatch(updateStaticQuestionCommentStatus('updateStaticQuestionComment'))
    dispatch(initUpdateStaticQuestionComments(obj))
  }
}

const initUpdateStaticQuestionComments = (obj) => {
  return {
    type: actionTypes.UPDATE_STATIC_QUESTION_COMMENTS,
    comments: obj.questionCommentsObj,
    comment: obj.commentObj
  }
}

export const clearStaticUserComment = () => {
  return {
    type: actionTypes.CLEAR_STATIC_USER_COMMENT,
    comment: null
  }
}

export const editStaticQuestionComment = (obj) => {
  return dispatch => {
    dispatch(commentLoading(true))
    dispatch(updateStaticQuestionCommentStatus('editStaticQuestionComment'))
    dispatch(initEditStaticQuestionComment(obj))
  }
}

const initEditStaticQuestionComment = (obj) => {
  return {
    type: actionTypes.EDIT_STATIC_QUESTION_COMMENT,
    cid: obj.comment.cid,
    comment: obj.comment.comment,
    timestamp: obj.comment.timestamp
  }
}

export const deleteStaticQuestionComment = (obj) => {
  return {
    type: actionTypes.DELETE_STATIC_QUESTION_COMMENT,
    cid: obj.comment.cid
  }
}

export const updateStaticQuestionCommentStatus = (status) => {
  return {
    type: actionTypes.UPDATE_STATIC_QUESTION_COMMENT_STATUS,
    commentStatus: status
  }
}

export const clearStaticQuestionCommentStatus = () => {
  return {
    type: actionTypes.CLEAR_STATIC_QUESTION_COMMENT_STATUS,
    commentStatus: null
  }
}

export const voteLoading = (status) => {
  return {
    type: actionTypes.VOTE_LOADING,
    status: status
  }
}

export const commentLoading = (status) => {
  return {
    type: actionTypes.COMMENT_LOADING,
    status: status
  }
}
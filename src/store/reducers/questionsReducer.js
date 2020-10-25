import * as actionTypes from '../actions/actionTypes'

const initialState = {
  question: {},
  staticQuestion: null,
  staticUserResults: null,
  status: null,
  totals: null,
  vote: null,
  voteStatus: null,
  voteLoading: null,
  comment: null,
  commentStatus: null,
  commentLoading: null
}

const storeQuestionTotals = (currentState, action) => { return { ...currentState, totals: action.totals, } }

const getQuestionTotals = (currentState, action) => { return { ...currentState, totals: null, } }

const getQuickQuestion = (currentState, action) => { return { ...currentState, question: action.question } }

const getDiffQuestion = (currentState, action) => { return { ...currentState, question: action.question } }

const getCatQuestion = (currentState, action) => { return { ...currentState, question: action.question } }

const getStaticQuestion = (currentState, action) => { return { ...currentState, staticQuestion: action.res } }

const updateQuestionTotalsFromPlayController = (currentState, action) => {
  let uTotals = { ...currentState.totals }

  uTotals.all.totals.answers += 1
  uTotals.difficulty[action.result.difficulty].totals.answers += 1
  uTotals.category[action.result.category].totals.answers += 1

  if(action.result.result === 'Correct') {
    uTotals.all.totals.correct += 1
    uTotals.difficulty[action.result.difficulty].totals.correct += 1
    uTotals.category[action.result.category].totals.correct += 1
  }

  if(action.result.result === 'Incorrect') {
    uTotals.all.totals.incorrect += 1
    uTotals.difficulty[action.result.difficulty].totals.incorrect += 1
    uTotals.category[action.result.category].totals.incorrect += 1
  }

  if(action.result.result === 'Outta Time') {
    uTotals.all.totals.outta_time += 1
    uTotals.difficulty[action.result.difficulty].totals.outta_time += 1
    uTotals.category[action.result.category].totals.outta_time += 1
  }

  uTotals.all.totals.total_time = uTotals.all.totals.total_time + action.result.time
  uTotals.difficulty[action.result.difficulty].totals.total_time = uTotals.difficulty[action.result.difficulty].totals.total_time + action.result.time
  uTotals.category[action.result.category].totals.total_time = uTotals.category[action.result.category].totals.total_time + action.result.time

  uTotals.all.averages.questions.avgTime = uTotals.all.totals.total_time / uTotals.all.totals.answers
  uTotals.difficulty[action.result.difficulty].averages.questions.avgTime = uTotals.difficulty[action.result.difficulty].totals.total_time / uTotals.difficulty[action.result.difficulty].totals.answers
  uTotals.category[action.result.category].averages.questions.avgTime = uTotals.category[action.result.category].totals.total_time / uTotals.category[action.result.category].totals.answers

  uTotals.all.averages.questions.correct = (uTotals.all.totals.correct / uTotals.all.totals.answers) * 100
  uTotals.difficulty[action.result.difficulty].averages.questions.correct = (uTotals.difficulty[action.result.difficulty].totals.correct / uTotals.difficulty[action.result.difficulty].totals.answers) * 100
  uTotals.category[action.result.category].averages.questions.correct = (uTotals.category[action.result.category].totals.correct / uTotals.category[action.result.category].totals.answers) * 100

  uTotals.all.averages.questions.incorrect = (uTotals.all.totals.incorrect / uTotals.all.totals.answers) * 100
  uTotals.difficulty[action.result.difficulty].averages.questions.incorrect = (uTotals.difficulty[action.result.difficulty].totals.incorrect / uTotals.difficulty[action.result.difficulty].totals.answers) * 100
  uTotals.category[action.result.category].averages.questions.incorrect = (uTotals.category[action.result.category].totals.incorrect / uTotals.category[action.result.category].totals.answers) * 100

  uTotals.all.averages.questions.outtaTime = (uTotals.all.totals.outta_time / uTotals.all.totals.answers) * 100
  uTotals.difficulty[action.result.difficulty].averages.questions.outtaTime = (uTotals.difficulty[action.result.difficulty].totals.outta_time / uTotals.difficulty[action.result.difficulty].totals.answers) * 100
  uTotals.category[action.result.category].averages.questions.outtaTime = (uTotals.category[action.result.category].totals.outta_time / uTotals.category[action.result.category].totals.answers) * 100

  return { ...currentState, totals: uTotals }
}

const updateQuestionStatus = (currentState, action) => { return { ...currentState, status: action.status } }

const updateStaticQuestionVotes = (currentState, action) => {
  return {
    ...currentState,
    staticQuestion: {
      ...currentState.staticQuestion,
      rating: {
        ...currentState.staticQuestion.rating,
        approval: action.rating
      },
      votes: action.votes
    }
  }
}

const updateStaticQuestionComments = (currentState, action) => {
  return {
    ...currentState,
    staticQuestion: {
      ...currentState.staticQuestion,
      comments: action.comments
    },
    comment: action.comment
  }
}

const updateStaticQuestionVoteStatus = (currentState, action) => { return { ...currentState, voteStatus: action.voteStatus } }
const updateStaticQuestionCommentStatus = (currentState, action) => { return { ...currentState, commentStatus: action.commentStatus } }

const setStaticUserQuestion = (currentState, action) => { return { ...currentState, staticUserResults: action.res } }
const updateStaticUserVote = (currentState, action) => { return { ...currentState, vote: action.vote } }

const voteLoading = (currentState, action) => { return { ...currentState, voteLoading: action.status } }
const commentLoading = (currentState, action) => { return { ...currentState, commentLoading: action.status } }

const clearQuestionTotals = (currentState, action) => { return { ...currentState, totals: action.totals, } }
const clearQuestionStatus = (currentState, action) => { return { ...currentState, status: action.status } }
const clearStaticQuestion = (currentState, action) => { return {...currentState, staticQuestion: action.res } }
const clearStaticUserComment = (currentState, action) => { return {...currentState, comment: action.comment } }

const editStaticQuestionComment = (currentState, action) => {
  return {
    ...currentState,
    staticQuestion: {
      ...currentState.staticQuestion,
      comments: {
        ...currentState.staticQuestion.comments,
        [action.cid]: {
          ...currentState.staticQuestion.comments[action.cid],
          comment: action.comment,
          timestamp: action.timestamp
        }
      }
    },
    comment: { ...currentState.comment, comment: action.comment, timestamp: action.timestamp }
  }
}

const deleteStaticQuestionComment = (currentState, action) => {
  let uComments = { ...currentState.staticQuestion.comments }
  delete uComments[action.cid]
  if(Object.keys(uComments).length === 0) uComments = null
  return {
    ...currentState,
    staticQuestion: { ...currentState.staticQuestion, comments: uComments }
  }
}


const clearStaticQuestionVoteStatus = (currentState, action) => { return { ...currentState, voteStatus: action.voteStatus } }
const clearStaticQuestionCommentStatus = (currentState, action) => { return { ...currentState, commentStatus: action.commentStatus } }

const clearStaticUserQuestion = (currentState, action) => { return { ...currentState, staticUserResults: action.res } }
const clearStaticUserVote = (currentState, action) => { return { ...currentState, vote: action.vote } }

export const questionsReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.STORE_QUESTION_TOTALS: return storeQuestionTotals(currentState, action)
    case actionTypes.GET_QUESTION_TOTALS: return getQuestionTotals(currentState, action)
    case actionTypes.GET_QUICK_QUESTION: return getQuickQuestion(currentState, action)
    case actionTypes.GET_DIFF_QUESTION: return getDiffQuestion(currentState, action)
    case actionTypes.GET_CAT_QUESTION: return getCatQuestion(currentState, action)
    case actionTypes.GET_STATIC_QUESTION: return getStaticQuestion(currentState, action)
    case actionTypes.SET_STATIC_USER_QUESTION: return setStaticUserQuestion(currentState, action)
    case actionTypes.UPDATE_QUESTION_TOTALS_FROM_PLAY_CONTROLLER: return updateQuestionTotalsFromPlayController(currentState, action)
    case actionTypes.UPDATE_QUESTION_STATUS: return updateQuestionStatus(currentState, action)
    case actionTypes.UPDATE_STATIC_QUESTION_VOTES: return updateStaticQuestionVotes(currentState, action)
    case actionTypes.UPDATE_STATIC_QUESTION_COMMENTS: return updateStaticQuestionComments(currentState, action)
    case actionTypes.UPDATE_STATIC_QUESTION_VOTE_STATUS: return updateStaticQuestionVoteStatus(currentState, action)
    case actionTypes.UPDATE_STATIC_QUESTION_COMMENT_STATUS: return updateStaticQuestionCommentStatus(currentState, action)
    case actionTypes.UPDATE_STATIC_USER_VOTE: return updateStaticUserVote(currentState, action)
    case actionTypes.EDIT_STATIC_QUESTION_COMMENT: return editStaticQuestionComment(currentState, action)
    case actionTypes.DELETE_STATIC_QUESTION_COMMENT: return deleteStaticQuestionComment(currentState, action)
    case actionTypes.VOTE_LOADING: return voteLoading(currentState, action)
    case actionTypes.COMMENT_LOADING: return commentLoading(currentState, action)
    case actionTypes.CLEAR_QUESTION_TOTALS: return clearQuestionTotals(currentState, action)
    case actionTypes.CLEAR_QUESTION_STATUS: return clearQuestionStatus(currentState, action)
    case actionTypes.CLEAR_STATIC_QUESTION: return clearStaticQuestion(currentState, action)
    case actionTypes.CLEAR_STATIC_USER_COMMENT: return clearStaticUserComment(currentState, action)
    case actionTypes.CLEAR_STATIC_QUESTION_VOTE_STATUS: return clearStaticQuestionVoteStatus(currentState, action)
    case actionTypes.CLEAR_STATIC_QUESTION_COMMENT_STATUS: return clearStaticQuestionCommentStatus(currentState, action)
    case actionTypes.CLEAR_STATIC_USER_QUESTION: return clearStaticUserQuestion(currentState, action)
    case actionTypes.CLEAR_STATIC_USER_VOTE: return clearStaticUserVote(currentState, action)
    default: return currentState
  }
}

export default questionsReducer
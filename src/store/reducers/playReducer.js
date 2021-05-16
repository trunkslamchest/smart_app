import * as actionTypes from '../actions/actionTypes'

const initialState = {
  status: null,
  loading: false,
  gameMode: null,
  gameState: null,
  gameQset: null,
  question: null,
  answer: null,
  performance: null,
  results: null,
  voteStatus: null,
  voteLoading: false,
  commentStatus: null,
  commentLoading: false
}

const updateGameStatus = (currentState, action) => {
  return {
    ...currentState,
    status: action.status,
    loading: action.loading
  }
}

const setGameMode = (currentState, action) => {
  return {
    ...currentState,
    status: action.status,
    gameMode: action.gameMode
  }
}

const resetGameMode = (currentState, action) => {
  return {
    ...currentState,
    gameMode: action.gameMode
  }
}

const setQuestion = (currentState, action) => {
  return {
    ...currentState,
    status: action.status,
    question: action.question
  }
}

const updateQuestion = (currentState, action) => {
  return {
    ...currentState, status: action.status,
    question: {
      ...currentState.question,
      ...action.results
    }
  }
}

const resetQuestion = (currentState, action) => {
  return {
    ...currentState,
    question: action.question
  }
}

const setGameQset = (currentState, action) => {
  return {
    ...currentState,
    status: action.status,
    gameQset: action.gameQset
  }
}

const resetGameQset = (currentState, action) => {
  return {
    ...currentState,
    gameQset: action.gameQset
  }
}

const setGameState = (currentState, action) => {
  return {
    ...currentState,
    gameState: action.gameState
  }
}

const resetGameState = (currentState, action) => {
  return {
    ...currentState,
    gameState: action.gameState
  }
}

const setAnswer = (currentState, action) => {
  return {
    ...currentState,
    answer: action.answer
  }
}

const resetAnswer = (currentState, action) => {
  return {
    ...currentState,
    answer: action.answer
  }
}

const getResults = (currentState, action) => {
  return {
    ...currentState,
    results: action.results
  }
}

const setResults = (currentState, action) => {
  return {
    ...currentState,
    status: action.status,
    results: action.results,
    performance: action.performance
  }
}

const resetResults = (currentState, action) => {
  return {
    ...currentState,
    results: action.results
  }
}

const setVote = (currentState, action) => {
  return {
    ...currentState,
    question: {
      ...currentState.question,
      votes: action.votes
    },
    results: {
      ...currentState.results,
      vote: action.vote
    }
  }
}

const updateVoteStatus = (currentState, action) => {
  return {
    ...currentState,
    voteStatus: action.voteStatus,
    voteLoading: action.voteLoading
  }
}

const resetVote = (currentState, action) => {
  return {
    ...currentState,
    voteStatus: action.voteStatus,
    voteLoading: action.voteLoading
  }
}

const setComment = (currentState, action) => {
  return {
    ...currentState,
    question: {
      ...currentState.question,
      comments: action.comments
    },
    results: {
      ...currentState.results,
      comment: action.comment
    }
  }
}

const updateCommentStatus = (currentState, action) => {
  return {
    ...currentState,
    commentStatus: action.commentStatus,
    commentLoading: action.commentLoading
  }
}

const resetComment = (currentState, action) => {
  let removedCommentResults = { ...currentState.results }
  delete removedCommentResults.comment
  return {
    ...currentState,
    commentStatus: action.commentStatus,
    commentLoading: action.commentLoading,
    results: removedCommentResults
  }
}

const deleteQuestionComment = (currentState, action) => {
  let uComments = { ...currentState.question.comments }
  delete uComments[action.cid]
  if(Object.keys(uComments).length === 0) uComments = null
  return {
    ...currentState,
    question: { ...currentState.question, comments: uComments },
    comment: action.comment
  }
}

const editQuestionComment = (currentState, action) => {
  return {
    ...currentState,
    question: {
      ...currentState.question,
      comments: {
        ...currentState.question.comments,
        [action.cid]: {
          ...currentState.question.comments[action.cid],
          comment: action.comment,
          timestamp: action.timestamp
        }
      }
    },
    comment: { ...currentState.comment, comment: action.comment, timestamp: action.timestamp }
  }
}

const playReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_GAME_STATUS: return updateGameStatus(currentState, action)
    case actionTypes.UPDATE_VOTE_STATUS: return updateVoteStatus(currentState, action)
    case actionTypes.UPDATE_COMMENT_STATUS: return updateCommentStatus(currentState, action)
    case actionTypes.SET_GAME_MODE: return setGameMode(currentState, action)
    case actionTypes.RESET_GAME_MODE: return resetGameMode(currentState, action)
    case actionTypes.SET_GAME_STATE: return setGameState(currentState, action)
    case actionTypes.RESET_GAME_STATE: return resetGameState(currentState, action)
    case actionTypes.SET_GAME_QSET: return setGameQset(currentState, action)
    case actionTypes.RESET_GAME_QSET: return resetGameQset(currentState, action)
    case actionTypes.SET_QUESTION: return setQuestion(currentState, action)
    case actionTypes.RESET_QUESTION: return resetQuestion(currentState, action)
    case actionTypes.UPDATE_QUESTION: return updateQuestion(currentState, action)
    case actionTypes.SET_ANSWER: return setAnswer(currentState, action)
    case actionTypes.RESET_ANSWER: return resetAnswer(currentState, action)
    case actionTypes.GET_RESULTS: return getResults(currentState, action)
    case actionTypes.SET_RESULTS: return setResults(currentState, action)
    case actionTypes.RESET_RESULTS: return resetResults(currentState, action)
    case actionTypes.SET_VOTE: return setVote(currentState, action)
    case actionTypes.RESET_VOTE: return resetVote(currentState, action)
    case actionTypes.SET_COMMENT: return setComment(currentState, action)
    case actionTypes.RESET_COMMENT: return resetComment(currentState, action)
    case actionTypes.DELETE_QUESTION_COMMENT: return deleteQuestionComment(currentState, action)
    case actionTypes.EDIT_QUESTION_COMMENT: return editQuestionComment(currentState, action)
    default: return currentState
  }
}

export default playReducer
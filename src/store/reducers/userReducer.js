import * as actionTypes from '../actions/actionTypes'

const initialState = {
  info: null,
  questions: null
}

const storeUserInfo = (currentState, action) => {
  return {
    ...currentState,
    info: action.info
  }
}

const storeUserQuestions = (currentState, action) => {
  return {
    ...currentState,
    questions: action.questions
  }
}

const clearUserInfo = (currentState, action) => {
  return {
    ...currentState,
    info: action.info
  }
}

const clearUserQuestions = (currentState, action) => {
  return {
    ...currentState,
    questions: action.questions
  }
}

const updateUserInfo = (currentState, action) => {
  return{
    ...currentState,
    info: action.info
  }
}

const updateUserQuestions = (currentState, action) => {
  return{
    ...currentState,
    questions: action.questions
  }
}

const updateUserQuestionIdsFromPlayController = (currentState, action) => {
  let qIds

  if(currentState.questions.ids) qIds = [ ...currentState.questions.ids, action.ids ]
  if(!currentState.questions.ids) qIds = [ action.ids ]

  return{
    ...currentState,
    questions: { ...currentState.questions, ids: qIds }
  }
}

const updateUserQuestionsFromPlayController = (currentState, action) => {
  let uQuestions = { ...currentState.questions }

  if(!currentState.questions[action.question.difficulty]) {
    uQuestions[action.question.difficulty] = {
      'categories': {
        [action.question.category]: {
          [action.question.qid]: {
            answer: action.question.answer.choice,
            correct_answer: action.question.results.correct_answer,
            question: action.question.question,
            result: action.question.results.result,
            time: action.question.answer.time
          }
        }
      }
    }
  } else if(!currentState.questions[action.question.difficulty].categories[action.question.category]) {
    uQuestions[action.question.difficulty].categories[action.question.category] = {
      [action.question.qid]: {
        answer: action.question.answer.choice,
        correct_answer: action.question.results.correct_answer,
        question: action.question.question,
        result: action.question.results.result,
        time: action.question.answer.time
      }
    }
  } else {
    uQuestions[action.question.difficulty].categories[action.question.category][action.question.qid] = {
      answer: action.question.answer.choice,
      correct_answer: action.question.results.correct_answer,
      question: action.question.question,
      result: action.question.results.result,
      time: action.question.answer.time
    }
  }

  return{
    ...currentState,
    questions: uQuestions
  }
}

const updateUserQuestionTotalsFromPlayController = (currentState, action) => {
  let uTotals = { ...currentState.questions.totals }

  if(uTotals.all.avg_time === 0) uTotals.all.avg_time = action.result.answer.time
  else uTotals.all.avg_time = parseFloat(((uTotals.all.avg_time + action.result.answer.time) / 2.00).toFixed(2))

  if(action.result.result === 'Correct') {
    uTotals.difficulty[action.result.difficulty].correct += 1
    uTotals.categories[action.result.category].correct += 1
    uTotals.all.correct += 1
  }

  if(action.result.result === 'Incorrect') {
    uTotals.difficulty[action.result.difficulty].incorrect += 1
    uTotals.categories[action.result.category].incorrect += 1
    uTotals.all.incorrect += 1
  }

  if(action.result.result === 'Outta Time') {
    uTotals.difficulty[action.result.difficulty].outta_times += 1
    uTotals.categories[action.result.category].outta_times += 1
    uTotals.all.outta_times += 1
  }

  uTotals.difficulty[action.result.difficulty].answered += 1
  uTotals.categories[action.result.category].answered += 1
  uTotals.all.answered += 1

  return {
    ...currentState,
    questions: { ...currentState.questions, totals: uTotals }
  }
}

const updateUserVotesFromPlayController = (currentState, action) => {
  let uVotes, vote = { [action.qid]: action.vote }

  if(currentState.questions.votes){
    uVotes = { ...currentState.questions.votes }
    uVotes[action.qid] = action.vote
    uVotes.total += 1
  } else {
    uVotes = vote
    uVotes["total"] = 1
  }

  return {
    ...currentState,
    questions: { ...currentState.questions, votes: uVotes }
  }
}

const updateUserCommentsFromPlayController = (currentState, action) => {
  let uComments, comment = { [action.cid]: action.comment }

  if(currentState.questions.comments){
    uComments = { ...currentState.questions.comments }
    uComments[action.cid] = action.comment
    uComments.total += 1
  } else {
    uComments = comment
    uComments["total"] = 1
  }

  return {
    ...currentState,
    questions: { ...currentState.questions, comments: uComments }
  }
}

const deleteUser = (currentState, action) => {
  return{
    ...currentState,
    info: action.info,
    questions: action.questions
  }
}

const userReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.STORE_USER_INFO: return storeUserInfo(currentState, action)
    case actionTypes.STORE_USER_QUESTIONS: return storeUserQuestions(currentState, action)
    case actionTypes.CLEAR_USER_INFO: return clearUserInfo(currentState, action)
    case actionTypes.CLEAR_USER_QUESTIONS: return clearUserQuestions(currentState, action)
    case actionTypes.UPDATE_USER_INFO: return updateUserInfo(currentState, action)
    case actionTypes.UPDATE_USER_QUESTIONS: return updateUserQuestions(currentState, action)
    case actionTypes.UPDATE_USER_QUESTIONIDS_FROM_PLAY_CONTROLLER: return updateUserQuestionIdsFromPlayController(currentState, action)
    case actionTypes.UPDATE_USER_QUESTIONS_FROM_PLAY_CONTROLLER: return updateUserQuestionsFromPlayController(currentState, action)
    case actionTypes.UPDATE_USER_QUESTION_TOTALS_FROM_PLAY_CONTROLLER: return updateUserQuestionTotalsFromPlayController(currentState, action)
    case actionTypes.UPDATE_USER_VOTES_FROM_PLAY_CONTROLLER: return updateUserVotesFromPlayController(currentState, action)
    case actionTypes.UPDATE_USER_COMMENTS_FROM_PLAY_CONTROLLER: return updateUserCommentsFromPlayController(currentState, action)
    case actionTypes.DELETE_USER: return deleteUser(currentState, action)
    default: return currentState
  }
}

export default userReducer
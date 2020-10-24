import * as actionTypes from '../actions/actionTypes'

import { userQuestionRating } from '../../utility/calculation/calcRating'
import { userQuestionRank } from '../../utility/calculation/calcRank'
import { userQuestionAvgTime } from '../../utility/calculation/calcAvgTime'

const initialState = {
  achievements: null,
  experience: null,
  info: null,
  settings: null,
  questions: null,
}

const storeUserInfo = (currentState, action) => { return { ...currentState, info: action.info, experience: action.experience, achievements: action.achievements, settings: action.settings } }

const updateUserInfo = (currentState, action) => { return{ ...currentState, info: action.info } }

const clearUserInfo = (currentState, action) => { return { ...currentState, info: action.info } }

const storeUserSettings = (currentState, action) => { return { ...currentState, settings: action.settings } }

const updateUserSettings = (currentState, action) => { return { ...currentState, settings: action.settings } }

const clearUserSettings = (currentState, action) => { return { ...currentState, settings: action.settings } }

const storeUserQuestions = (currentState, action) => { return { ...currentState, questions: action.questions } }

const updateUserQuestions = (currentState, action) => { return{ ...currentState, questions: action.questions } }

const clearUserQuestions = (currentState, action) => { return { ...currentState, questions: action.questions } }

const updateUserPerformanceFromPlayController = (currentState, action) => {

  let newDrating = userQuestionRating(action.res.dRating, action.res.qPerf.rating),
      newDrank = userQuestionRank(newDrating),
      newCrating = userQuestionRating(action.res.cRating, action.res.qPerf.rating),
      newCrank = userQuestionRank(newCrating)

  return {
    ...currentState,
    questions: {
      ...currentState.questions,
      totals: {
        ...currentState.questions.totals,
        all: {
          ...currentState.questions.totals.all,
          rank: action.res.oPerf.rank,
          rating: action.res.oPerf.rating
        },
        difficulty: {
          ...currentState.questions.totals.difficulty,
          [action.res.difficulty]: {
            ...currentState.questions.totals.difficulty[action.res.difficulty],
            rank: newDrank,
            rating: newDrating
          }
        },
        categories: {
          ...currentState.questions.totals.categories,
          [action.res.category]: {
            ...currentState.questions.totals.categories[action.res.category],
            rank: newCrank,
            rating: newCrating
          }
        }
      }
    }
  }
}

const updateUserExperienceFromPlayController = (currentState, action) => { return { ...currentState, experience: action.total } }

const updateUserAchievementsFromPlayController = (currentState, action) => {
  let unlockedArr = []

  if(currentState.achievements.unlocked[0] === 'null') unlockedArr = action.achievements.unlocked
  else unlockedArr = [ ...currentState.achievements.unlocked, ...action.achievements.unlocked ]

  return {
    ...currentState,
    achievements: {
      ...currentState.achievements,
      total: currentState.achievements.total + action.achievements.total,
      unlocked: unlockedArr
    }
  }
}

const updateUserQuestionIdsFromPlayController = (currentState, action) => {
  let qIds

  if(currentState.questions.ids) qIds = [ ...currentState.questions.ids, action.ids ]
  if(!currentState.questions.ids) qIds = [ action.ids ]

  return {
    ...currentState,
    questions: { ...currentState.questions, ids: qIds }
  }
}

const updateUserQuestionsFromPlayController = (currentState, action) => {
  let uQuestions = { ...currentState.questions }

  // console.log(action.question.results)

  if(!currentState.questions[action.question.difficulty]) {
    uQuestions[action.question.difficulty] = {
      'categories': {
        [action.question.category]: {
          [action.question.qid]: {
            answer: action.question.answer.choice,
            correct_answer: action.question.results.correct_answer,
            question: action.question.question,
            result: action.question.results.result,
            time: action.question.answer.time,
            performance: action.question.results.performance.qPerf,
            experience: action.question.results.experience,
            achievements: action.question.results.achievements
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
        time: action.question.answer.time,
        performance: action.question.results.performance.qPerf,
        experience: action.question.results.experience,
        achievements: action.question.results.achievements
      }
    }
  } else {
    uQuestions[action.question.difficulty].categories[action.question.category][action.question.qid] = {
      answer: action.question.answer.choice,
      correct_answer: action.question.results.correct_answer,
      question: action.question.question,
      result: action.question.results.result,
      time: action.question.answer.time,
      performance: action.question.results.performance.qPerf,
      experience: action.question.results.experience,
      achievements: action.question.results.achievements
    }
  }

  return{
    ...currentState,
    questions: uQuestions
  }
}

const updateUserQuestionTotalsFromPlayController = (currentState, action) => {
  let uTotals = { ...currentState.questions.totals },
      nTotalAvgTime = userQuestionAvgTime(uTotals.all.avg_time, action.result.answer.time),
      nDiffAvgTime = userQuestionAvgTime(uTotals.difficulty[action.result.difficulty].avg_time, action.result.answer.time),
      nCatAvgTime = userQuestionAvgTime(uTotals.categories[action.result.category].avg_time, action.result.answer.time)

  uTotals.all.answered += 1
  uTotals.all.avg_time = nTotalAvgTime
  uTotals.difficulty[action.result.difficulty].answered += 1
  uTotals.difficulty[action.result.difficulty].avg_time = nDiffAvgTime
  uTotals.categories[action.result.category].answered += 1
  uTotals.categories[action.result.category].avg_time = nCatAvgTime

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

  return { ...currentState, questions: { ...currentState.questions, totals: uTotals } }
}

const updateUserVotesFromPlayController = (currentState, action) => {
  let vote = { vote: action.res.vote, value: action.res.value },
      voteTotals = { ...currentState.questions.totals.all.votes }

  voteTotals[action.res.vote] += 1
  voteTotals.total += 1

  return {
    ...currentState,
    questions: { ...currentState.questions,
      [action.res.difficulty]: {
        ...currentState.questions[action.res.difficulty],
        categories: {
          ...currentState.questions[action.res.difficulty].categories,
          [action.res.category]: {
            ...currentState.questions[action.res.difficulty].categories[action.res.category],
            [action.res.qid]: {
              ...currentState.questions[action.res.difficulty].categories[action.res.category][action.res.qid],
              vote: {
                [action.res.vid]: vote
              }
            }
          }
        }
      },
      totals: {
        ...currentState.questions.totals,
        all: {
          ...currentState.questions.totals.all,
          votes: voteTotals
        }
      }
    }
  }
}

const updateUserCommentsFromPlayController = (currentState, action) => {
  let comment = { comment: action.res.comment, timestamp: action.res.timestamp },
      commentTotals = { ...currentState.questions.totals.all.comments }

  commentTotals.total += 1

  return {
    ...currentState,
    questions: { ...currentState.questions,
      [action.res.difficulty]: {
        ...currentState.questions[action.res.difficulty],
        categories: {
          ...currentState.questions[action.res.difficulty].categories,
          [action.res.category]: {
            ...currentState.questions[action.res.difficulty].categories[action.res.category],
            [action.res.qid]: {
              ...currentState.questions[action.res.difficulty].categories[action.res.category][action.res.qid],
              comments: {
                ...currentState.questions[action.res.difficulty].categories[action.res.category][action.res.qid].comments,
                [action.res.cid]: comment
              }
            }
          }
        }
      },
      totals: {
        ...currentState.questions.totals,
        all: {
          ...currentState.questions.totals.all,
          comments: commentTotals
        }
      }
    }
  }
}

const editUserComment = (currentState, action) => {
  return {
    ...currentState,
    questions: { ...currentState.questions,
      [action.res.difficulty]: {
        ...currentState.questions[action.res.difficulty],
        categories: {
          ...currentState.questions[action.res.difficulty].categories,
          [action.res.category]: {
            ...currentState.questions[action.res.difficulty].categories[action.res.category],
            [action.res.qid]: {
              ...currentState.questions[action.res.difficulty].categories[action.res.category][action.res.qid],
              comments: {
                ...currentState.questions[action.res.difficulty].categories[action.res.category][action.res.qid].comments,
                [action.res.cid]: {
                ...currentState.questions[action.res.difficulty].categories[action.res.category][action.res.qid].comments[action.res.cid],
                comment: action.res.comment
                }
              }
            }
          }
        }
      }
    }
  }
}

const deleteUserComment = (currentState, action) => {
  let question = { ...currentState.questions[action.res.difficulty].categories[action.res.category][action.res.qid] },
      commentTotals = { ...currentState.questions.totals.all.comments }

  commentTotals.total -= 1
  delete question.comments[action.res.cid]
  if(commentTotals.total === 0) delete question.comments

  return {
    ...currentState,
    questions: { ...currentState.questions,
      [action.res.difficulty]: {
        ...currentState.questions[action.res.difficulty],
        categories: {
          ...currentState.questions[action.res.difficulty].categories,
          [action.res.category]: {
            ...currentState.questions[action.res.difficulty].categories[action.res.category],
            [action.res.qid]: question
          }
        }
      },
      totals: {
        ...currentState.questions.totals.all,
        comments: commentTotals
      }
    }
  }
}

const deleteUser = (currentState, action) => { return { ...currentState, info: action.info, questions: action.questions } }

const userReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.STORE_USER_INFO: return storeUserInfo(currentState, action)
    case actionTypes.UPDATE_USER_INFO: return updateUserInfo(currentState, action)
    case actionTypes.CLEAR_USER_INFO: return clearUserInfo(currentState, action)
    case actionTypes.STORE_USER_SETTINGS: return storeUserSettings(currentState, action)
    case actionTypes.UPDATE_USER_SETTINGS: return updateUserSettings(currentState, action)
    case actionTypes.CLEAR_USER_SETTINGS: return clearUserSettings(currentState, action)
    case actionTypes.STORE_USER_QUESTIONS: return storeUserQuestions(currentState, action)
    case actionTypes.UPDATE_USER_QUESTIONS: return updateUserQuestions(currentState, action)
    case actionTypes.CLEAR_USER_QUESTIONS: return clearUserQuestions(currentState, action)
    case actionTypes.UPDATE_USER_PERFORMANCE_FROM_PLAY_CONTROLLER: return updateUserPerformanceFromPlayController(currentState, action)
    case actionTypes.UPDATE_USER_EXPERIENCE_FROM_PLAY_CONTROLLER: return updateUserExperienceFromPlayController(currentState, action)
    case actionTypes.UPDATE_USER_ACHIEVEMENTS_FROM_PLAY_CONTROLLER: return updateUserAchievementsFromPlayController(currentState, action)
    case actionTypes.UPDATE_USER_QUESTIONIDS_FROM_PLAY_CONTROLLER: return updateUserQuestionIdsFromPlayController(currentState, action)
    case actionTypes.UPDATE_USER_QUESTIONS_FROM_PLAY_CONTROLLER: return updateUserQuestionsFromPlayController(currentState, action)
    case actionTypes.UPDATE_USER_QUESTION_TOTALS_FROM_PLAY_CONTROLLER: return updateUserQuestionTotalsFromPlayController(currentState, action)
    case actionTypes.UPDATE_USER_VOTES_FROM_PLAY_CONTROLLER: return updateUserVotesFromPlayController(currentState, action)
    case actionTypes.UPDATE_USER_COMMENTS_FROM_PLAY_CONTROLLER: return updateUserCommentsFromPlayController(currentState, action)
    case actionTypes.EDIT_USER_COMMENT: return editUserComment(currentState, action)
    case actionTypes.DELETE_USER: return deleteUser(currentState, action)
    case actionTypes.DELETE_USER_COMMENT: return deleteUserComment(currentState, action)
    default: return currentState
  }
}

export default userReducer
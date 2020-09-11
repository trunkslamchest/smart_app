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

const updateUserQuestionIds = (currentState, action) => {
  let qIds

  if(currentState.questions.ids){
    qIds = [ ...currentState.questions.ids, action.ids ]
  }

  if(!currentState.questions.ids){
    qIds = [ action.ids ]
  }

  return{
    ...currentState,
    questions: { ...currentState.questions, ids: qIds }
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
    case actionTypes.UPDATE_USER_QUESTIONIDS: return updateUserQuestionIds(currentState, action)
    case actionTypes.DELETE_USER: return deleteUser(currentState, action)
    default: return currentState
  }
}

export default userReducer
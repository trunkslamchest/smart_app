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

const userReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.STORE_USER_INFO: return storeUserInfo(currentState, action)
    case actionTypes.STORE_USER_QUESTIONS: return storeUserQuestions(currentState, action)
    default: return currentState
  }
}

export default userReducer
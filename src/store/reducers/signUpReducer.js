import * as actionTypes from '../actions/actionTypes'

const initialState = {
  token: null,
  username: null,
  email: null,
  password: null,
  error: null
}

const signUpStart = (currentState, action) => {
  return {
    ...currentState,
    error: null
  }
}

const signUpSuccess = (currentState, action) => {
  return {
    ...currentState,
    username: action.username,
    email: action.email,
    password: action.password,
    error: null
  }
}

const signUpFail = (currentState, action) => {
  return {
    ...currentState,
    error: action.error
  }
}

const signUpUser = (currentState, action) => {
  return {
    ...currentState,
    error: action.error
  }
}

const signUpReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.SIGNUP_START: return signUpStart(currentState, action)
    case actionTypes.SIGNUP_SUCCESS: return signUpSuccess(currentState, action)
    case actionTypes.SIGNUP_FAIL: return signUpFail(currentState, action)
    case actionTypes.SIGNUP_USER: return signUpUser(currentState, action)

    default: return currentState
  }
}

export default signUpReducer
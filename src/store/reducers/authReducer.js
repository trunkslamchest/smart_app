import * as actionTypes from '../actions/actionTypes'

const initialState = {
  token: null,
  userId: null,
  error: null
}

const authStart = (currentState, action) => {
  return {
    ...currentState,
    error: null
  }
}

const authSuccess = (currentState, action) => {
  return {
    ...currentState,
    token: action.idToken,
    userId: action.userId,
    error: null
  }
}

const authFail = (currentState, action) => {
  return {
    ...currentState,
    error: action.error
  }
}

const authUser = (currentState, action) => {
  return {
    ...currentState,
    error: action.error
  }
}

const authReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return authStart(currentState, action)
    case actionTypes.AUTH_SUCCESS: return authSuccess(currentState, action)
    case actionTypes.AUTH_FAIL: return authFail(currentState, action)
    case actionTypes.AUTH_USER: return authUser(currentState, action)

    default: return currentState
  }
}

export default authReducer
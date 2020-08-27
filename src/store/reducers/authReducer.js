import * as actionTypes from '../actions/actionTypes'

const initialState = {
  error: null,
  loading: false,
  token: null,
  refreshToken: null,
  id: null
}

const authStart = (currentState, action) => {
  return {
    ...currentState,
    error: null,
    loading: true
  }
}

const authSuccess = (currentState, action) => {
  return {
    ...currentState,
    error: null,
    loading: false,
    token: action.token,
    refreshToken: action.refreshToken,
    id: action.id
  }
}

const authFail = (currentState, action) => {
  return {
    ...currentState,
    loading: false,
    error: action.error,
    modal: {
      ...currentState.modal,
      login: false
    }
  }
}

const authUser = (currentState, action) => {
  return {
    ...currentState,
    error: action.error
  }
}

const authLogOut = (currentState, action) => {
  return {
    ...currentState,
    token: null,
    refreshToken: null,
    id: null
  }
}

const authDelete = (currentState, action) => {
  return {
    ...currentState,
    // error: action.error,
    token: null,
    refreshToken: null,
    id: null
  }
}

const authRefresh = (currentState, action) => {
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
    case actionTypes.AUTH_LOGOUT: return authLogOut(currentState, action)
    case actionTypes.AUTH_DELETE: return authDelete(currentState, action)
    case actionTypes.AUTH_REFRESH: return authRefresh(currentState, action)
    default: return currentState
  }
}

export default authReducer
import * as actionTypes from '../actions/actionTypes'

const initialState = {
  authType: null,
  error: null,
  fail: false,
  id: null,
  loading: false,
  refreshToken: null,
  start: false,
  success: false,
  token: null
}

const authStart = (currentState, action) => {
  return {
    ...currentState,
    error: action.error,
    start: action.start,
    authType: action.authType
  }
}

const authLoading = (currentState, action) => {
  return {
    ...currentState,
    error: action.error,
    loading: action.loading,
    start: action.start
  }
}

const authSuccess = (currentState, action) => {
  return {
    ...currentState,
    id: action.id,
    fail: action.fail,
    loading: action.loading,
    refreshToken: action.refreshToken,
    start: action.start,
    success: action.success,
    token: action.token,
    authType: action.authType
  }
}

const authFail = (currentState, action) => {
  return {
    ...currentState,
    error: action.error,
    fail: action.fail,
    loading: action.loading,
    modal: {
      ...currentState.modal,
      login: false
    },
    start: action.false,
    success: action.success
  }
}

const authUser = (currentState, action) => {
  return {
    ...currentState,
    error: action.error
  }
}

const authLogIn = (currentState, action) => {
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

const authCert = (currentState, action) => {
  return {
    ...currentState,
    fail: action.fail,
    loading: action.loading,
    start: action.start,
    success: action.success,
    authType: action.authType,
    cert: action.cert
  }
}

const authReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return authStart(currentState, action)
    case actionTypes.AUTH_LOADING: return authLoading(currentState, action)
    case actionTypes.AUTH_SUCCESS: return authSuccess(currentState, action)
    case actionTypes.AUTH_FAIL: return authFail(currentState, action)
    case actionTypes.AUTH_LOGIN: return authLogIn(currentState, action)
    case actionTypes.AUTH_LOGOUT: return authLogOut(currentState, action)
    case actionTypes.AUTH_USER: return authUser(currentState, action)
    case actionTypes.AUTH_DELETE: return authDelete(currentState, action)
    case actionTypes.AUTH_REFRESH: return authRefresh(currentState, action)
    case actionTypes.AUTH_CERT: return authCert(currentState, action)
    default: return currentState
  }
}

export default authReducer
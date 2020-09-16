import * as actionTypes from '../actions/actionTypes'

const initialState = {
  authType: null,
  cert: false,
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
    authType: action.authType,
    cert: action.cert,
    error: action.error,
    fail: action.false,
    loading: action.loading,
    start: action.start,
    valid: action.valid
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
    token: action.token
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

const authSignUp = (currentState, action) => {
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
    authType: null,
    cert: false,
    id: null,
    refreshToken: null,
    token: null
  }
}

const authRefresh = (currentState, action) => {
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

const authDelete = (currentState, action) => {
  return {
    ...currentState,
    // error: action.error,
    // id: null,
    // refreshToken: null,
    // token: null
    authType: action.authType
  }
}

const authCert = (currentState, action) => {
  return {
    ...currentState,
    cert: action.cert,
    fail: action.fail,
    loading: action.loading,
    start: action.start,
    success: action.success
  }
}

const authValid = (currentState, action) => {
  return {
    ...currentState,
    loading: false,
    valid: action.valid
  }
}

const authClearState = (currentState, action) => {
  return {
    ...currentState,
    authType: action.authType,
    cert: action.cert,
    fail: action.fail,
    loading: action.loading,
    start: action.start,
    success: action.success,
    valid: action.valid
  }
}

const authClearCreds = (currentState, action) => {
  return {
    ...currentState,
    id: action.id,
    refreshToken: action.refreshToken,
    token: action.token
  }
}

const authReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.AUTH_START: return authStart(currentState, action)
    case actionTypes.AUTH_SUCCESS: return authSuccess(currentState, action)
    case actionTypes.AUTH_FAIL: return authFail(currentState, action)
    case actionTypes.AUTH_SIGNUP: return authSignUp(currentState, action)
    case actionTypes.AUTH_LOGIN: return authLogIn(currentState, action)
    case actionTypes.AUTH_LOGOUT: return authLogOut(currentState, action)
    case actionTypes.AUTH_REFRESH: return authRefresh(currentState, action)
    case actionTypes.AUTH_USER: return authUser(currentState, action)
    case actionTypes.AUTH_DELETE: return authDelete(currentState, action)
    case actionTypes.AUTH_CERT: return authCert(currentState, action)
    case actionTypes.AUTH_VALID: return authValid(currentState, action)
    case actionTypes.AUTH_CLEAR_STATE : return authClearState(currentState, action)
    case actionTypes.AUTH_CLEAR_CREDS : return authClearCreds(currentState, action)
    default: return currentState
  }
}

export default authReducer
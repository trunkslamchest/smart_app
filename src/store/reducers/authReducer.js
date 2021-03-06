import * as actionTypes from '../actions/actionTypes'

const initialState = {
  authType: null,
  status: null,
  status2: null,
  loading: false,
  errors: [],
  id: null,
  token: null,
  refreshToken: null,
  userCache: null,
  smartCache: null
}

const getSmarts = (currentState, action) => {
  return {
    ...currentState,
    smartCache: action.smartCache
  }
}

const clearSmartCache = (currentState) => {
  return {
    ...currentState,
    smartCache: null
  }
}

const authUpdateStatus = (currentState, action) => {
  return {
    ...currentState,
    status: action.status
  }
}

const authUpdateStatus2 = (currentState, action) => {
  return {
    ...currentState,
    status2: action.status2
  }
}

const authUpdateLoadingStatus = (currentState, action) => {
  return {
    ...currentState,
    loading: action.loading
  }
}

const authStart = (currentState, action) => {
  return {
    ...currentState,
    status: action.status,
    errors: [],
    authType: action.authType,
    loading: true
  }
}

const authSuccess = (currentState, action) => {
  return {
    ...currentState,
    id: action.id,
    token: action.token,
    refreshToken: action.refreshToken
  }
}

const authFail = (currentState, action) => {
  return {
    ...currentState,
    status: action.status,
    errors: [ ...currentState.errors, action.error ],
    loading: action.loading
  }
}

const authSignUp = (currentState, action) => {
  return {
    ...currentState,
    errors: [ ...currentState.errors, action.error ],
  }
}

const authLogIn = (currentState, action) => {
  return {
    ...currentState,
    errors: [ ...currentState.errors, action.error ],
  }
}

const authLogOut = (currentState, action) => {
  return {
    ...currentState,
    loading: action.loading
  }
}

const authRefresh = (currentState, action) => {
  return {
    ...currentState,
    errors: [ ...currentState.errors, action.error ],
  }
}

const authUser = (currentState, action) => {
  return {
    ...currentState,
    errors: action.error ? [ ...currentState.errors, action.error ] : [],
    userCache: action.userCache
  }
}

const authDelete = (currentState, action) => {
  return {
    ...currentState,
    authType: action.authType
  }
}

const authValid = (currentState, action) => {
  return {
    ...currentState,
    loading: false,
    valid: action.valid
  }
}

const clearAuthCreds = (currentState, action) => {
  return {
    ...currentState,
    id: action.id,
    refreshToken: action.refreshToken,
    token: action.token
  }
}

const clearAuthType = (currentState, action) => {
  return {
    ...currentState,
    authType: action.authType
  }
}

const clearAuthStatus = (currentState, action) => {
  return {
    ...currentState,
    errors: action.errors,
    status: action.status
  }
}

const clearAuthStatus2 = (currentState, action) => {
  return {
    ...currentState,
    errors: action.errors,
    status2: action.status2
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

const clearAuthErrors = (currentState, action) => {
  return {
    ...currentState,
    errors: action.errors
  }
}

const clearUserCache = (currentState, action) => {
  return {
    ...currentState,
    userCache: action.userCache
  }
}

const authReducer = (currentState = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_SMARTS: return getSmarts(currentState, action)
    case actionTypes.CLEAR_SMART_CACHE: return clearSmartCache(currentState, action)
    case actionTypes.AUTH_UPDATE_LOADING_STATUS: return authUpdateLoadingStatus(currentState, action)
    case actionTypes.AUTH_UPDATE_STATUS: return authUpdateStatus(currentState, action)
    case actionTypes.AUTH_UPDATE_STATUS2: return authUpdateStatus2(currentState, action)
    case actionTypes.AUTH_START: return authStart(currentState, action)
    case actionTypes.AUTH_SUCCESS: return authSuccess(currentState, action)
    case actionTypes.AUTH_FAIL: return authFail(currentState, action)
    case actionTypes.AUTH_SIGNUP: return authSignUp(currentState, action)
    case actionTypes.AUTH_LOGIN: return authLogIn(currentState, action)
    case actionTypes.AUTH_LOGOUT: return authLogOut(currentState, action)
    case actionTypes.AUTH_REFRESH: return authRefresh(currentState, action)
    case actionTypes.AUTH_USER: return authUser(currentState, action)
    case actionTypes.AUTH_DELETE: return authDelete(currentState, action)
    case actionTypes.AUTH_VALID: return authValid(currentState, action)
    case actionTypes.AUTH_CLEAR_STATE: return authClearState(currentState, action)
    case actionTypes.CLEAR_AUTH_CREDS: return clearAuthCreds(currentState, action)
    case actionTypes.CLEAR_AUTH_TYPE: return clearAuthType(currentState, action)
    case actionTypes.CLEAR_AUTH_STATUS: return clearAuthStatus(currentState, action)
    case actionTypes.CLEAR_AUTH_STATUS2: return clearAuthStatus2(currentState, action)
    case actionTypes.CLEAR_AUTH_ERRORS: return clearAuthErrors(currentState, action)
    case actionTypes.CLEAR_USER_CACHE: return clearUserCache(currentState, action)
    default: return currentState
  }
}

export default authReducer
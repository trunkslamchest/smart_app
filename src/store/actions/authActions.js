import * as actionTypes from './actionTypes'

import {
  fetch,
  auth
} from '../../utility/paths'

import {
  storeUserInfo,
  storeUserQuestions,
  updateUserInfo,
  clearUserInfo
} from './userActions'

import authFunctions from '../../utility/authFunctions'
import userFunctions from '../../utility/userFunctions'

import signUpObjTemplate from '../../templates/signUpObjTemplate'

export const authStart = (authType, obj) => {
  return dispatch => {
    if(authType === 'logIn') {
      dispatch(initAuth(authType))
      dispatch(authUpdateStatus('authUserGoogleStart', true))
      dispatch(authLogIn(authType, obj))
    }
    if(authType === 'signUp') {
      dispatch(initAuth(authType))
      dispatch(authUpdateStatus('authUserGoogleStart', true))
      dispatch(authSignUp(authType, obj))
    }
    if(authType === 'refresh') {
      dispatch(initAuth(authType))
      dispatch(authUpdateStatus('authUserGoogleStart', true))
      dispatch(authRefresh(authType, obj))
    }
    if(authType === 'logOut') {
      dispatch(initAuth(authType))
      dispatch(authUpdateStatus('initUserLogOut', true))
      dispatch(authLogOut(authType, obj))
    }
    if(authType === 'editProfile') {
      dispatch(initAuth(authType))
      dispatch(authUpdateStatus('initUserEdit', true))
      dispatch(updateUserInfo(authType, obj))
    }
    if(authType === 'deleteProfile') {
      dispatch(initAuth(authType))
      dispatch(authLogIn(authType, obj))
    }
  }
}

const initAuth = (authType) => {
  return {
    type: actionTypes.AUTH_START,
    error: null,
    authType: authType,
    loading: true,
  }
}

export const authUpdateLoadingStatus = (bool) => {
  return {
    type: actionTypes.AUTH_UPDATE_LOADING_STATUS,
    loading: bool
  }
}

export const authUpdateStatus = (status, loading) => {
  return {
    type: actionTypes.AUTH_UPDATE_STATUS,
    status: status,
    loading: loading
  }
}

export const authFail = (error) => {
  return dispatch => {
    let newMessage = '', newCode = 0

    if(error.message === 'EMAIL_NOT_FOUND') {
      newCode = 421
      newMessage = 'Email does not exist'
    } else if(error.message === 'EMAIL_EXISTS') {
      newCode = 422
      newMessage = 'Email already exists'
    } else if(error.message === 'INVALID_PASSWORD') {
      newCode = 423
      newMessage = 'Incorrect Password'
    } else if(error.message === 'USER_NOT_FOUND') {
      console.log(error)
      newCode = 424
      newMessage = 'User does not exist'
    } else if(error.message === 'TOO_MANY_ATTEMPTS_TRY_LATER : Too many unsuccessful login attempts. Please try again later.'){
      newCode = 440
      newMessage = 'Too many failed attempts. Please try again later'
    } else {
      newCode = error.code
      newMessage = error.message
    }

    dispatch(initAuthFail({ code: newCode, message: newMessage }))
  }
}

const initAuthFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    status: 'fail',
    error: error,
    loading: false,
  }
}

export const authSuccess = (authType, obj) => {
  return dispatch => {
    if(authType === 'logIn') {
      updateLocalStorage(obj)
      dispatch(authUpdateStatus('authUserGoogleSuccess', true))
      dispatch(authComplete(obj))
    }
    if(authType === 'signUp') {
      updateLocalStorage(obj)
      dispatch(authUpdateStatus('authUserGoogleSuccess', true))
      dispatch(createUser(obj))
    }
    if(authType === 'refresh') {
      updateLocalStorage(obj)
      dispatch(authUpdateStatus('authUserGoogleSuccess', true))
      dispatch(authComplete(obj))
    }
    if(authType === 'deleteProfile') {
      dispatch(authUpdateStatus('authUserGoogleSuccess', true))
      dispatch(authDelete(obj))
    }
  }
}

const authComplete = (obj) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    id: obj.id,
    token: obj.token,
    refreshToken: obj.refresh
  }
}

const updateLocalStorage = (obj) => {
  localStorage.access = 'normal'
  localStorage.id = obj.id
  localStorage.refreshToken = obj.refresh
  localStorage.token = obj.token
  localStorage.expiration = obj.expires
}

const createUser = (obj) => {
  return dispatch => {
    let id = obj.id, userObj = {}
    userObj[id] = signUpObjTemplate(obj.email, obj.user)
    userFunctions('post', fetch.post.user, userObj)
    .then(res => {
      dispatch(authUpdateStatus('createUserLocalSuccess', true))
      dispatch(authComplete(obj))
    })
  }
}

export const authUser = () => {
  return dispatch => {
    userFunctions('getUser', fetch.get.user, localStorage.id)
    .then(userRes => {
      if(userRes === null) localStorage.clear()
      // if(!!userRes.error) dispatch(authFail(userRes.error))
      else {
        console.log(userRes)
        dispatch(authUpdateStatus('authUserLocalSuccess', true))
        dispatch(storeUserInfo(userRes.info, userRes.experience, userRes.achievements))
        dispatch(storeUserQuestions(userRes.questions))
      }
    })
  }
}

export const authSignUp = (authType, obj) => {
  return dispatch => {
    authFunctions('signUp', auth.signUp, obj)
    .then(authRes => {
      if(!!authRes.error) dispatch(authFail(authRes.error))
      else dispatch(authSuccess(authType, {
        email: authRes.email,
        expires: authRes.expiresIn,
        id: authRes.localId,
        refresh: authRes.refreshToken,
        token: authRes.idToken,
        user: authRes.displayName
      }))
    })
  }
}

export const authLogIn = (authType, obj) => {
 return dispatch => {
    authFunctions('logIn', auth.signIn, obj)
    .then(authRes => {
      if(!!authRes.error) dispatch(authFail(authRes.error))
      else dispatch(authSuccess(authType, {
        email: authRes.email,
        expires: authRes.expiresIn,
        id: authRes.localId,
        refresh: authRes.refreshToken,
        token: authRes.idToken,
        user: authRes.displayName
      }))
    })
  }
}

export const authRefresh = (authType, obj) => {
  return dispatch => {
    authFunctions('refreshToken', auth.refreshToken, obj)
    .then(authRes => {
      if(!!authRes.error) dispatch(authFail(authRes.error))
      else dispatch(authSuccess(authType, {
        expires: authRes.expires_in,
        id: authRes.user_id,
        refresh: authRes.refresh_token,
        token: authRes.id_token
      }))
    })
  }
}

export const authDelete = (obj) => {
  return dispatch => {
    dispatch(authUpdateStatus('initDeleteAuthUser', true))
    const delObj = {
      displayName: obj.user,
      email: obj.email,
      expiresIn: obj.expires,
      localId: obj.id,
      idToken: obj.token,
      refreshToken: obj.refresh
    }

    authFunctions('delete', auth.delete, delObj)
    .then(authRes => {
        if(!!authRes.error) dispatch(authFail(authRes.error))
        else dispatch(authUpdateStatus('deleteAuthUserSuccess', true))
    })
  }
}

export const authLogOut = () => {
  return dispatch => {
    dispatch(authUpdateStatus('initClearUserInfo', true))
    dispatch(clearUserInfo())
  }
}

export const setAuthType = (authType) => {
  return {
    type: actionTypes.SET_AUTH_TYPE,
    authType: authType
  }
}

export const clearAuthType = () => {
  return {
    type: actionTypes.CLEAR_AUTH_TYPE,
    authType: null
  }
}

export const clearAuthStatus = () => {
  return {
    type: actionTypes.CLEAR_AUTH_STATUS,
    errors: [],
    status: null,
    loading: false
  }
}

export const clearAuthCreds = () => {
  return {
    type: actionTypes.CLEAR_AUTH_CREDS,
    status: 'clearAuthCredsSuccess',
    id: null,
    refreshToken: null,
    token: null
  }
}

export const clearAuthErrors = () => {
  return {
    type: actionTypes.CLEAR_AUTH_ERRORS,
    errors: []
  }
}

export const authCert = (bool) => {
  return {
    type: actionTypes.AUTH_CERT,
    fail: false,
    loading: true,
    start: false,
    success: false,
    cert: bool
  }
}

export const authValid = (bool) => {
  return {
    type: actionTypes.AUTH_VALID,
    loading: false,
    valid: bool
  }
}

export const authClearState = () => {
  return {
    type: actionTypes.AUTH_CLEAR_STATE,
    authType: null,
    fail: false,
    loading: false,
    start: false,
    success: false,
    cert: false,
    valid: false
  }
}

export const authTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_TIMEOUT,
    expirationTime: expirationTime
  }
}
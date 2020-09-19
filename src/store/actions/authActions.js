import * as actionTypes from './actionTypes'

import {
  fetch,
  auth
} from '../../utility/paths'

import {
  storeUserInfo,
  storeUserQuestions,
  clearUserInfo,
  clearUserQuestions,
  // deleteUser
} from './userActions'

import {
  clearQuestionTotals
} from './questionsActions'

import authFunctions from '../../utility/authFunctions'
import userFunctions from '../../utility/userFunctions'

import signUpObjTemplate from '../../templates/signUpObjTemplate'

export const authStart = (authType, obj) => {
  return dispatch => {
    // dispatch(initAuth(authType))
    // dispatch(authUpdateStatus('authUserGoogleStart', true))
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

    // if(authType === 'deleteProfile') dispatch(authLogIn(authType, obj))
  }
}

const initAuth = (authType) => {
  return {
    type: actionTypes.AUTH_START,
    authType: authType,
    loading: true,
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
  console.log(error)
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
    // if(authType === 'signUp') {
    //   updateLocalStorage(obj)
    //   dispatch(createUser(obj))
    // } else {
    //   updateLocalStorage(obj)
    //   dispatch(authComplete(obj))
    // }
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
        dispatch(authUpdateStatus('authUserLocalSuccess', true))
        dispatch(storeUserInfo(userRes.info))
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

export const authDelete = (props) => {
  return dispatch => {
    const obj = {
      localId: localStorage.id,
      idToken: localStorage.token,
      project: process.env.REACT_APP_FIREBASE_PROJECT_ID
    }

    authFunctions('delete', auth.delete, obj)
    .then(authRes => {
      if(authRes) dispatch(deleteUser({uid: localStorage.id}))
      // dispatch(setAuthTypeOnDelete('logOut'))
    })
  }
}

const deleteUser = (obj) => {
  return dispatch => {
    userFunctions('delete', fetch.delete.user, obj)
    .then(res => {
      if(res) dispatch(setAuthTypeOnDelete('deleted'))
    })
  }
}

const setAuthTypeOnDelete = (authType) => {
  return {
    type: actionTypes.AUTH_DELETE,
    authType: authType
  }
}

export const authLogOut = () => {
  localStorage.clear()
  localStorage.access = 'guest'
  return dispatch => {
    dispatch(initClearUserInfo())
    dispatch(initClearUserQuestions())
    dispatch(initClearQuestionTotals())
    dispatch(initClearAuthCreds())
    // dispatch(authClearState())
  }
}

const initClearUserInfo = () => {
  return dispatch => {
    dispatch(authUpdateStatus('initClearUserInfo', true))
    dispatch(clearUserInfo())
  }
}

const initClearUserQuestions = () => {
  return dispatch => {
    dispatch(authUpdateStatus('initClearUserQuestions', true))
    dispatch(clearUserQuestions())
  }
}

const initClearQuestionTotals = () => {
  return dispatch => {
    dispatch(authUpdateStatus('initClearQuestionTotals', true))
    dispatch(clearQuestionTotals())
  }
}

const initClearAuthCreds = () => {
  return dispatch => {
    dispatch(authUpdateStatus('initClearAuthCreds', true))
    dispatch(clearAuthCreds())
  }
}

export const clearAuthCreds = () => {
  return {
    type: actionTypes.CLEAR_AUTH_CREDS,
    id: null,
    refreshToken: null,
    token: null
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
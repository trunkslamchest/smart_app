import * as actionTypes from './actionTypes'

import {
  fetch
} from '../../utility/paths'

import userFunctions from '../../utility/userFunctions'
import authFunctions from '../../utility/authFunctions'

import logIn from '../../firebase/functions/logIn'
import signUp from '../../firebase/functions/signUp'
import updateDisplayName from '../../firebase/functions/updateDisplayName'
import updateEmail from '../../firebase/functions/updateEmail'
import logOut from '../../firebase/functions/logOut'
import reAuth from '../../firebase/functions/reAuth'
import deleteUser from '../../firebase/functions/deleteUser'

import signUpObjTemplate from '../../templates/signUpObjTemplate'

export const authStart = (authType, obj) => {
  return dispatch => {
    if(authType === 'logIn') {
      dispatch(initAuth(authType))
      dispatch(authLogIn(authType, obj))
    }
    if(authType === 'signUp') {
      dispatch(initAuth(authType))
      dispatch(authSignUp(authType, obj))
    }
    if(authType === 'refresh') {
      console.log("stop it. get some help.")
      dispatch(initAuth(authType))
      dispatch(authRefresh(authType, obj))
    }
    if(authType === 'logOut') {
      dispatch(initAuth(authType))
      dispatch(authLogOut(authType, obj))
    }
    if(authType === 'editProfileModal') {
      dispatch(initAuth(authType))
      dispatch(reAuthWithCreds(authType, obj))
    }
    if(authType === 'editProfile') {
      dispatch(initAuth(authType))
      let cacheObj = { uid: obj.uid, info: obj.info }
      if(obj.old_user_name) cacheObj = { ...cacheObj, old_user_name: obj.old_user_name }
      if(obj.old_user_name !== obj.info.user_name) dispatch(authUpdateDisplayName(obj.info.user_name))
      else dispatch(authUpdateStatus('skipAuthUpdate'))
      dispatch(cacheUser(cacheObj))
    }
    if(authType === 'deleteProfile') {
      dispatch(initAuth(authType))
      dispatch(reAuthWithCreds(authType, obj))
    }
  }
}

const initAuth = (authType) => {
  return {
    type: actionTypes.AUTH_START,
    status: 'initAuth',
    error: null,
    authType: authType,
    loading: true
  }
}

export const authUpdateLoadingStatus = (bool) => {
  return {
    type: actionTypes.AUTH_UPDATE_LOADING_STATUS,
    loading: bool
  }
}

export const authUpdateStatus = (status) => {
  return {
    type: actionTypes.AUTH_UPDATE_STATUS,
    status: status
  }
}

export const authUpdateStatus2 = (status2) => {
  return {
    type: actionTypes.AUTH_UPDATE_STATUS2,
    status2: status2
  }
}

export const authFail = (error) => {
  return dispatch => {
    let newMessage = '', newCode = 0

    if(error.code === 'auth/user-not-found') {
      newCode = 421
      newMessage = 'Email does not exist'
    } else if(error.code === 'auth/email-already-in-use') {
      newCode = 422
      newMessage = 'Email already exists'
    } else if(error.code === 'auth/wrong-password') {
      newCode = 423
      newMessage = 'Incorrect Password'
    } else if(error.code === 'auth/user-not-found') {
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

export const authSuccess = (authType, obj, updateObj) => {
  return dispatch => {
    if(authType === 'logIn') {
      updateLocalStorage(obj)
      dispatch(authComplete(obj))
    }
    if(authType === 'signUp') {
      updateLocalStorage(obj)
      dispatch(authUpdateDisplayName(obj.displayName))
      dispatch(createUser(obj))
    }
    if(authType === 'refresh') {
      updateLocalStorage(obj)
      dispatch(authComplete(obj))
    }
    if(authType === 'editProfileModal') {
      updateLocalStorage(obj)
    }
    if(authType === 'editProfile') {
      updateLocalStorage(obj)
      dispatch(authEditUser(authType, obj, updateObj))
    }
    if(authType === 'deleteProfile') {
      updateLocalStorage(obj)
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
    userObj[id] = signUpObjTemplate(obj.email, obj.displayName)
    userFunctions('post', fetch.post.user, userObj)
    .then(() => {
      dispatch(authComplete(obj))
    })
  }
}

export const authUser = () => {
  return dispatch => {
    userFunctions('getUser', fetch.get.user, localStorage.id)
    .then(resObj => {
      if(resObj === null) localStorage.clear()
      if(resObj.error) dispatch(authFail(resObj))
      else {
        dispatch(cacheUser(resObj))
      }
    })
  }
}

export const getSmarts = (user_name) => {
  let obj = user_name ? { user_name: user_name } : { id: localStorage.id }
  return dispatch => {
    authFunctions('getSmarts', fetch.get.smarts, obj)
    .then(resObj => {
      if(resObj === null) localStorage.clear()
      if(resObj.error) dispatch(authFail(resObj))
      else {
        dispatch(cacheSmarts(resObj))
      }
    })
  }
}

const cacheSmarts = (res) => {
  return {
    type: actionTypes.GET_SMARTS,
    smartCache: res
  }
}

export const clearSmartCache = () => {
  return {
    type: actionTypes.CLEAR_SMART_CACHE
  }
}

export const cacheUser = (user) => {
  return {
    type: actionTypes.AUTH_USER,
    userCache: user
  }
}

export const authSignUp = (authType, obj) => {
  return dispatch => {
    signUp(obj.email, obj.password)
    .then((resObj) => {
      if(resObj.error) {
        dispatch(authFail(resObj))
      } else {
        let userObj = {
          displayName: obj.displayName,
          id: resObj.uid,
          email: resObj.email,
          refresh: resObj.refreshToken,
          token: resObj.za,
          creationTime: resObj.metadata.creationTime,
          lastSignInTime: resObj.metadata.lastSignInTime,
          expires: "360000"
        }
        dispatch(authSuccess(authType, userObj))
      dispatch(authUpdateStatus('createAuthUserSuccess'))
      }
    })
  }
}

const authUpdateDisplayName = (displayName) => {
  return dispatch => {
    updateDisplayName(displayName)
    .then((resObj) => {
      if(resObj.error) {
        dispatch(authFail(resObj))
      } else {
        dispatch(authUpdateStatus('updateAuthDisplayNameSuccess'))
      }
    })
  }
}

export const authLogIn = (authType, obj) => {
  return dispatch => {
    logIn(obj.email, obj.password)
    .then((resObj) => {
      if(resObj.error) {
        dispatch(authFail(resObj))
      } else {
        let userObj = {
          displayName: obj.displayName,
          id: resObj.uid,
          email: resObj.email,
          refresh: resObj.refreshToken,
          token: resObj.za,
          creationTime: resObj.metadata.creationTime,
          lastSignInTime: resObj.metadata.lastSignInTime,
          expires: "360000"
        }
        dispatch(authSuccess(authType, userObj))
      dispatch(authUpdateStatus('authLogInSuccess'))
      }
    })
  }
}

export const authRefresh = (authType, obj) => {
  return dispatch => {
    dispatch(authSuccess(authType, obj))
    dispatch(authUpdateStatus('authRefreshSuccess'))
  }
}

export const authEditUser = (authType, obj) => {
 return dispatch => {
    if(obj.old_user_name !== obj.info.user_name){
      updateDisplayName(obj.info.user_name)
      .then((resObj) => {
        if(resObj.error) {
          dispatch(authFail(resObj))
        } else {
          dispatch(authUpdateStatus('updateAuthDisplayNameSuccess'))
        }
      })
    }
    if(obj.old_email !== obj.info.email){
      updateEmail(obj.info.email)
      .then((resObj) => {
        if(resObj.error) {
          dispatch(authFail(resObj))
        } else {
          dispatch(authUpdateStatus2('updateAuthEmailSuccess'))
        }
      })
    }
  }
}

export const reAuthWithCreds = (authType, obj) => {
  return dispatch => {
    reAuth(obj.email, obj.password)
    .then((resObj) => {
      if(resObj.error) {
        dispatch(authFail(resObj))
      } else {
        let userObj = {
          displayName: obj.displayName,
          id: resObj.user.uid,
          email: resObj.user.email,
          refresh: resObj.user.refreshToken,
          token: resObj.user.za,
          creationTime: resObj.user.metadata.creationTime,
          lastSignInTime: resObj.user.metadata.lastSignInTime,
          expires: "360000"
        }
        dispatch(authSuccess(authType, userObj))
        dispatch(authUpdateStatus('reAuthWithCredsSuccess'))
      }
    })
  }
}

export const authDelete = () => {
  return dispatch => {
    deleteUser()
    .then((resObj) => {
      if(resObj.error) {
        dispatch(authFail(resObj))
      } else {
        dispatch(authUpdateStatus('deleteAuthUserSuccess', true))
      }
    })
  }
}

export const authLogOut = () => {
  return dispatch => {
    logOut()
    .then(() => {
      dispatch(localLogOut)
    })
  }
}

const localLogOut = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
    loading: true
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
    status: null
  }
}

export const clearAuthStatus2 = () => {
  return {
    type: actionTypes.CLEAR_AUTH_STATUS2,
    errors: [],
    status2: null
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

export const clearAuthErrors = () => {
  return {
    type: actionTypes.CLEAR_AUTH_ERRORS,
    errors: []
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

export const clearUserCache = () => {
  return {
    type: actionTypes.CLEAR_USER_CACHE,
    userCache: null
  }
}
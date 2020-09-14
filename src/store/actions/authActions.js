import * as actionTypes from './actionTypes'

import { fetch, auth } from '../../utility/paths'

import {
  storeUserInfo,
  storeUserQuestions,
  clearUserInfo,
  clearUserQuestions
} from './userActions'

import {
  clearQuestionTotals
} from './questionsActions'

import authFunctions from '../../utility/authFunctions'
import userFunctions from '../../utility/userFunctions'

import signUpObjTemplate from '../../templates/signUpObjTemplate'

export const authStart = (authType, obj) => {
  return dispatch => {
    dispatch(initAuth(authType))
    if(authType === 'signUp') dispatch(authSignUp(authType, obj))
    if(authType === 'logIn') dispatch(authLogIn(authType, obj))
    if(authType === 'refresh') dispatch(authRefresh(authType, obj))
  }
}

const initAuth = (authType) => {
  return {
    type: actionTypes.AUTH_START,
    error: null,
    start: true,
    loading: true,
    authType: authType
  }
}

export const authFail = (error) => {
  // console.log(error)
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
    loading: false,
    start: false,
    fail: true,
  }
}

export const authSuccess = (authType, obj) => {
  return dispatch => {

    if(authType === 'signUp') {
      updateLocalStorage(obj)
      dispatch(createUser(obj))
    }

    if(authType === 'logIn') {
      updateLocalStorage(obj)
      dispatch(authComplete(obj))
    }

    if(authType === 'refresh') {
      updateLocalStorage(obj)
      dispatch(authComplete(obj))
    }
  }
}

const updateLocalStorage = (obj) => {
  localStorage.access = 'normal'
  localStorage.id = obj.id
  localStorage.refreshToken = obj.refresh
  localStorage.token = obj.token
  localStorage.expiration = obj.expires
}

const createUser = (obj, props) => {
  return dispatch => {
    let id = obj.id
    let userObj = {}

    userObj[id] = signUpObjTemplate(obj.email, obj.user)

    userFunctions('post', fetch.post.user, userObj)
    .then(res => {
      dispatch(authComplete(obj))
    })
  }
}

const authComplete = (obj) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    id: obj.id,
    fail: false,
    loading: true,
    refreshToken: obj.refresh,
    start: false,
    success: true,
    token: obj.token
  }
}

export const authUser = () => {
  return dispatch => {
    userFunctions('getUser', fetch.get.user, localStorage.id)
    .then(userRes => {
      if(userRes === null) localStorage.clear()
      // if(!!userRes.error) dispatch(authFail(userRes.error))
      else {
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
      // console.log(authRes)
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
      // console.log(authRes)
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
      // console.log(authRes)
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

export const authLogOut = () => {

  localStorage.clear()
  localStorage.access = 'guest'

  return dispatch => {
    dispatch(clearUserInfo())
    dispatch(clearUserQuestions())
    dispatch(clearQuestionTotals())
    dispatch(authClearState())
    dispatch(authClearCreds())
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

export const authClearCreds = () => {
  return {
    type: actionTypes.AUTH_CLEAR_CREDS,
    id: null,
    refreshToken: null,
    token: null
  }
}

export const authDelete = (props) => {

  // let id = props.auth.id, token = props.auth.token, project = process.env.REACT_APP_FIREBASE_PROJECT_ID
  // let token = props.auth.token,
  // id = props.auth.id

  let refreshObj = {
    grant_type: "refresh_token",
    refresh_token: localStorage.refreshToken
  }

  return dispatch => {
    dispatch(authStart())
    authFunctions('refreshToken', auth.refreshToken, refreshObj)
    .then(authRes => {
      if(authRes.user_id && authRes.id_token) {
        const obj = {
          localId: authRes.user_id,
          idToken: authRes.id_token,
          // targetProjectId: project
        }
        authFunctions('delete', auth.delete, obj)
        .then(res => {
          console.log(res)
          // dispatch(deleteUser(obj, props))
          // if(res) dispatch(authLogOut(props))
        })
      }
    })
  }
}

export const authTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_TIMEOUT,
    expirationTime: expirationTime
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
import * as actionTypes from './actionTypes'

import { fetch, auth } from '../../utility/paths'

import { storeUserInfo, storeUserQuestions } from './userActions'

// import getTime from '../../utility/getTime'
import authFunctions from '../../utility/authFunctions'
import userFunctions from '../../utility/userFunctions'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, refreshToken, id, expires) => {
  localStorage.access = 'normal'
  localStorage.id = id
  localStorage.refreshToken = refreshToken
  localStorage.token = token
  localStorage.expiration = expires

  return {
    type: actionTypes.AUTH_SUCCESS,
    id: id,
    refreshToken: refreshToken,
    token: token
  }
}

export const authFail = (error) => {
  console.log(error)
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const authLogOut = () => {

  // localStorage.removeItem('token')
  // localStorage.removeItem('refreshToken')
  // localStorage.removeItem('id')
  localStorage.clear()
  localStorage.access = 'guest'

  return {
    type: actionTypes.AUTH_LOGOUT,
    id: null,
    refreshToken: null,
    token: null
  }
}

export const authRefresh = (refreshObj) => {
  return dispatch => {
    authFunctions('refreshToken', auth.refreshToken, refreshObj)
      .then(authRes => {
        userFunctions('user', fetch.get.user, authRes.user_id)
        .then(userRes => {
          dispatch(authSuccess(authRes.id_token, authRes.refresh_token, authRes.user_id, authRes.expires_in))
          dispatch(storeUserInfo(userRes.info))
          dispatch(storeUserQuestions(userRes.questions))
        })
      })
  }
}

export const authUser = (token, refreshToken, id, expires) => {
  return dispatch => {
      userFunctions('user', fetch.get.user, id)
      .then(userRes => {
        dispatch(authSuccess(token, refreshToken, id, expires))
        dispatch(storeUserInfo(userRes.info))
        dispatch(storeUserQuestions(userRes.questions))
      })
    // const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
    // localStorage.setItem('expirationDate', expirationDate)
    // dispatch(checkAuthTimeout(response.data.expiresIn))
  }
}

export const authTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_TIMEOUT,
    expirationTime: expirationTime
  }
}
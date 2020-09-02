import * as actionTypes from './actionTypes'

import { routes, fetch, auth } from '../../utility/paths'

import { storeUserInfo, storeUserQuestions, clearUserInfo, clearUserQuestions } from './userActions'

// import getTime from '../../utility/getTime'
import authFunctions from '../../utility/authFunctions'
import userFunctions from '../../utility/userFunctions'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
    error: null,
    loading: true
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
    loading: false,
    refreshToken: refreshToken,
    token: token
  }
}

export const authFail = (error) => {
  console.log(error)
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
    loading: false
  }
}

export const authLogOut = (props) => {

  localStorage.clear()
  localStorage.access = 'guest'

  return dispatch => {
    dispatch(clearUserInfo())
    dispatch(clearUserQuestions())
    dispatch(clearAuthInfo())
    props.history.push( routes.home )
  }
}

const clearAuthInfo = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
    id: null,
    refreshToken: null,
    token: null
  }
}

export const authRefresh = (refreshObj) => {
  return dispatch => {
    dispatch(authStart())
    authFunctions('refreshToken', auth.refreshToken, refreshObj)
      .then(authRes => {
        userFunctions('getUser', fetch.get.user, authRes.user_id)
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
    dispatch(authStart())
    userFunctions('getUser', fetch.get.user, id)
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

export const authDelete = (props) => {

  // let id = props.auth.id, token = props.auth.token, project = process.env.REACT_APP_FIREBASE_PROJECT_ID
  let token = props.auth.token

  const obj = {
    // localId: id,
    idToken: token,
    // targetProjectId: project
  }

  return dispatch => {
    dispatch(authStart())
    authFunctions('delete', auth.delete, obj)
    .then(res => {
      if(res) dispatch(authLogOut(props))
    })
  }
}

export const authTimeout = (expirationTime) => {
  return {
    type: actionTypes.AUTH_TIMEOUT,
    expirationTime: expirationTime
  }
}
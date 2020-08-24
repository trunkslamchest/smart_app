// import * as actionTypes from './actionTypes'
import { authUser, authFail } from './authActions'

import { routes, auth } from '../../utility/paths'

import authFunctions from '../../utility/authFunctions'

export const logInUser = (email, password, props) => {
  return dispatch => {
    let logInObj = {
      email: email,
      password: password,
  		returnSecureToken: true
    }

    authFunctions('logIn', auth.signIn, logInObj)
    .then(res => {
      if(!!res.error) {
        dispatch(authFail(res.error))
      } else {
        dispatch(authUser(res.idToken, res.refreshToken, res.localId, res.expiresIn))
        if (!!props.onLoginModal) props.onLoginModal(false)
        else props.onSignupModal(false)
        props.history.push( routes.dashboard )
      }
    })
  }
}
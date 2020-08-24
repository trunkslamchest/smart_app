import * as actionTypes from './actionTypes'
import { authUser, authFail, authSuccess } from './authActions'

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
          dispatch(authUser(res.idToken, res.refreshToken, res.localId))
          if (!!props.onLoginModal) props.onLoginModal(false)
          else props.onSignupModal(false)
          props.history.push( routes.dashboard )
        }
        // const expirationDate = getTime('now') + res.data.expiresIn * 1000
        // console.log(!!res.error)
      })
  // 	dispatch(authStart())
  // 	const authData = {
  // 		email: email,
  // 		password: password,
  // 		returnSecureToken: true
  // 	}
  // 	let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=NOPE'
  // 	if(!signup){
  // 		url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=NOPE'
  // 	}
  // 	axios.post(url, authData)
  // 		.then(response => {
  // 			console.log(response)
  // 			const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
  // 			localStorage.setItem('token', response.data.idToken)
  // 			localStorage.setItem('expirationDate', expirationDate)
  // 			localStorage.setItem('userId', response.data.localId)
  // 			dispatch(authSuccess(response.data.idToken, response.data.localId))
  // 			dispatch(checkAuthTimeout(response.data.expiresIn))
  // 		})
  // 		.catch(error => {
  // 			// console.log(error.response.data.error.message.split('_').join(' '))
  // 			// const parseErrorMessage = error.response.data.error.message.split('_').join(' ')
  // 			dispatch(authFail(error.response.data.error))
  // 		})
  }
  // return {
  //   type: actionTypes.AUTH_USER,
  //   email: email,
  //   password: password
  // }
}
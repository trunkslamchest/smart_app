import * as actionTypes from './actionTypes'
import { logInUser } from './logInActions'
import { authUser, authFail, authSuccess } from './authActions'

import { routes, auth } from '../../utility/paths'

import authFunctions from '../../utility/authFunctions'

export const signUpUser = (username, email, password, props) => {
  return dispatch => {
    let signUpObj = {
      displayName: username,
      email: email,
      password: password,
      returnSecureToken: true
    }

    authFunctions('signUp', auth.signUp, signUpObj)
      .then(res => {
        if(!!res.error) {
          dispatch(authFail(res.error))
        } else {
          // console.log(res)
          // props.onSignupModal(false)
          dispatch(logInUser(email, password, props))
        }
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
import * as actionTypes from './actionTypes'

import { auth } from '../../utility/paths'

import authFunctions from '../../utility/authFunctions'

export const signUpStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const signUpSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const signUpFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const signUpUser = (username, email, password) => {
  return dispatch => {
    let signUpObj = {
      displayName: username,
      email: email,
      password: password
    }

    authFunctions('signUp', auth.signUp, signUpObj)
      .then(res => {
        console.log(res)
      })
      // .catch(error => {
      //   // console.log(error.response.data.error.message.split('_').join(' '))
      //   // const parseErrorMessage = error.response.data.error.message.split('_').join(' ')
      //   dispatch(authFail(error.response.data.error))
      // })
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
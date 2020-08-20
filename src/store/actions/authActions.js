import * as actionTypes from './actionTypes'

import { auth } from '../../utility/paths'

import authFunctions from '../../utility/authFunctions'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const authUser = (email, password, signup) => {
  return dispatch => {
    let logInObj = {
      email: email,
      password: password
    }

    authFunctions('logIn', auth.signIn, logInObj)
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
  // 	let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB_7qitu7-JaNR20IU7XibHYsV1B3EJP94'
  // 	if(!signup){
  // 		url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB_7qitu7-JaNR20IU7XibHYsV1B3EJP94'
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
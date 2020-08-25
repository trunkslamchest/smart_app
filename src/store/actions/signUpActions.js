// import * as actionTypes from './actionTypes'
import { logInUser } from './logInActions'
import { authFail } from './authActions'
import { storeUserInfo, storeUserQuestions } from './userActions'

import { auth, fetch } from '../../utility/paths'

import authFunctions from '../../utility/authFunctions'
import userFunctions from '../../utility/userFunctions'

export const signUpUser = (signUpObj, props) => {
  return dispatch => {
    authFunctions('signUp', auth.signUp, signUpObj)
    .then(res => {
      if(!!res.error) {
        dispatch(authFail(res.error))
      } else {
        var id = res.localId
        let userObj = {}

        userObj[id] = {
          info: {
            dob: {
              day: '',
              month: '',
              year: ''
            },
            email: signUpObj.email,
            first_name: '',
            gender: '',
            last_name: '',
            user_name: signUpObj.displayName
          },
          questions: {
            questionId: {
              question: '',
              answer: '',
              correct_answer: '',
              time: 0,
              vote: '',
              comment: '',
            }
          }
        }

        userFunctions('post', fetch.post.user, userObj)
        .then(res => {
          dispatch(storeUserInfo(res[id].info))
          dispatch(storeUserQuestions(res[id].questions))
          dispatch(logInUser(signUpObj.email, signUpObj.password, props))
          props.onSignupModal(false)
        })
      }
    })
  }
}
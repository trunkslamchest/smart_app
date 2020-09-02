// import * as actionTypes from './actionTypes'
import { logInUser } from './logInActions'
import { authFail } from './authActions'
import { storeUserInfo, storeUserQuestions } from './userActions'

import {
auth,
fetch
} from '../../utility/paths'

import signUpObjTemplate from '../../templates/signUpObjTemplate'

import authFunctions from '../../utility/authFunctions'
import userFunctions from '../../utility/userFunctions'
// import getTime from '../../utility/getTime'

export const signUpUser = (signUpObj, props) => {
  return dispatch => {
    authFunctions('signUp', auth.signUp, signUpObj)
    .then(res => {
      if(!!res.error) {
        dispatch(authFail(res.error))
      } else {
        let id = res.localId
        let userObj = {}

        userObj[id] = signUpObjTemplate(signUpObj.email, signUpObj.displayName)

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
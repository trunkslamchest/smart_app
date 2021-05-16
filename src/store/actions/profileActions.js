import * as actionTypes from './actionTypes'

// import { fetch } from '../../utility/paths'
// import userFunctions from '../../utility/userFunctions'

// export const getUserProfile = (user_name) => {
//   return dispatch => {
//     userFunctions('getUserProfile', fetch.post.userProfile, user_name)
//     .then(res => {
//       dispatch(initGetUserProfile(res))
//     })
//   }
// }

export const storeUserProfile = (user) => {
  return {
    type: actionTypes.STORE_USER_PROFILE,
    userData: user
  }
}

// const initGetUserProfile = (res) => {
//   return {
//     type: actionTypes.GET_USER_PROFILE,
//     userData: res
//   }
// }

export const clearUserProfile = () => {
  return {
    type: actionTypes.CLEAR_USER_PROFILE,
    userData: null
  }
}

export const updateUserProfileStatus = (status) => {
  return {
    type: actionTypes.UPDATE_USER_PROFILE_STATUS,
    status: status
  }
}

export const updateUserProfileLoadingStatus = (bool) => {
  return {
    type: actionTypes.UPDATE_USER_PROFILE_LOADING_STATUS,
    loading: bool
  }
}
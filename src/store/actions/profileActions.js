import * as actionTypes from './actionTypes'

export const storeUserProfile = (user) => {
  return {
    type: actionTypes.STORE_USER_PROFILE,
    userData: user
  }
}

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
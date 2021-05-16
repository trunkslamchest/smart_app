import * as actionTypes from '../actions/actionTypes'

const initialState = {
  userData: null,
  status: null,
  loading: false
}

// const getUserProfile = (currentState, action) => {
//   return {
//     ...currentState,
//     userData: action.userData
//   }
// }

const storeUserProfile = (currentState, action) => {
  return {
    ...currentState,
    userData: action.userData
  }
}

const clearUserProfile = (currentState, action) => {
  return {
    ...currentState,
    userData: null
  }
}

const updateUserProfileStatus = (currentState, action) => {
  return {
    ...currentState,
    status: action.status
  }
}

const updateUserProfileLoadingStatus = (currentState, action) => {
  return {
    ...currentState,
    loading: action.loading
  }
}

export const profileReducer = (currentState = initialState, action) => {
  switch(action.type) {
    // case actionTypes.GET_USER_PROFILE: return getUserProfile(currentState, action);
    case actionTypes.STORE_USER_PROFILE: return storeUserProfile(currentState, action);
    case actionTypes.CLEAR_USER_PROFILE: return clearUserProfile(currentState, action);
    case actionTypes.UPDATE_USER_PROFILE_STATUS: return updateUserProfileStatus(currentState, action);
    case actionTypes.UPDATE_USER_PROFILE_LOADING_STATUS: return updateUserProfileLoadingStatus(currentState, action);
    default: return currentState;
  }
}

export default profileReducer
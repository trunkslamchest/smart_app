import * as actionTypes from './actionTypes'

export const login = (bool) => {
  return{
    type: actionTypes.LOGINMODAL,
    login: bool
  }
}

export const logout = (bool) => {
  return{
    type: actionTypes.LOGOUTMODAL,
    logout: bool
  }
}

export const signup = (bool) => {
  return{
    type: actionTypes.SIGNUPMODAL,
    signup: bool
  }
}

export const deleteProfile = (bool) => {
  return {
    type: actionTypes.DELETEPROFILEMODAL,
    deleteProfile: bool
  }
}

export const showModal = (bool) => {
  return{
    type: actionTypes.SHOWMODAL,
    showModal: bool
  }
}
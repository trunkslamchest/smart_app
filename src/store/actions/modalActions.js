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
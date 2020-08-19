import * as actionTypes from '../actions/actionTypes'

const initialState = {
  login: false,
  logout: false,
  signup: false,
}

const loginModal = (currentState, action) => {
  return{
    ...currentState,
    login: action.login
  }
}

const logoutModal = (currentState, action) => {
  return{
    ...currentState,
    logout: action.logout
  }
}

const signupModal = (currentState, action) => {
  return{
    ...currentState,
    signup: action.signup
  }
}

const modalReducer = (currentState = initialState, action) => {
  switch(action.type){
    case actionTypes.LOGINMODAL: return loginModal(currentState, action)
    case actionTypes.LOGOUTMODAL: return logoutModal(currentState, action)
    case actionTypes.SIGNUPMODAL: return signupModal(currentState, action)
    default: return currentState
  }
}

export default modalReducer
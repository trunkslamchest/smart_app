import * as actionTypes from '../actions/actionTypes'

const initialState = {
  login: false,
  logout: false,
  signup: false,
  showModal: false
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

const showModal = (currentState, action) => {
  return{
    ...currentState,
    showModal: action.showModal
  }
}

const modalReducer = (currentState = initialState, action) => {
  switch(action.type){
    case actionTypes.LOGINMODAL: return loginModal(currentState, action)
    case actionTypes.LOGOUTMODAL: return logoutModal(currentState, action)
    case actionTypes.SIGNUPMODAL: return signupModal(currentState, action)
    case actionTypes.SHOWMODAL: return signupModal(currentState, action)
    default: return currentState
  }
}

export default modalReducer
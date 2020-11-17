import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  login: false,
  logout: false,
  signup: false,
  deleteProfile: false,
  help: false,
  showModal: false
}

const loadingModal = (currentState, action) => {
  return {
    ...currentState,
    loading: action.loading
  }
}

const loginModal = (currentState, action) => {
  return {
    ...currentState,
    login: action.login
  }
}

const logoutModal = (currentState, action) => {
  return {
    ...currentState,
    logout: action.logout
  }
}

const signupModal = (currentState, action) => {
  return {
    ...currentState,
    signup: action.signup
  }
}

const deleteProfileModal = (currentState, action) => {
  return {
    ...currentState,
    deleteProfile: action.deleteProfile
  }
}

const helpModal = (currentState, action) => {
  return {
    ...currentState,
    help: action.help
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
    case actionTypes.LOADINGMODAL: return loadingModal(currentState, action)
    case actionTypes.LOGINMODAL: return loginModal(currentState, action)
    case actionTypes.LOGOUTMODAL: return logoutModal(currentState, action)
    case actionTypes.SIGNUPMODAL: return signupModal(currentState, action)
    case actionTypes.DELETEPROFILEMODAL: return deleteProfileModal(currentState, action)
    case actionTypes.HELPMODAL: return helpModal(currentState, action)
    case actionTypes.SHOWMODAL: return showModal(currentState, action)
    default: return currentState
  }
}

export default modalReducer
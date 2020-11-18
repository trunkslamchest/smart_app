import * as actionTypes from '../actions/actionTypes'

const initialState = {
  showModal: false,
  loading: false,
  login: false,
  logout: false,
  signup: false,
  deleteProfile: false,
  help: false,
  helpHeader: null,
  helpSections: null
}

const showModal = (currentState, action) => {
  return{
    ...currentState,
    showModal: action.showModal
  }
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

const setHelpHeader = (currentState, action) => {
  return {
    ...currentState,
    helpHeader: action.helpHeader
  }
}

const clearHelpHeader = (currentState, action) => {
  return {
    ...currentState,
    helpHeader: action.helpHeader
  }
}

const setHelpSections = (currentState, action) => {
  return {
    ...currentState,
    helpSections: action.helpSections
  }
}

const clearHelpSections = (currentState, action) => {
  return {
    ...currentState,
    helpSections: action.helpSections
  }
}

const modalReducer = (currentState = initialState, action) => {
  switch(action.type){
    case actionTypes.SHOWMODAL: return showModal(currentState, action)
    case actionTypes.LOADINGMODAL: return loadingModal(currentState, action)
    case actionTypes.LOGINMODAL: return loginModal(currentState, action)
    case actionTypes.LOGOUTMODAL: return logoutModal(currentState, action)
    case actionTypes.SIGNUPMODAL: return signupModal(currentState, action)
    case actionTypes.DELETEPROFILEMODAL: return deleteProfileModal(currentState, action)
    case actionTypes.HELPMODAL: return helpModal(currentState, action)
    case actionTypes.SET_HELP_HEADER: return setHelpHeader(currentState, action)
    case actionTypes.CLEAR_HELP_HEADER: return clearHelpHeader(currentState, action)
    case actionTypes.SET_HELP_SECTIONS: return setHelpSections(currentState, action)
    case actionTypes.CLEAR_HELP_SECTIONS: return clearHelpSections(currentState, action)
    default: return currentState
  }
}

export default modalReducer
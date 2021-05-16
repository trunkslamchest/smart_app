import * as actionTypes from './actionTypes'

export const showModal = (bool) => {
  return{
    type: actionTypes.SHOWMODAL,
    showModal: bool
  }
}

export const basic = (bool) => {
  return {
    type: actionTypes.BASICMODAL,
    basic: bool
  }
}

export const loading = (bool) => {
  return {
    type: actionTypes.LOADINGMODAL,
    loading: bool
  }
}

export const login = (bool) => {
  return {
    type: actionTypes.LOGINMODAL,
    login: bool
  }
}

export const logout = (bool) => {
  return {
    type: actionTypes.LOGOUTMODAL,
    logout: bool
  }
}

export const signup = (bool) => {
  return {
    type: actionTypes.SIGNUPMODAL,
    signup: bool
  }
}

export const editProfile = (bool) => {
  return {
    type: actionTypes.EDITPROFILEMODAL,
    editProfile: bool
  }
}

export const deleteProfile = (bool) => {
  return {
    type: actionTypes.DELETEPROFILEMODAL,
    deleteProfile: bool
  }
}

export const help = (bool) => {
  return {
    type: actionTypes.HELPMODAL,
    help: bool
  }
}

export const setHelpHeader = (header) => {
  return {
    type: actionTypes.SET_HELP_HEADER,
    helpHeader: header
  }
}

export const clearHelpHeader = () => {
  return {
    type: actionTypes.CLEAR_HELP_HEADER,
    helpHeader: null
  }
}

export const setHelpSections = (sections) => {
  return {
    type: actionTypes.SET_HELP_SECTIONS,
    helpSections: sections
  }
}

export const clearHelpSections = () => {
  return {
    type: actionTypes.CLEAR_HELP_SECTIONS,
    helpSections: null
  }
}
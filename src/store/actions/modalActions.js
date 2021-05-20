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
    showModal: bool,
    basic: bool
  }
}

export const setBasicModalContent = (content) => {
  return {
    type: actionTypes.SET_BASIC_MODAL_CONTENT,
    basicModalContent: content
  }
}

export const loading = (bool) => {
  return {
    type: actionTypes.LOADINGMODAL,
    showModal: bool,
    loading: bool
  }
}

export const setLoadingModalType = (modalType, barType) => {
  return {
    type: actionTypes.SET_LOADING_MODAL_TYPE,
    loadingModalType: modalType,
    loadingModalBarType: barType
  }
}

export const login = (bool) => {
  return {
    type: actionTypes.LOGINMODAL,
    showModal: bool,
    login: bool
  }
}

export const logout = (bool) => {
  return {
    type: actionTypes.LOGOUTMODAL,
    showModal: bool,
    logout: bool
  }
}

export const signup = (bool) => {
  return {
    type: actionTypes.SIGNUPMODAL,
    showModal: bool,
    signup: bool
  }
}

export const editProfile = (bool) => {
  return {
    type: actionTypes.EDITPROFILEMODAL,
    showModal: bool,
    editProfile: bool
  }
}

export const deleteProfile = (bool) => {
  return {
    type: actionTypes.DELETEPROFILEMODAL,
    showModal: bool,
    deleteProfile: bool
  }
}

export const help = (bool) => {
  return {
    type: actionTypes.HELPMODAL,
    showModal: bool,
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
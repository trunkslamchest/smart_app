import React from 'react'
import { connect } from 'react-redux'

import BasicModal from '../../UI/modal/basicModal/basicModal'
import LoadingModal from '../../UI/loading/loadingModal/loadingModal'
import LogIn from '../../UI/modal/logIn/logIn'
import SignUp from '../../UI/modal/signUp/signUp'
import LogOut from '../../UI/modal/logOut/logOut'
import DeleteProfile from '../../UI/modal/deleteProfile/deleteProfile'
import EditProfile from '../../UI/modal/editProfile/editProfile'
import Help from '../../UI/modal/help/help'

const ModalController = (props) => {
  return(
    <>
      { props.basicModal && <BasicModal content={ props.basicModalContent } /> }
      { props.logInModal && <LogIn /> }
      { props.logOutModal && <LogOut /> }
      { props.signUpModal && <SignUp /> }
      { props.editProfileModal && <EditProfile /> }
      { props.deleteProfileModal && <DeleteProfile /> }
      { props.helpModal &&
        <Help
          headerText={ props.helpModalHeader }
          helpSections = { props.helpModalSections }
        />
      }
      {
        props.loadingModal &&
        <LoadingModal
          show={ props.loadingModal }
          modalType={ props.loadingModalType }
          barType={ props.loadingModalBarType }
        />
      }
    </>
  )
}

const store = (store) => {
  return {
    showModal: store.modal.showModal,
    basicModal: store.modal.basic,
    basicModalContent: store.modal.basicModalContent,
    loadingModal: store.modal.loading,
    loadingModalType: store.modal.loadingModalType,
    loadingModalBarType: store.modal.loadingModalBarType,
    logInModal: store.modal.login,
    logOutModal: store.modal.logout,
    signUpModal: store.modal.signup,
    editProfileModal: store.modal.editProfile,
    deleteProfileModal: store.modal.deleteProfile,
    helpModal: store.modal.help,
    helpModalHeader: store.modal.helpHeader,
    helpModalSections: store.modal.helpSections,
  }
}

export default connect(store)(ModalController)

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

class ModalController extends React.Component {

  state = {
  }

  componentDidMount(){
  }

  componentDidUpdate(){
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.showModal !== nextProps.showModal) return true
    else return false
  }

  componentWillUnmount(){
  }

  render(){
    return(
      <>
        { this.props.basicModal && <BasicModal content={ this.props.basicModalContent } /> }
        { this.props.logInModal && <LogIn /> }
        { this.props.logOutModal && <LogOut /> }
        { this.props.signUpModal && <SignUp /> }
        { this.props.editProfileModal && <EditProfile /> }
        { this.props.deleteProfileModal && <DeleteProfile /> }
        { this.props.helpModal &&
          <Help
            headerText={ this.props.helpModalHeader }
            helpSections = { this.props.helpModalSections }
          />
        }
        {
          this.props.loadingModal &&
          <LoadingModal
            show={ this.props.loadingModal }
            modalType={ this.props.loadingModalType }
            barType={ this.props.loadingModalBarType }
          />
        }
      </>
    )
  }

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

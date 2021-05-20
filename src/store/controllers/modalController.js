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
    if(this.props.modal.showModal !== nextProps.modal.showModal) return true
    else return false
  }

  componentWillUnmount(){

  }

  render(){
    return(
      <>
        { this.props.modal.basic && <BasicModal content={ this.props.modal.basicModalContent } /> }
        { this.props.modal.login && <LogIn /> }
        { this.props.modal.logout && <LogOut /> }
        { this.props.modal.signup && <SignUp /> }
        { this.props.modal.editProfile && <EditProfile /> }
        { this.props.modal.deleteProfile && <DeleteProfile /> }
        { this.props.modal.help &&
          <Help
            headerText={ this.props.modal.helpHeader }
            helpSections = { this.props.modal.helpSections }
          />
        }
        {
          this.props.modal.loading &&
          <LoadingModal
            show={ this.props.modal.loading }
            modalType={ this.props.modal.loadingModalType }
            barType={ this.props.modal.loadingModalBarType }
          />
        }
      </>
    )
  }

}

const store = (store) => {
  return {
    auth: store.auth,
    modal: store.modal
  }
}

export default connect(store)(ModalController)

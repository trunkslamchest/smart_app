import React from 'react'

import { connect } from 'react-redux'
import { logout, authStart, clearAuthErrors } from '../../store/actions/actionIndex'

import Modal from '../../UI/modal/modal'
import BaseDynamicBar from '../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import LogOutButtonContainer from './logOutButtonContainer/logOutButtonContainer'

import './logOut.css'

class LogOut extends React.Component {

  state = { enableButton: true }

  componentDidUpdate() {
    if((this.props.auth.loading || this.props.modal.logout) && this.state.enableButton) this.setState({ enableButton: false })
    if(!this.props.auth.loading && !this.state.enableButton) this.setState({ enableButton: true })
  }

  onConfirm = () => {
    this.setState({ enableButton: false })
    if(this.state.enableButton) this.props.onAuthStart('logOut', {})
  }

  onCancel = () => {
    this.setState({
      enableButton: false,
      enableInput: false,
    })

    this.props.onLogOutModal(false)
    this.props.onClearAuthErrors()

  }

  render(){

  const loading =
    <div className='loading_wrapper'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'auth' } barType={ 'authLogOut' } />
    </div>

    return(
      <Modal
        showModal={ this.props.modal.logout }
      >
        <div className='alt_header'>
          <h3>Are you sure you want to log out?</h3>
        </div>
        { this.props.auth.loading && loading }
        <LogOutButtonContainer
          enableButton={ this.state.enableButton }
          onConfirm={ this.onConfirm }
          onCancel={ this.onCancel }
        />
      </Modal>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOutModal: (bool) => dispatch(logout(bool)),
    onAuthStart: (type, obj) => dispatch(authStart(type, obj)),
    onClearAuthErrors: () => dispatch(clearAuthErrors())

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut)
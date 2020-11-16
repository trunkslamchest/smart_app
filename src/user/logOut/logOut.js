import React from 'react'
import { connect } from 'react-redux'
import {
  logout,
  authStart,
  clearAuthErrors
} from '../../store/actions/actionIndex'

import makeLogOutButtons from '../userFunctions/makeLogOutButtons'

import BaseDynamicBar from '../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import ModalHeader from '../../UI/components/headers/modalHeader/modalHeader'
import Modal from '../../UI/modal/modal'
import DefaultButtonsContainer from '../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import glyphIndex from '../../assets/glyphs/glyphIndex'

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

    let logOutButtons = makeLogOutButtons(glyphIndex, this.onConfirm, this.onCancel, this.state.enableButton)

    return(
      <Modal
        showModal={ this.props.modal.logout }
      >
        <div className='log_out_wrapper'>
          <ModalHeader header_text='Are you sure you want to log out?' />
          { this.props.auth.loading && loading }
          <DefaultButtonsContainer
            buttons={ logOutButtons }
            buttonClass={ 'modal_button' }
            containerClass={ 'modal_button_container' }
            enableButton={ this.state.enableButton }
            tooltipClass={ 'modal_button_tooltip' }
          />
        </div>
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
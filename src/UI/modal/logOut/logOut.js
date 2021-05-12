import React from 'react'
import { connect } from 'react-redux'
import {
  loading,
  logout,
  authStart,
  clearAuthErrors
} from '../../../store/actions/actionIndex'

import makeLogOutButtons from './logOutFunctions/makeLogOutButtons'

import BaseDynamicBar from '../../loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../loading/smallLoadingSpinner/smallLoadingSpinner'

import ModalHeaderCentered from '../../components/headers/modalHeaderCentered/modalHeaderCentered'

import Modal from '../../modal/modal'
import DefaultButtonsContainer from '../../buttons/defaultButtonsContainer/defaultButtonsContainer'

import glyphIndex from '../../../assets/glyphs/glyphIndex'

import './logOut.css'

class LogOut extends React.Component {

  state = { enableButton: true }

  componentDidUpdate() {
    if((this.props.auth.loading || this.props.modal.logout) && this.state.enableButton) this.setState({ enableButton: false })
  }

  onConfirm = () => {
    this.setState({ enableButton: false })
    if(this.state.enableButton) this.props.onAuthStart('logOut', {})
    // this.props.onLoadingModal(true)
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

    let logOutButtons = makeLogOutButtons(glyphIndex, this.onConfirm, this.onCancel)

    return(
      <Modal
        modalClass={ 'log_out_modal' }
        showModal={ this.props.modal.logout }
      >
        <div className='log_out_wrapper'>
          <ModalHeaderCentered header_text='Are you sure you want to log out?' />
          { this.props.auth.loading && loading }
          <DefaultButtonsContainer
            buttons={ logOutButtons }
            buttonRow={ true }
            enableButton={ this.state.enableButton }
            tooltipClass={ 'modal_button_tooltip' }
          />
        </div>
      </Modal>
    )
  }
}

const store = (store) => {
  return {
    modal: store.modal,
    auth: store.auth
  }
}

const dispatch = (dispatch) => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onLogOutModal: (bool) => dispatch(logout(bool)),
    onAuthStart: (type, obj) => dispatch(authStart(type, obj)),
    onClearAuthErrors: () => dispatch(clearAuthErrors())

  }
}

export default connect(store, dispatch)(LogOut)
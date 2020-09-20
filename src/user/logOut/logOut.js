import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import Modal from '../../UI/modal/modal'

import AuthOutDynamicBar from '../../UI/loading/dynamicBar/authOutDynamicBar/authOutDynamicBar'

import LogOutButtonContainer from './logOutButtonContainer/logOutButtonContainer'

import './logOut.css'

const LogOut = (props) => {

  const onConfirm = () => {
    props.onAuthStart('logOut', {})
  }

  const onCancel = () => { props.onLogOutModal(false) }

  return(
    <Modal
      showModal={ props.modal.logout }
    >
      <div className='alt_header'>
        <h3>Are you sure you want to log out?</h3>
      </div>
      { props.auth.loading && <AuthOutDynamicBar /> }
      <LogOutButtonContainer
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOutModal: (bool) => dispatch(actions.logout(bool)),
    onAuthStart: (type, obj) => dispatch(actions.authStart(type, obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut)
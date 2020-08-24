import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths.js'

import Modal from '../../UI/modal/modal'

import LogOutButtonContainer from './logOutButtonContainer'

import './logOut.css'

const LogOut = (props) => {

  const onConfirm = () => {
    props.onLogoutModal(false)
    props.onLogout()
    // props.logOut(props.token)
    props.history.push( routes.home )
  }

  const onCancel = () => {
    props.onLogoutModal(false)
  }

  return(
    <Modal
      showModal={ props.modal.logout }
    >
      <div className='alt_header'>
        <h3>Are you sure you want to log out?</h3>
      </div>
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
    onLogoutModal: (bool) => dispatch(actions.logout(bool)),
    onLogout: (bool) => dispatch(actions.authLogOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut)
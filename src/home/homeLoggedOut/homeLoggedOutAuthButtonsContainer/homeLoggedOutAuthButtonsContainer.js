import React from 'react'

import { connect } from 'react-redux'
import { login, signup } from '../../../store/actions/actionIndex'

import AuthButton from '../../../UI/buttons/authButton/authButton'

import './homeLoggedOutAuthButtonsContainer.css'

const HomeLoggedOutAuthButtonsContainer = (props) => {

  const onLogIn = (event) => {
    props.onLoginModal(true)
  }

  const onSignUp = (event) => {
    props.onSignupModal(true)
  }

  return(
    <div className='logged_out_auth_buttons_container'>
      <AuthButton
        buttonName="log_in_button"
        onClick={ onLogIn }
      >
        Log In
      </AuthButton>
      <AuthButton
        buttonName="sign_up_button"
        onClick={ onSignUp }
      >
        Sign Up
      </AuthButton>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginModal: (bool) => dispatch(login(bool)),
    onSignupModal: (bool) => dispatch(signup(bool))
  }
}

export default connect(null, mapDispatchToProps)(HomeLoggedOutAuthButtonsContainer)
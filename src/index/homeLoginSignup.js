import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../store/actions/actionIndex'

import Button3 from '../UI/buttons/button3'

import './homeLoginSignup.css'

const HomeLoginSignup = (props) => {

  const onLogIn = (event) => {
    props.onLoginModal(true)
  }

  const onSignUp = (event) => {
    props.onSignupModal(true)
  }

  return(
    <div className='login_signup_container'>
      <Button3
        name='log_in_button'
        onClick={onLogIn}
      >
        Log In
      </Button3>
      <Button3
        name='sign_up_button'
        onClick={onSignUp}
      >
        Sign Up
      </Button3>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginModal: (bool) => dispatch(actions.login(bool)),
    onSignupModal: (bool) => dispatch(actions.signup(bool))
  }
}

export default connect(null, mapDispatchToProps)(HomeLoginSignup)
import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actionIndex'

import HeaderButton2 from '../headerButton2/headerButton2'

const GuestHeader = (props) => {

  const logInButtonFunctions = () => {
    props.onLoginModal(true)
  }

  const signUpButtonFunctions = () => {
    props.onSignupModal(true)
  }

  return(
    <div className='header_nav_links'>
      <HeaderButton2
        name='header_log_in_button'
        onClick={logInButtonFunctions}
      >
        Login
      </HeaderButton2>
      <HeaderButton2
        name='header_sign_up_button'
        onClick={signUpButtonFunctions}
      >
        Sign Up
      </HeaderButton2>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginModal: (bool) => dispatch(actions.login(bool)),
    onSignupModal: (bool) => dispatch(actions.signup(bool))
  }
}

export default connect(null, mapDispatchToProps)(GuestHeader)
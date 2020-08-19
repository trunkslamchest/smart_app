import React from 'react'

import HeaderButton2 from '../headerButton2'

import '../headerButton2.css'

const GuestHeader = (props) => {

  const logInButtonFunctions = (event) => {
    props.showLogInModal()
  }

  const signUpButtonFunctions = (event) => {
    props.showSignUpModal()
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

export default GuestHeader
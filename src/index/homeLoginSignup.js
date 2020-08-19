import React from 'react'

import Button3 from '../UI/buttons/button3'

import './homeLoginSignup.css'

const HomeLoginSignup = (props) => {

  const onLogIn = (event) => {
    props.showLogInModal()
  }

  const onSignUp = (event) => {
    props.showSignUpModal()
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

export default HomeLoginSignup
import React from 'react'

import { NavLink } from 'react-router-dom'

const HomeLoginSignupButton = (props) => {
  return(
    <NavLink
      name={props.name}
      className='login_signup_button'
      onClick={ props.onClick }
    >
      {props.children}
    </NavLink>
  )
}

export default HomeLoginSignupButton
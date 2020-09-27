import React from 'react'

import './authButton.css'

const AuthButton = (props) => {
  return(
    <button
      name={ props.name }
      className='auth_button'
      onClick={ props.onClick }
    >
      { props.children }
    </button>
  )
}

export default AuthButton
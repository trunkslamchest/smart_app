import React from 'react'

import './signUpFormButton.css'

const SignUpFormButton = (props) => {
  return(
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      className='sign_up_form_button'
      onClick={props.onClick}
      value={props.value}
    />
  )
}

export default SignUpFormButton
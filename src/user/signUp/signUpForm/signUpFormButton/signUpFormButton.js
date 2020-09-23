import React from 'react'

import './signUpFormButton.css'

const SignUpFormButton = (props) => {

  const onClickFunctions = (event) => {
    event.preventDefault()

    if(props.enableButton){
      event.persist()
      props.onClickFunctions(event)
    }
  }

  return(
    <input
      type={ props.type }
      id={ props.id }
      name={ props.name }
      className={ props.enableButton ? 'sign_up_form_button' : 'sign_up_form_button_disabled' }
      onClick={ onClickFunctions }
      value={ props.value }
    />
  )
}

export default SignUpFormButton
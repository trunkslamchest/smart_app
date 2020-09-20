import React from 'react'

import './logInFormButton.css'

const LogInFormButton = (props) => {

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
      className={ props.enableButton ? 'log_in_form_button' : "log_in_form_button_disabled" }
      onClick={ onClickFunctions }
      value={ props.value }
    />
  )
}

export default LogInFormButton
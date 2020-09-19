import React from 'react'

import './logInFormButton.css'

const LogInFormButton = (props) => {
  return(
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      className='log_in_form_button'
      onClick={props.onClick}
      value={props.value}
    />
  )
}

export default LogInFormButton
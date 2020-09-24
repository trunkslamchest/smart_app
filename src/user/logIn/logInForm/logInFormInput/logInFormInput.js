import React from 'react'

import './logInFormInput.css'

const LogInFormInput = (props) => {
  return(
    <input
      disabled={ props.disabled }
      id={ props.id }
      name={ props.name }
      placeholder={ props.placeholder }
      onChange={ props.onChange }
      type={ props.type }
      value={ props.user_name }
    />
  )
}

export default LogInFormInput
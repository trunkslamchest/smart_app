import React from 'react'

import './logInFormInput.css'

const LogInFormInput = (props) => {
  return(
    <>
      <label htmlFor={ props.id }>{ props.label }</label>
      <br />
      <input
        type={ props.type }
        id={ props.id }
        name={ props.name }
        disabled={ props.disabled }
        onChange={ props.onChange }
        value={ props.user_name }
      />
    </>
  )
}

export default LogInFormInput
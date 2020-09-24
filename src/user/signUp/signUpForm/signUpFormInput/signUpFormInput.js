import React from 'react'

import './signUpFormInput.css'

const SignUpFormInput = (props) => {
  return(
    <input
      checked={ props.checked ? props.checked : false }
      className={ props.className ? props.className : null }
      disabled={ props.disabled }
      id={ props.id }
      name={ props.name }
      max={ props.max ? props.max : null }
      min={ props.min ? props.min : null }
      placeholder={ props.placeholder ? props.placeholder : null }
      onChange={ props.onChange }
      onClick={ props.onClick ? props.onClick : null }
      type={ props.type }
      value={ props.value ? props.value : '' }
    />
  )
}

export default SignUpFormInput
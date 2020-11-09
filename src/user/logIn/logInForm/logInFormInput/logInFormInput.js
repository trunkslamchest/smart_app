import React from 'react'

import './logInFormInput.css'

const LogInFormInput = (props) => {
  return(
    <div className='log_in_div'>
      <input
        disabled={ props.disabled }
        id={ props.id }
        name={ props.name }
        placeholder={ props.placeholder }
        onChange={ props.onChange }
        type={ props.type }
        value={ props.user_name }
      />
      { !!props.errors.length && <div className='log_in_error_container'>{ props.distribErrors }</div> }
    </div>
  )
}

export default LogInFormInput
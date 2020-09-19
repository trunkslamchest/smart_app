import React from 'react'

import './logInFormInput.css'

const LogInFormInput = (props) => {
  return(
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        value={props.user_name}
      />
    </>
  )
}

export default LogInFormInput
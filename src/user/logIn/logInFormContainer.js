import React from 'react'

import LogInForm from './logInForm'

const LogInFormContainer = (props) => {

  const onChange = (event) => {props.onChange(event)}

  const onSubmit = (event) => {props.onSubmit(event)}

  const onCancel = (event) => {props.onCancel(event)}

  return(
    <LogInForm
      errors={props.errors}
      onChange={onChange}
      onSubmit={onSubmit}
      onCancel={onCancel}
      user_name={props.user_name}
      password={props.password}
    />
  )
}

export default LogInFormContainer
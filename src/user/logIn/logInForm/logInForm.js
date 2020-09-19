import React from 'react'

import LogInFormInput from './logInFormInput/logInFormInput'
import LogInFormButtonContainer from './logInFormButtonContainer/logInFormButtonContainer'

// import ErrorContainer from '../../error/errorContainer'

const LogInForm = (props) => {
  return(
    <>
      <div className='alt_header'>
        <h3>Log In</h3>
      </div>
      <form
        id='log_in_form'
        name='log_in_form'
        className='log_in_form'
      >
        <div className='log_in_div'>
          <LogInFormInput
            type='text'
            label='Email'
            id='email'
            name='email'
            onChange={props.onChange}
            value={props.email}
          />
          <br />
          <LogInFormInput
            type='password'
            label='Password'
            id='password'
            name='password'
            onChange={props.onChange}
            value={props.password}
          />
        </div>
        <LogInFormButtonContainer
          onSubmit={props.onSubmit}
          onCancel={props.onCancel}
        />
      </form>
    </>
  )
}

export default LogInForm
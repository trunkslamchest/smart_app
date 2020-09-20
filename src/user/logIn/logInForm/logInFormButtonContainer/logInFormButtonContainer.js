import React from 'react'

import LogInFormButton from '../logInFormButton/logInFormButton'

import './logInFormButtonContainer.css'

const LogInFormButtonContainer = (props) => {
  return(
    <div className='log_in_buttons_container'>
      <LogInFormButton
        type='submit'
        id='log_in_submit'
        name='log_in_submit'
        enableButton={ props.enableButton }
        onClickFunctions={ props.onSubmit }
        value='Login'
      />
      <LogInFormButton
        type='reset'
        id='log_in_cancel'
        name='log_in_cancel'
        enableButton={ props.enableButton }
        onClickFunctions={ props.onCancel }
        value='Cancel'
      />
    </div>
  )
}

export default LogInFormButtonContainer
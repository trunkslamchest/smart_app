import React from 'react'

import SignUpFormButton from '../signUpFormButton/signUpFormButton'

import './signUpFormButtonContainer.css'

const SignUpFormButtonContainer = (props) => {
  return(
    <div className='sign_up_buttons_container'>
      <SignUpFormButton
        type='submit'
        id='sign_up_form_submit'
        name='sign_up_form_submit'
        enableButton={ props.enableButton }
        onClickFunctions={ props.onSubmit }
        value='Create Account'
      />
      <SignUpFormButton
        type='reset'
        id='sign_up_form_reset'
        name='sign_up_form_reset'
        enableButton={ props.enableButton }
        onClickFunctions={ props.onReset }
        value='Reset'
      />
      <SignUpFormButton
        type='button'
        id='sign_up_form_cancel'
        name='sign_up_form_cancel'
        enableButton={ props.enableButton }
        onClickFunctions={ props.onCancel }
        value='Cancel'
      />
    </div>
  )
}

export default SignUpFormButtonContainer
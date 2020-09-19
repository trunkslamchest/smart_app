import React from 'react'

import LogOutButton from '../logOutButton/logOutButton'

const LogOutButtonContainer = (props) => {
    return(
      <div className='default_centered_buttons_container'>
        <LogOutButton
          id='log_out_form_confirm'
          name='log_out_form_confirm'
          className='log_out_button'
          onClick={props.onConfirm}
        >
          Yes
        </LogOutButton>
        <LogOutButton
          id='log_out_form_cancel'
          name='log_out_form_cancel'
          className='log_out_button'
          onClick={props.onCancel}
        >
          No
        </LogOutButton>
      </div>
    )
}

export default LogOutButtonContainer
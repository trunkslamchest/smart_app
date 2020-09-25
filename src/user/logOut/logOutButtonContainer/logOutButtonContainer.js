import React from 'react'

import LogOutButton from '../logOutButton/logOutButton'

import './logOutButtonContainer.css'

const LogOutButtonContainer = (props) => {
    return(
      <div className='log_out_buttons_container'>
        <LogOutButton
          id='log_out_form_confirm'
          name='log_out_form_confirm'
          enableButton={ props.enableButton }
          onClickFunctions={ props.onConfirm }
        >
          Yes
        </LogOutButton>
        <LogOutButton
          id='log_out_form_cancel'
          name='log_out_form_cancel'
          enableButton={ props.enableButton }
          onClickFunctions={ props.onCancel }
        >
          No
        </LogOutButton>
      </div>
    )
}

export default LogOutButtonContainer
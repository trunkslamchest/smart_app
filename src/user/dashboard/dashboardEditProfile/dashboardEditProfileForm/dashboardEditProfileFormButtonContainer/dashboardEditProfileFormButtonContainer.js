import React from 'react'

import DashboardEditProfileFormButton from '../dashboardEditProfileFormButton/dashboardEditProfileFormButton'

import './dashboardEditProfileFormButtonContainer.css'

const DashboardEditProfileFormButtonContainer = (props) => {

  const onClickResetFunctions = (event) => {
    // console.log(event)
    // event.reset()
    props.onReset()
  }

  return(
    <div className='edit_buttons_container'>
      <DashboardEditProfileFormButton
        type='submit'
        id='edit_profile_submit'
        name='edit_profile_submit'
        enableButtons={ props.enableButtons }
        onClickFunctions={ props.onSubmit }
        value='Confirm'
      />
      <DashboardEditProfileFormButton
        type='reset'
        id='edit_profile_reset'
        name='edit_profile_reset'
        enableButtons={ props.enableButtons }
        // onClickFunctions={ props.onReset }
onClickFunctions={ onClickResetFunctions }
        value='Reset'
      />
      <DashboardEditProfileFormButton
        type='button'
        id='edit_profile_form_cancel'
        name='edit_profile_form_cancel'
        enableButtons={ props.enableButtons }
        onClickFunctions={ props.onCancel }
        value='Cancel'
      />
    </div>
  )
}

export default DashboardEditProfileFormButtonContainer
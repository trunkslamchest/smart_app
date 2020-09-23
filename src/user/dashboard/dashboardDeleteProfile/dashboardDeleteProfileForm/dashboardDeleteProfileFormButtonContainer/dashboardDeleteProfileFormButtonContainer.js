import React from 'react'

import DashboardDeleteProfileFormButton from '../dashboardDeleteProfileFormButton/dashboardDeleteProfileFormButton'

import './dashboardDeleteProfileFormButtonContainer.css'

const DashboardDeleteProfileFormButtonContainer = (props) => {
  return(
    <div className='delete_form_buttons_container'>
      <DashboardDeleteProfileFormButton
        type='submit'
        id='delete_profile_submit'
        name='delete_profile_submit'
        enableSubmitButton={ props.enableSubmitButton }
        onClickFunctions={ props.onSubmitConfirm }
        value='Confirm'
      />
      <DashboardDeleteProfileFormButton
        type='button'
        id='delete_profile_form_cancel'
        name='delete_profile_form_cancel'
        enableSubmitButton={ props.enableSubmitButton }
        onClickFunctions={ props.onSubmitCancel }
        value='Cancel'
      />
    </div>
  )
}

export default DashboardDeleteProfileFormButtonContainer
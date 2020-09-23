import React from 'react'

import DashboardDeleteProfileButton from '../dashboardDeleteProfileButton/dashboardDeleteProfileButton'

import './dashboardDeleteProfileButtonContainer.css'

const DashboardDeleteProfileButtonContainer = (props) => {
  return(
    <div className='delete_buttons_container'>
      <DashboardDeleteProfileButton
        id='delete_profile_form_confirm'
        name='delete_profile_form_confirm'
        enableConfirmButton={ props.enableConfirmButton }
        onClickFunctions={ props.onConfirm }
      >
        Yes
      </DashboardDeleteProfileButton>
      <DashboardDeleteProfileButton
        id='delete_profile_form_cancel'
        name='delete_profile_form_cancel'
        enableConfirmButton={ props.enableConfirmButton }
        onClickFunctions={ props.onCancel }
      >
        No
      </DashboardDeleteProfileButton>
    </div>
  )
}

export default DashboardDeleteProfileButtonContainer
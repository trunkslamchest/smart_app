import React from 'react'

import DashboardDeleteProfileFormButtonContainer from './dashboardDeleteProfileFormButtonContainer'

const DashboardDeleteProfileForm = (props) => {
  return(
    <>
      <div className='alt_header'>
        <h5>Please enter your password to confirm the deletion of your profile</h5>
      </div>
      <form
        id='delete_profile_form'
        name='delete_profile_form'
        className='delete_profile_form'
      >
        <div className='delete_profile_form_div'>
        <input
            type='password'
            label='Password'
            id='password'
            name='password'
            onChange={ props.onChange }
            value={ props.password}
          />
        </div>
        <DashboardDeleteProfileFormButtonContainer
          onSubmitConfirm={ props.onSubmitConfirm }
          onSubmitCancel={ props.onSubmitCancel }
        />
      </form>
    </>
  )
}

export default DashboardDeleteProfileForm
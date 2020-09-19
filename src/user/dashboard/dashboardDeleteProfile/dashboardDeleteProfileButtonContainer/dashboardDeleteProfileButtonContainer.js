import React from 'react'

import DashboardDeleteProfileButton from '../dashboardDeleteProfileButton/dashboardDeleteProfileButton'

import './dashboardDeleteProfileButtonContainer.css'

export default class DashboardDeleteProfileButtonContainer extends React.Component {

  render(){
    return(
      <div className='delete_buttons_container'>
        <DashboardDeleteProfileButton
          id='delete_profile_form_confirm'
          name='delete_profile_form_confirm'
          className='delete_profile_button'
          onClick={this.props.onConfirm}
        >
          Yes
        </DashboardDeleteProfileButton>
        <DashboardDeleteProfileButton
          id='delete_profile_form_cancel'
          name='delete_profile_form_cancel'
          className='delete_profile_button'
          onClick={this.props.onCancel}
        >
          No
        </DashboardDeleteProfileButton>
      </div>
    )
  }
}
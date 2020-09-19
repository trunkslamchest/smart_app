import React from 'react'

import './dashboardEditProfileFormButton.css'

const DashboardEditProfileFormButton = (props) => {
  return(
    <input
      type={props.type}
      id={props.id}
      name={props.name}
      className='dashboard_edit_profile_button'
      onClick={props.onClick}
      value={props.value}
    />
  )
}

export default DashboardEditProfileFormButton
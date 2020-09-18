import React from 'react'

import './dashboardDeleteProfileButton.css'

const DashboardDeleteProfileButton = (props) => {
  return(
    <button
      type='button'
      id={props.id}
      name={props.name}
      className='delete_profile_button'
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default DashboardDeleteProfileButton
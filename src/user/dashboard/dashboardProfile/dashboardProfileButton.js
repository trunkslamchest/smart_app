import React from 'react'

import './dashboardProfileButton.css'

const dashboardProfileButton = (props) => {
  return(
    <button
      type={props.type}
      id={props.id}
      name={props.name}
      className='dashboard_profile_button'
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default dashboardProfileButton
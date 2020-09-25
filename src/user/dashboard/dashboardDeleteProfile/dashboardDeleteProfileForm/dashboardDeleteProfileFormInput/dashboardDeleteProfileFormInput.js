import React from 'react'

import './dashboardDeleteProfileFormInput.css'

const DashboardDeleteProfileFormInput = (props) => {
  return(
    <input
      disabled={ props.disabled }
      id={ props.id }
      name={ props.name }
      onChange={ props.onChange }
      type={ props.type }
      value={ props.user_name }
    />
  )
}

export default DashboardDeleteProfileFormInput
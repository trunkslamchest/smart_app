import React from 'react'

import './dashboardEditProfileFormButton.css'

const DashboardEditProfileFormButton = (props) => {

  const onClickFunctions = (event) => {
    event.preventDefault()

    if(props.enableButtons){
      event.persist()
      props.onClickFunctions(event)
    }
  }

  return(
    <input
      type={ props.type }
      id={ props.id }
      name={ props.name }
      className={ props.enableButtons ? 'dashboard_edit_profile_button' : 'dashboard_edit_profile_button_disabled' }
      onClick={ onClickFunctions }
      value={ props.value }
    />
  )
}

export default DashboardEditProfileFormButton
import React from 'react'

import './dashboardSettingsFormButton.css'

const DashboardSettingsFormButton = (props) => {

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
      className={ props.enableButtons ? 'dashboard_settings_form_button' : 'dashboard_settings_form_button_disabled' }
      onClick={ onClickFunctions }
      value={ props.value }
    />
  )
}

export default DashboardSettingsFormButton
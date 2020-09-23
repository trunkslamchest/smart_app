import React from 'react'

import './dashboardDeleteProfileFormButton.css'

const DashboardDeleteProfileFormButton = (props) => {

  const onClickFunctions = (event) => {
    event.preventDefault()

    if(props.enableSubmitButton){
      event.persist()
      props.onClickFunctions(event)
    }
  }

  return(
    <input
      type={ props.type }
      id={ props.id }
      name={ props.name }
      className={ props.enableSubmitButton ? 'delete_profile_form_button' : 'delete_profile_form_button_disabled' }
      onClick={ onClickFunctions }
      value={ props.value }
    />
  )
}

export default DashboardDeleteProfileFormButton
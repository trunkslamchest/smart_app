import React from 'react'

import './dashboardDeleteProfileButton.css'

const DashboardDeleteProfileButton = (props) => {

  console.log(props)


  const onClickFunctions = (event) => {
    event.preventDefault()

    if(props.enableConfirmButton){
      event.persist()
      props.onClickFunctions(event)
    }
  }

  return(
    <button
      type='button'
      id={ props.id }
      name={ props.name }
      className={ props.enableConfirmButton ? 'delete_profile_button' : 'delete_profile_button_disabled' }
      onClick={ onClickFunctions }
    >
      { props.children }
    </button>
  )
}

export default DashboardDeleteProfileButton
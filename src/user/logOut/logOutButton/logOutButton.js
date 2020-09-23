import React from 'react'

import './logOutButton.css'

const logOutButton = (props) => {

  console.log(props)

  const onClickFunctions = (event) => {
    event.preventDefault()

    if(props.enableButton){
      event.persist()
      props.onClickFunctions(event)
    }
  }

  return(
    <button
      type='button'
      id={ props.id }
      name={ props.name }
      className={ props.enableButton ? 'log_out_button' : 'log_out_button_disabled' }
      onClick={ onClickFunctions }
    >
      { props.children }
    </button>
  )
}

export default logOutButton
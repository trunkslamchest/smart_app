import React from 'react'

import './logOutButton.css'

const logOutButton = (props) => {
  return(
    <button
      type='button'
      id={props.id}
      name={props.name}
      className={props.className}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {props.children}
    </button>
  )
}

export default logOutButton
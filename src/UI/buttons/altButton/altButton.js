import React from 'react'

import './altButton.css'

const AltButton = (props) => {
  return(
    <button
      name={props.name}
      className='alt_button'
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default AltButton
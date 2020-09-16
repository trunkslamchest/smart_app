import React from 'react'

import './commentButton.css'

const commentButton = (props) => {
  return(
    <button
      key={ props.keyNameValue }
      name={ props.keyNameValue }
      value={ props.keyNameValue }
      className={ props.class }
      onClick={ props.onClick }
    >
      { props.children }
    </button>
  )
}

export default commentButton
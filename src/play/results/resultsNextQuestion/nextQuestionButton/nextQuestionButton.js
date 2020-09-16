import React from 'react'

import './nextQuestionButton.css'

const NextQuestionButton = (props) => {
  return(
    <button
      key={ props.keyNameValue }
      name={ props.keyName }
      className={ props.class }
      onClick={ props.onClick }
    >
      { props.children }
    </button>
  )
}

export default NextQuestionButton
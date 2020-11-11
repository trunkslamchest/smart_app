import React from 'react'

import './homeButton.css'
import './homeAuthButton.css'
import './homeStartButton.css'

const HomeButton = (props) => {

  const onClickFunction = (event) => { props.clickFunction(event) }

  return(
    <div className={ props.wrapperClass }>
      <button
        id={ props.id }
        name={ props.name }
        className={ props.classType }
        onClick={ onClickFunction }
      >
        <div className={ props.textContainerClass }>
          <span>{ props.text }</span>
        </div>
      </button>
    </div>
  )
}

export default HomeButton
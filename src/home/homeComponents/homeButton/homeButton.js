import React from 'react'

import './homeButton.css'
import './homeAuthButton.css'
import './homeCatButton.css'
import './homeDiffButton.css'
import './homeQuickPlayButton.css'
import './homeStartButton.css'

const HomeButton = (props) => {

  const onClickFunction = (event) => {
    props.clickFunction(event)
    // props.pushRoute(props.route)
  }

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
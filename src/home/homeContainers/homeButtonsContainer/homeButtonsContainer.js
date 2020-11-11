import React from 'react'

import HomeButton from '../../homeComponents/homeButton/homeButton'

import './homeButtonsContainer.css'

const HomeButtonsContainer = (props) => {

  const distribButtons = props.buttons.map((button, index) => {
    return(
      <HomeButton
        classType={ button.classType }
        clickFunction={ button.clickFunction }
        id={ button.id }
        key={ index }
        name={ button.name }
        // route={ button.route }
        text={ button.text }
        textContainerClass={ button.textContainerClass }
        wrapperClass={ button.wrapperClass }
      />
    )
  })

  return(
    <div className={ props.containerClass }>
      { distribButtons }
    </div>
  )
}

export default HomeButtonsContainer
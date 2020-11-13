import React from 'react'

import DefaultButton from '../defaultButton/defaultButton'

import './defaultButtonsContainer.css'

const DefaultButtonContainer = (props) => {

  let distribButtons

  if(!!props.buttons) {
    distribButtons = props.buttons.map((button, index) => {
      return(
        <DefaultButton
          buttonClass={ props.buttonClass }
          id={ button.id }
          image={ button.image }
          imageHover={ button.imageHover }
          key={ index }
          name={ button.name }
          enableButton={ props.enableButton }
          onClickFunction={ button.onClickFunction }
          params={ button.params }
          text={ button.text }
          tooltipText={ button.tooltipText }
          type={ button.type }
        />
      )
    })
  }

  return(
    <div className={ props.containerClass }>
      { distribButtons }
    </div>
  )
}

export default DefaultButtonContainer
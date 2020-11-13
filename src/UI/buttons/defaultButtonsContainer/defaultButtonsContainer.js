import React from 'react'

import DefaultButton from '../defaultButton'

import './defaultButtonsContainer.css'

const DefaultButtonContainer = (props) => {
  return(
    <>
      { !!props.buttons &&
        <div className={ props.containerClass }>
          { props.buttons.map((button, index) => {
            return(
              <DefaultButton
                buttonClass={ props.buttonClass || button.buttonClass }
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
                tooltipClass={ props.tooltipClass || button.tooltipClass }
                type={ button.type }
              />
            )
          })}
        </div>
      }
    </>
  )
}

export default DefaultButtonContainer
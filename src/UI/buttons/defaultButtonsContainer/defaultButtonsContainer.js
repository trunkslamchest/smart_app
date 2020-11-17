import React from 'react'
import { useLocation } from 'react-router-dom'

import DefaultButton from '../defaultButton'

import './defaultButtonsContainer.css'

const DefaultButtonContainer = (props) => {

  const location = useLocation()

  return(
    <>
      { !!props.buttons &&
        <div className={ props.containerClass }>
          { props.buttons.map((button, index) => {
            return(
              <DefaultButton
                buttonClass={ props.buttonClass || button.buttonClass }
                history={ props.history }
                id={ button.id }
                image={ button.image }
                imageHover={ button.imageHover }
                key={ index }
                location={ location.pathname }
                name={ button.name }
                enableButton={ props.enableButton }
                onClickFunction={ button.onClickFunction }
                params={ button.params }
                route={ button.route }
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

// props.buttons
// props.buttonClass
// props.containerClass
// props.enableButton
// props.tooltipClass
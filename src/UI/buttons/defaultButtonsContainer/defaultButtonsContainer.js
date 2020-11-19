import React from 'react'
import { useLocation } from 'react-router-dom'

import DefaultButton from '../defaultButton'

import './defaultButtonsContainer.css'

const DefaultButtonContainer = (props) => {

  const location = useLocation()

  return(
    <>
      { !!props.buttons &&
        <div className={ props.containerClass || 'default_buttons_container' }>
          { props.buttons.map((button, index) => {
            return(
              <DefaultButton
                buttonClass={ props.buttonClass || button.buttonClass || 'default_button' }
                buttonType={ button.buttonType }
                history={ props.history }
                id={ button.id }
                image={ button.image }
                imageHover={ button.imageHover }
                key={ index }
                location={ location.pathname }
                name={ button.name }
                menuButtons={ button.menuButtons }
                enableButton={ props.enableButton }
                offHover={ props.offHover }
                onClickFunction={ button.onClickFunction }
                onSwitchMenu={ props.onSwitchMenu }
                params={ button.params }
                route={ button.route }
                text={ button.text }
                tooltipText={ button.tooltipText }
                tooltipClass={ props.tooltipClass || button.tooltipClass || 'default_button_tooltip' }
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

// {/* <DefaultButtonsContainer
//   buttons={  }
//   buttonClass={  }
//   containerClass={  }
//   enableButton={  }
//   tooltipClass={  }
// /> */}

// props.buttons
// props.buttonClass
// props.containerClass
// props.enableButton
// props.tooltipClass
import React from 'react'
import { useLocation } from 'react-router-dom'

import DefaultButton from '../defaultButton'

import './defaultButtonsContainer.css'
import './defaultButtonsContainerResponse.css'

const DefaultButtonContainer = (props) => {

  const location = useLocation()

  const calcButtonClass = (buttonClass, buttons, index) => {
    if(index === 0) {
      return `${ buttonClass }_left`
    } else if ( index === buttons - 1) {
      return `${ buttonClass }_right`
    } else {
      return `${ buttonClass }_middle`
    }
  }

  // console.log(props.enableButton)

  return(
    <>
      { !!props.buttons &&
        <div className={ props.containerClass || 'default_buttons_container' }>
          { props.buttons.map((button, index) => {
            return(
              <DefaultButton
                buttonClass={ props.buttonRow ? calcButtonClass(props.buttonClass || button.buttonClass || 'default_button', props.buttons.length, index) : props.buttonClass || button.buttonClass || 'default_button' }
                buttonContainerClass={ props.buttonContainerClass || button.buttonContainerClass || 'default_button_container' }
                buttonType={ button.buttonType }
                headerButton={ button.headerButton }
                homeButton={ button.homeButton }
                id={ button.id }
                image={ button.image }
                imageHover={ button.imageHover }
                key={ index }
                location={ location.pathname }
                name={ button.name }
                navButton={ button.navButton }
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
// 
// export default React.memo(DefaultButtonContainer)

// export default React.memo(DefaultButtonContainer, (prevProps, nextProps) => {
//   // if(prevProps.enableButton !== nextProps.enableButton) {
//   // if(prevProps.buttons !== nextProps.buttons) {
//   if(prevProps.buttons[0].onClickFunction !== nextProps.buttons[0].onClickFunction) {
//   console.log(prevProps.buttons[0].onClickFunction, nextProps.buttons[0].onClickFunction, prevProps.buttons[0].onClickFunction !== nextProps.buttons[0].onClickFunction)
//     return true
//   } else
//     return false

//   // console.log(prevProps.buttons, nextProps.buttons)

//   // return true
// })

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
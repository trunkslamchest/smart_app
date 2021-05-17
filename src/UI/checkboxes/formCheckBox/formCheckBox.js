import React from 'react'
import { useState } from 'react'

const FormCheckBox = (props) => {

  const [hoverState, setHoverState] = useState(false)

  const onHover = () => { setHoverState(true) }
  const offHover = () => { setHoverState(false) }
  const disabledClickFunctions = (event) => { event.preventDefault() }

  let checkmark, xMark

  if(props.disabled) {
    checkmark = props.checkedImageDisabled
    xMark = props.uncheckedImageDisabled
  } else {
    if(hoverState) {
      checkmark = props.checkedImageHover
      xMark = props.uncheckedImageHover
    } else {
      checkmark = props.checkedImage
      xMark = props.uncheckedImage
    }
  }

  return(
    <div className={ props.checkBoxButtonContainerClass }>
      <button
        id={ props.id }
        className={ props.disabled ? props.checkBoxDisabledClass : props.checkBoxClass }
        name={ props.name }
        onClick={ props.disabled ? disabledClickFunctions : props.onChecked }
        onMouseEnter={ onHover }
        onMouseLeave={ offHover }
      >
        { props.status ?
          <img
            alt={ 'checked' }
            className={ props.checkBoxImgClass }
            name={ props.name }
            src={ checkmark }
            title={ props.name }
          />
        :
          <img
            alt={ 'not checked' }
            className={ props.checkBoxImgClass }
            name={ props.name }
            src={ xMark }
            title={ props.name }
          />
        }
      </button>
    </div>
  )
}

export default FormCheckBox

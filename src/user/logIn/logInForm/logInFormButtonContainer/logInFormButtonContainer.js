import React from 'react'

import makeLogInButtons from '../../../userFunctions/makeLogInButtons'

import LogInFormButton from '../logInFormButton/logInFormButton'

import glyphIndex from '../../../../assets/glyphs/glyphIndex'

import './logInFormButtonContainer.css'

const LogInFormButtonContainer = (props) => {

  let logInButtons = makeLogInButtons(glyphIndex, props.onSubmit, props.onCancel, props.enableButton)

  const distribLogInButtons = logInButtons.map((button, index) => {
    return(
      <LogInFormButton
        type={ button.type }
        id={ button.id }
        image={ button.image }
        imageHover={ button.imageHover }
        key={ index }
        name={ button.name }
        enableButton={ props.enableButton }
        onClickFunction={ button.onClickFunction }
        tooltipText={ button.tooltipText }
        value={ button.value }
      />
    )
  })

  return(
    <div className='log_in_buttons_container'>
      { distribLogInButtons }
    </div>
  )
}

export default LogInFormButtonContainer
import React from 'react'

import LogInFormButton from '../logInFormButton/logInFormButton'

import glyphIndex from '../../../../assets/glyphs/glyphIndex'

import './logInFormButtonContainer.css'

const LogInFormButtonContainer = (props) => {

  const logInButtons = [
    {
      name: 'LogInSubmit',
      id: 'log_in_submit',
      image: glyphIndex.formWhiteCheckMark,
      imageHover: glyphIndex.formBlackCheckMark,
      onClickFunction: props.onSubmit,
      tooltipText: 'Login',
      type: 'submit', enableButton: props.enableButton,
      value: 'Login'
    },
    {
      name: 'LogInCancel',
      id: 'log_in_cancel',
      image: glyphIndex.formWhiteX,
      imageHover: glyphIndex.formBlackX,
      onClickFunction: props.onCancel,
      tooltipText: 'Cancel',
      type: 'reset', enableButton: props.enableButton,
      value: 'Cancel'
    }
  ]

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
import React from 'react'

import makeLogOutButtons from '../../userFunctions/makeLogOutButtons'

import LogOutButton from '../logOutButton/logOutButton'

import glyphIndex from '../../../assets/glyphs/glyphIndex'

import './logOutButtonContainer.css'

const LogOutButtonContainer = (props) => {

  let logOutButtons = makeLogOutButtons(glyphIndex, props.onConfirm, props.onCancel, props.enableButton)

  const distribLogOutButtons = logOutButtons.map((button, index) => {
    return(
      <LogOutButton
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
      <div className='log_out_buttons_container'>
        { distribLogOutButtons }
      </div>
    )
}

export default LogOutButtonContainer
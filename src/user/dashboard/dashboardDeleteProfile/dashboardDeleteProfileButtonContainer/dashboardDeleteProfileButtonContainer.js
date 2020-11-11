import React from 'react'

import makeDeleteProfileButtons from '../../../userFunctions/makeDeleteProfileButtons'

import DashboardDeleteProfileButton from '../dashboardDeleteProfileButton/dashboardDeleteProfileButton'

import glyphIndex from '../../../../assets/glyphs/glyphIndex'

import './dashboardDeleteProfileButtonContainer.css'

const DashboardDeleteProfileButtonContainer = (props) => {

  let deleteProfileButtons = makeDeleteProfileButtons(glyphIndex, props.onConfirm, props.onCancel, props.enableConfirmButton)

  const distribDeleteProfileButtons = deleteProfileButtons.map((button, index) => {
    return(
      <DashboardDeleteProfileButton
        type={ button.type }
        id={ button.id }
        image={ button.image }
        imageHover={ button.imageHover }
        key={ index }
        name={ button.name }
        enableButton={ button.enableButton }
        onClickFunction={ button.onClickFunction }
        tooltipText={ button.tooltipText }
        value={ button.value }
      />
    )
  })

  return(
    <div className='delete_profile_buttons_container'>
      { distribDeleteProfileButtons }
    </div>
  )
}

export default DashboardDeleteProfileButtonContainer
import React from 'react'

import makeDeleteProfileFormButtons from '../../../../userFunctions/makeDeleteProfileButtons'

import DashboardDeleteProfileFormButton from '../dashboardDeleteProfileFormButton/dashboardDeleteProfileFormButton'

import glyphIndex from '../../../../../assets/glyphs/glyphIndex'

import './dashboardDeleteProfileFormButtonContainer.css'

const DashboardDeleteProfileFormButtonContainer = (props) => {

  let deleteProfileFormButtons = makeDeleteProfileFormButtons(glyphIndex, props.onSubmitConfirm, props.onSubmitCancel, props.enableSubmitButton)

  const distribDeleteProfileFormButtons = deleteProfileFormButtons.map((button, index) => {
    return(
      <DashboardDeleteProfileFormButton
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
    <div className='delete_profile_form_buttons_container'>

      { distribDeleteProfileFormButtons }

      {/* <DashboardDeleteProfileFormButton
        type='submit'
        id='delete_profile_form_submit'
        name='delete_profile_form_submit'
        enableSubmitButton={ props.enableSubmitButton }
        onClickFunctions={ props.onSubmitConfirm }
        value='Confirm'
      />
      <DashboardDeleteProfileFormButton
        type='button'
        id='delete_profile_form_cancel'
        name='delete_profile_form_cancel'
        enableSubmitButton={ props.enableSubmitButton }
        onClickFunctions={ props.onSubmitCancel }
        value='Cancel'
      /> */}
    </div>
  )
}

export default DashboardDeleteProfileFormButtonContainer
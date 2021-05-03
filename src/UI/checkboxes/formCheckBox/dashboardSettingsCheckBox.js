import React from 'react'

const DashboardSettingsCheckBox = (props) => {

  let checkmark, xMark, checkBoxStyle = {}

  if(!props.enabled) {
    checkmark = props.checkedImageDisabled
    xMark = props.uncheckedImageDisabled
    checkBoxStyle = {
      cursor: 'not-allowed'
    }
  } else {
    if(props.hover) {
      checkmark = props.checkedImageHover
      xMark = props.uncheckedImageHover
    } else {
      checkmark = props.checkedImage
      xMark = props.uncheckedImage
    }
  }

  return(
    <div
      className={ props.status ? 'dashboard_settings_privacy_profile_card_img_container_active' : 'dashboard_settings_privacy_profile_card_img_container' }
      style={ checkBoxStyle }
    >
      { props.status ?
        <img
          alt={ 'checked' }
          className={ props.checkBoxImgClass }
          style={ checkBoxStyle }
          name={ props.name }
          src={ checkmark }
          title={ props.name }
        />
      :
        <img
          alt={ 'not checked' }
          className={ props.checkBoxImgClass }
          style={ checkBoxStyle }
          name={ props.name }
          src={ xMark }
          title={ props.name }
        />
      }
    </div>
  )
}

export default DashboardSettingsCheckBox

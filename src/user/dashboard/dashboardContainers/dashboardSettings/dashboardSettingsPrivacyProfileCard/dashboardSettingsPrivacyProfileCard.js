import React from 'react'
import { useState } from 'react'

import formGlyphIndex from '../../../../../assets/glyphs/formGlyphIndex'

import DashboardSettingsCheckBox from '../../../../../UI/checkboxes/formCheckBox/dashboardSettingsCheckBox'

import './dashboardSettingsPrivacyProfileCard.css'

const DashboardSettingsPrivacyProfileCard = (props) => {

  const [hoverState, setHoverState] = useState(false)

  const componentClasses = {
    settingsCard: props.enabled ? 'dashboard_settings_privacy_profile_card' : 'dashboard_settings_privacy_profile_card dashboard_settings_privacy_profile_card_disabled'
  }

  const onHover = () => { setHoverState(true) }
  const offHover = () => { setHoverState(false) }
  const onClickFunctions = (event) => { props.onChecked(event) }
  const disabledClickFunctions = (event) => { event.preventDefault() }

  return (
    <div
      className={ componentClasses.settingsCard }
      name={ props.setting.name }
      style={ props.enabled && hoverState ? {
          background: 'rgba(244, 166, 66, 1)',
          borderRadius: '5px',
          cursor: 'pointer',
          padding: '5px 30px 5px 20px',
          transition: 'padding .2s ease-in-out 0s'
        } : {}
      }
      onClick={ props.enabled ? onClickFunctions : disabledClickFunctions }
      onMouseEnter={ onHover }
      onMouseLeave={ offHover }
    >
      <span
        name={ props.setting.name }
        style={ props.enabled && hoverState ? { font: '600 10pt "Lato", sans-serif' } : {} }
      >
        { props.setting.text }
      </span>
      <DashboardSettingsCheckBox
        checkBoxClass='settings_form_check_box_button'
        checkedImage={ formGlyphIndex.formGreenCheckMark }
        checkedImageHover={ formGlyphIndex.formGreyCheckMark }
        checkedImageDisabled={ formGlyphIndex.formDisabledCheckMark }
        enabled={ props.enabled }
        hover={ hoverState }
        id={ props.setting.name }
        name={ props.setting.name }
        onChecked={ props.onChecked }
        status={ props.status }
        uncheckedImage={ formGlyphIndex.formRedX }
        uncheckedImageHover={ formGlyphIndex.formGreyX }
        uncheckedImageDisabled={ formGlyphIndex.formDisabledX }
      />
    </div>
  )
}

export default DashboardSettingsPrivacyProfileCard
import React from 'react'

import formGlyphIndex from '../../../../../assets/glyphs/formGlyphIndex'

import FormCheckBox from '../../../../../UI/checkboxes/formCheckBox/formCheckBox'

import './dashboardSettingsPrivacyProfileCard.css'

const DashboardSettingsPrivacyProfileCard = (props) => {
  return (
    <div className="dashboard_settings_privacy_profile_card">
      <span>{ props.setting.text }</span>
      <FormCheckBox
        checkBoxClass='settings_form_check_box_button'
        checkedImage={ formGlyphIndex.formWhiteCheckMark }
        checkedImageHover={ formGlyphIndex.formOrangeCheckMark }
        id={ props.setting.name }
        name={ props.setting.name }
        onChecked={ props.onChecked }
        status={ props.status }
        uncheckedImage={ formGlyphIndex.formWhiteX }
        uncheckedImageHover={ formGlyphIndex.formOrangeX }
      />
    </div>
  )
}

export default DashboardSettingsPrivacyProfileCard
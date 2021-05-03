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
        // checkedImage={ formGlyphIndex.formBlackCheckMark }
        // checkedImageHover={ formGlyphIndex.formOrangeCheckMark }
        checkedImage={ formGlyphIndex.formGreenCheckMark }
        checkedImageHover={ formGlyphIndex.formGreenCheckMark }
        id={ props.setting.name }
        name={ props.setting.name }
        onChecked={ props.onChecked }
        status={ props.status }
        // uncheckedImage={ formGlyphIndex.formBlackX }
        // uncheckedImageHover={ formGlyphIndex.formOrangeX }
        uncheckedImage={ formGlyphIndex.formRedX }
        uncheckedImageHover={ formGlyphIndex.formRedX }
      />
    </div>
  )
}

export default DashboardSettingsPrivacyProfileCard
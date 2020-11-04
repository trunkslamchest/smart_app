import React from 'react'

import FormCheckBox from '../../../../../UI/checkboxes/formCheckBox/formCheckBox'

import './dashboardSettingsPrivacyProfileCard.css'

const DashboardSettingsPrivacyProfileCard = (props) => {
  return (
    <div className="dashboard_settings_privacy_profile_card">
      <span>{ props.setting.text }</span>
      <FormCheckBox
        id={ props.setting.name }
        name={ props.setting.name }
        onChecked={ props.onChecked }
        status={ props.status }
      />
    </div>
  )
}

export default DashboardSettingsPrivacyProfileCard
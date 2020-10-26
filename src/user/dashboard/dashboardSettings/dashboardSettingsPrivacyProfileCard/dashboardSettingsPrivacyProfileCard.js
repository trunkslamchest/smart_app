import React from 'react'

import './dashboardSettingsPrivacyProfileCard.css'

const DashboardSettingsPrivacyProfileCard = (props) => {
  return (
    <div className="dashboard_settings_privacy_profile_card">
      <span>{ props.setting.text }</span>
      <input
        type='checkbox'
        id={ props.setting.name }
        name={ props.setting.name }
        className='dashboard_settings_privacy_profile_card_check'
        checked={ props.status }
        onChange={ props.onChecked }
        value={ props.status }
      />
    </div>
  )
}

export default DashboardSettingsPrivacyProfileCard
import React from 'react'

import makeDashboardSettingsPrivacyFields from '../../../dashboardFunctions/makeDashboardSettingsPrivacyFields'
import makeDashboardSettingsButtons from '../../../dashboardFunctions/makeDashboardSettingsButtons'

import DashboardSubHeader from '../../../dashboardComponents/dashboardSubHeader/dashboardSubHeader'
import DashboardSettingsPrivacyProfileCard from '../dashboardSettingsPrivacyProfileCard/dashboardSettingsPrivacyProfileCard'
import DefaultButtonsContainer from '../../../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import formGlyphIndex from '../../../../../assets/glyphs/formGlyphIndex'

import './dashboardSettingsFormContainer.css'

const DashboardSettingsFormContainer = (props) => {

  const onSubmit = (event) => { props.onSubmit(event) }

  const formButtons = makeDashboardSettingsButtons(onSubmit, props.onReset, props.onCancel, formGlyphIndex)

  const distribPrivacyProfileSettings = makeDashboardSettingsPrivacyFields().map((setting, index) => {

    let settingEnabled = true

    if(props.private){
      if(setting.name !== 'private') {
        settingEnabled = false
      }
    }

    return (
      <React.Fragment key={ index }>
        <DashboardSettingsPrivacyProfileCard
          enabled={ settingEnabled }
          setting={ setting }
          status={ props[setting.name] }
          onChecked={ props.onChecked }
        />
      </React.Fragment>
    )
  })

  return(
    <form
      id='dashboard_settings_form'
      name='dashboard_settings_form'
      className='dashboard_settings_form'
    >
      <div className="dashboard_settings_container">
        <DashboardSubHeader header_text={ 'Privacy' } />
        <div className="dashboard_settings_sub_container">
          { distribPrivacyProfileSettings }
        </div>
      </div>
      <DefaultButtonsContainer
        buttons={ formButtons }
        buttonRow={ true }
        containerClass={ 'dashboard_form_buttons_container' }
        enableButton={ props.enableButtons }
        tooltipClass={ 'dashboard_form_button_tooltip' }
      />
    </form>
  )
}

export default DashboardSettingsFormContainer
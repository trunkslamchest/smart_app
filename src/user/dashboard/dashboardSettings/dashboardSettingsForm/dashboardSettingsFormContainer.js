import React from 'react'
import { connect } from 'react-redux'

import DashboardSettingsPrivacyProfileCard from '../dashboardSettingsPrivacyProfileCard/dashboardSettingsPrivacyProfileCard'
import DashboardSettingsButtonContainer from './dashboardSettingsFormButtonContainer/dashboardSettingsFormButtonContainer'

import './dashboardSettingsFormContainer.css'

class DashboardSettingsFormContainer extends React.Component {

  onSubmit = (event) => {
    this.props.onSubmit(event)
  }

  render(){

    // console.log(this.props)

    const privacyProfileSettings = [
      { name: 'private', text: 'Set your public profile to private' },
      { name: 'showEmail', text: 'Show your email on your public profile' },
      { name: 'showRealName', text: 'Show your real name on your public profile' },
      { name: 'showAge', text: 'Show your age on your public profile' },
      { name: 'showGender', text: 'Show your gender on your public profile' },
    ]

    const distribPrivacyProfileSettings = privacyProfileSettings.map(setting => {
      // console.log(setting.name)
      return (
        <DashboardSettingsPrivacyProfileCard
          key={ privacyProfileSettings.indexOf(setting) }
          setting={ setting }
          status={ this.props[setting.name] }
          onChecked={ this.props.onChecked }
        />
      )
    })

    return(
      <div className="dashboard_settings_form_container">
        <form
          id='dashboard_settings_form'
          name='dashboard_settings_form'
          className='dashboard_settings_form'
        >
          <div className="dashboard_settings_privacy_container">
            <h3>Privacy</h3>
            <div className="dashboard_settings_privacy_profile_container">
              <h4>Public Profile</h4>
              { distribPrivacyProfileSettings }
            </div>
          </div>

          <DashboardSettingsButtonContainer
            enableButtons={ this.props.enableButtons }
            onSubmit={ this.onSubmit }
            onReset={ this.props.onReset }
            onCancel={ this.props.onCancel }
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(DashboardSettingsFormContainer)
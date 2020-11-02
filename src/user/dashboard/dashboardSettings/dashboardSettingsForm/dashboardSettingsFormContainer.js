import React from 'react'
import { connect } from 'react-redux'
import { deleteProfile } from '../../../../store/actions/actionIndex'

import DashboardHeader from '../../dashboardComponents/dashboardHeader/dashboardHeader'
import DashboardSettingsPrivacyProfileCard from '../dashboardSettingsPrivacyProfileCard/dashboardSettingsPrivacyProfileCard'
import DashboardButtonsContainer from '../../dashboardContainers/dashboardButtonsContainer/dashboardButtonsContainer'

import './dashboardSettingsFormContainer.css'

class DashboardSettingsFormContainer extends React.Component {

  onSubmit = (event) => { this.props.onSubmit(event) }

  onClickDelete = (event) => {
    event.preventDefault()
    this.props.onDeleteProfileModal(true)
  }

  render(){
    const privacyProfileSettings = [
      { name: 'private', text: 'Set your public profile to private' },
      { name: 'showAchievements', text: 'Display your Achievements on your public profile' },
      { name: 'showAge', text: 'Display your Age on your public profile' },
      { name: 'showAvatar', text: 'Display your Avatar on your public profile' },
      { name: 'showBio', text: 'Display your Biography on your public profile' },
      { name: 'showCountry', text: 'Display your Nationality on your public profile' },
      { name: 'showEmail', text: 'Display your Email on your public profile' },
      { name: 'showExperience', text: 'Display your Experience levels on your public profile' },
      { name: 'showGender', text: 'Display your Gender on your public profile' },
      { name: 'showGenderPronouns', text: 'Display your Gender Pronouns on your public profile' },
      { name: 'showRealName', text: 'Display your Real Name on your public profile' },
      { name: 'showStats', text: 'Display your Statistics on your public profile' }
    ]

    const headerButtons = [
      { type: 'button', idName: 'delete_profile_button', onClickFunction: this.onClickDelete, value: 'Delete Profile' },
    ]

    const formButtons = [
      { idName: 'dashboardSettingsSubmit', type: 'input', form_type: 'submit', onClickFunction: this.onSubmit, value: 'Confirm' },
      { idName: 'dashboardSettingsReset', type: 'input', form_type: 'reset', onClickFunction: this.props.onReset, value: 'Reset' },
      { idName: 'dashboardSettingsCancel', type: 'button', onClickFunction: this.props.onCancel, value: 'Cancel' }
    ]

    const distribPrivacyProfileSettings = privacyProfileSettings.map((setting, index) => {
      return (
        <DashboardSettingsPrivacyProfileCard
          key={ index }
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
            <DashboardHeader header_text={ "Privacy" } buttons={ headerButtons } />
            <div className="dashboard_settings_privacy_profile_container">
              <h4>Public Profile</h4>
              { distribPrivacyProfileSettings }
            </div>
          </div>

          <DashboardButtonsContainer
            buttons={ formButtons }
            button_class={ 'dashboard_form_button' }
            container_class={ 'dashboard_buttons_footer_container' }
            enableButtons={ this.props.enableButtons }
          />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteProfileModal: (bool) => (dispatch(deleteProfile(bool)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSettingsFormContainer)
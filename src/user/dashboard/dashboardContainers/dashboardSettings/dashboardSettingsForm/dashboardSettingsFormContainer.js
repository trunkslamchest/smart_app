import React from 'react'
import { connect } from 'react-redux'
import { deleteProfile } from '../../../../../store/actions/actionIndex'

import makeDashboardSettingsButtons from '../../../dashboardFunctions/makeDashboardSettingsButtons'

import DashboardHeader from '../../../dashboardComponents/dashboardHeader/dashboardHeader'
import DashboardSubHeader from '../../../dashboardComponents/dashboardSubHeader/dashboardSubHeader'
import DashboardSettingsPrivacyProfileCard from '../dashboardSettingsPrivacyProfileCard/dashboardSettingsPrivacyProfileCard'
import DefaultButtonsContainer from '../../../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import formGlyphIndex from '../../../../../assets/glyphs/formGlyphIndex'

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
      { name: 'showAchievements', text: 'Display your Achievements' },
      { name: 'showAge', text: 'Display your Age' },
      { name: 'showAvatar', text: 'Display your Avatar' },
      { name: 'showBio', text: 'Display your Biography' },
      { name: 'showComments', text: 'Display your Comments' },
      { name: 'showCountry', text: 'Display your Nationality' },
      { name: 'showGender', text: 'Display your Gender' },
      { name: 'showGenderPronouns', text: 'Display your Gender Pronouns' },
      { name: 'showRealName', text: 'Display your Real Name' },
      { name: 'showStats', text: 'Display your Statistics' },
      { name: 'showVotes', text: 'Display your Votes' }
    ]

    let formButtons = makeDashboardSettingsButtons(this.onSubmit, this.props.onReset, this.props.onCancel, formGlyphIndex)

    const distribPrivacyProfileSettings = privacyProfileSettings.map((setting, index) => {
      return (
        <React.Fragment key={ index }>
        <DashboardSettingsPrivacyProfileCard
          setting={ setting }
          status={ this.props[setting.name] }
          onChecked={ this.props.onChecked }
        />
        </React.Fragment>
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
            <DashboardHeader header_text={ "Settings" } />
            <div className="dashboard_settings_privacy_profile_container">
              <DashboardSubHeader header_text={ 'Privacy' } />
              <div className='divider_medium' />
              { distribPrivacyProfileSettings }
            </div>
          </div>
          <DefaultButtonsContainer
            buttons={ formButtons }
            buttonRow={ true }
            containerClass={ 'dashboard_form_buttons_container' }
            enableButton={ this.props.enableButtons }
            tooltipClass={ 'dashboard_form_button_tooltip' }
          />
        </form>
      </div>
    )
  }
}

const store = (store) => {
  return {
    modal: store.modal,
    user: store.user
  }
}

const dispatch = (dispatch) => {
  return {
    onDeleteProfileModal: (bool) => (dispatch(deleteProfile(bool)))
  }
}

export default connect(store, dispatch)(DashboardSettingsFormContainer)
import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  basic,
  setBasicModalContent,
  updateUserSettings
} from '../../../../store/actions/actionIndex'

import { routes } from '../../../../utility/paths'

import DashboardSettingsFormContainer from './dashboardSettingsForm/dashboardSettingsFormContainer'

import './dashboardSettingsContainer.css'

class DashboardSettingsContainer extends React.Component {

  state = {
    enableButtons: true,
    pulledStore: false,
    settings: {
      privacy:{
        profile: {
          private: false,
          showAchievements: false,
          showAge: false,
          showAvatar: false,
          showBio: false,
          showComments: false,
          showCountry: false,
          showGender: false,
          showGenderPronouns: false,
          showRealName: false,
          showStats: false,
          showVotes: false
        }
      }
    }
  }

  componentDidMount(){
    document.title = "SmartApp™ | Dashboard | Settings"
    if(this.props.userSettings) this.pulledStore()
  }

  componentDidUpdate(){ if(this.props.userSettings && !this.state.pulledStore) this.pulledStore() }

  componentWillUnmount(){ clearTimeout(this.enableButtonsTimeout) }

  pulledStore = () => {
    this.setState({
      ...this.state,
      pulledStore: true,
      settings: {
        ...this.state.settings,
        privacy: {
          ...this.state.settings.privacy,
          profile: {
            private: this.props.userSettings.privacy.profile.private,
            showAchievements: this.props.userSettings.privacy.profile.showAchievements,
            showAge: this.props.userSettings.privacy.profile.showAge,
            showAvatar: this.props.userSettings.privacy.profile.showAvatar,
            showBio: this.props.userSettings.privacy.profile.showBio,
            showComments: this.props.userSettings.privacy.profile.showComments,
            showCountry: this.props.userSettings.privacy.profile.showCountry,
            showGender: this.props.userSettings.privacy.profile.showGender,
            showGenderPronouns: this.props.userSettings.privacy.profile.showGenderPronouns,
            showRealName: this.props.userSettings.privacy.profile.showRealName,
            showStats: this.props.userSettings.privacy.profile.showStats,
            showVotes: this.props.userSettings.privacy.profile.showVotes
          }
        }
      }
    })
  }

  onChecked = (event) => {
    event.preventDefault()
    let flipSetting = !this.state.settings.privacy.profile[event.target.attributes.name.value]
    this.setState({
      ...this.state,
      settings:{
        ...this.state.settings,
        privacy: {
          ...this.state.settings.privacy,
          profile: {
            ...this.state.settings.privacy.profile,
            [event.target.attributes.name.value]: flipSetting
          }
        }
      }
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onUpdateUserSettings({
      uid: this.props.authId,
      settings: this.state.settings
    })
    this.setState({ enableButtons: false })
    this.props.onSetBasicModalContent("Your settings have been saved!")
    this.props.onBasicModal(true)
    this.enableButtonsTimeout = setTimeout(() => { this.enableButtons() }, 3000)
  }

  enableButtons = () => { this.setState({ enableButtons: true }) }

  onReset = () => {
    this.setState({
      ...this.state,
      settings: {
        ...this.state.settings,
        privacy: {
          ...this.state.settings.privacy,
          profile: {
            private: this.props.userSettings.privacy.profile.private,
            showAchievements: this.props.userSettings.privacy.profile.showAchievements,
            showAge: this.props.userSettings.privacy.profile.showAge,
            showAvatar: this.props.userSettings.privacy.profile.showAvatar,
            showBio: this.props.userSettings.privacy.profile.showBio,
            showComments: this.props.userSettings.privacy.profile.showComments,
            showCountry: this.props.userSettings.privacy.profile.showCountry,
            showGender: this.props.userSettings.privacy.profile.showGender,
            showGenderPronouns: this.props.userSettings.privacy.profile.showGenderPronouns,
            showRealName: this.props.userSettings.privacy.profile.showRealName,
            showStats: this.props.userSettings.privacy.profile.showStats,
            showVotes: this.props.userSettings.privacy.profile.showVotes
          }
        }
      }
    })
  }

  onCancel = () => { this.props.history.push( routes.dashboard_profile ) }

  render(){
    return(
      <div className="dashboard_settings_container">
        <DashboardSettingsFormContainer
          enableButtons={ this.state.enableButtons }
          onChecked={ this.onChecked }
          onSubmit={ this.onSubmit }
          onCancel={ this.onCancel }
          onReset={ this.onReset }
          private={ this.state.settings.privacy.profile.private }
          showAchievements={ this.state.settings.privacy.profile.showAchievements }
          showAge={ this.state.settings.privacy.profile.showAge }
          showAvatar={ this.state.settings.privacy.profile.showAvatar }
          showBio={ this.state.settings.privacy.profile.showBio }
          showComments={ this.state.settings.privacy.profile.showComments }
          showCountry={ this.state.settings.privacy.profile.showCountry }
          showGender={ this.state.settings.privacy.profile.showGender }
          showGenderPronouns={ this.state.settings.privacy.profile.showGenderPronouns }
          showRealName={ this.state.settings.privacy.profile.showRealName }
          showStats={ this.state.settings.privacy.profile.showStats }
          showVotes={ this.state.settings.privacy.profile.showVotes }
        />
      </div>
    )
  }
}

const store = (store) => {
  return {
    user: store.user,

    authId: store.auth.id,
    userSettings: store.user.settings
  }
}

const dispatch = (dispatch) => {
  return {
    onBasicModal: (bool) => dispatch(basic(bool)),
    onSetBasicModalContent: (string) => dispatch(setBasicModalContent(string)),
    onUpdateUserSettings: (settings) => dispatch(updateUserSettings(settings))
  }
}

export default withRouter(connect(store, dispatch)(React.memo(DashboardSettingsContainer)))
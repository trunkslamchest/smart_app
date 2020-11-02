import React from 'react'
import { connect } from 'react-redux'
import { updateUserSettings } from '../../../../store/actions/actionIndex'

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
          showCountry: false,
          showEmail: false,
          showExperience: false,
          showGender: false,
          showGenderPronouns: false,
          showRealName: false,
          showStats: false
        }
      }
    }
  }

  componentDidMount(){
    document.title = "SmartApp™ | Dashboard | Settings"
    if(this.props.user.settings) this.pulledStore()
  }

  componentDidUpdate(){ if(this.props.user.settings && !this.state.pulledStore) this.pulledStore() }

  pulledStore = () => {
    this.setState({
      ...this.state,
      pulledStore: true,
      settings: {
        ...this.state.settings,
        privacy: {
          ...this.state.settings.privacy,
          profile: {
            private: this.props.user.settings.privacy.profile.private,
            showAchievements: this.props.user.settings.privacy.profile.showAchievements,
            showAge: this.props.user.settings.privacy.profile.showAge,
            showAvatar: this.props.user.settings.privacy.profile.showAvatar,
            showBio: this.props.user.settings.privacy.profile.showBio,
            showCountry: this.props.user.settings.privacy.profile.showCountry,
            showEmail: this.props.user.settings.privacy.profile.showEmail,
            showExperience: this.props.user.settings.privacy.profile.showExperience,
            showGender: this.props.user.settings.privacy.profile.showGender,
            showGenderPronouns: this.props.user.settings.privacy.profile.showGenderPronouns,
            showRealName: this.props.user.settings.privacy.profile.showRealName,
            showStats: this.props.user.settings.privacy.profile.showStats
          }
        }
      }
    })
  }

  onChecked = (event) => {
    let flipChecked = !event.target.checked
    this.setState({
      ...this.state,
      settings:{
        ...this.state.settings,
        privacy: {
          ...this.state.settings.privacy,
          profile: {
            ...this.state.settings.privacy.profile,
            [event.target.name]: !flipChecked
          }
        }
      }
    })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onUpdateUserSettings({
      uid: this.props.auth.id,
      settings: this.state.settings
    })
    this.setState({ enableButtons: false })
  }

  onReset = () => {
    this.setState({
      ...this.state,
      settings: {
        ...this.state.settings,
        privacy: {
          ...this.state.settings.privacy,
          profile: {
            private: this.props.user.settings.privacy.profile.private,
            showAchievements: this.props.user.settings.privacy.profile.showAchievements,
            showAge: this.props.user.settings.privacy.profile.showAge,
            showAvatar: this.props.user.settings.privacy.profile.showAvatar,
            showBio: this.props.user.settings.privacy.profile.showBio,
            showCountry: this.props.user.settings.privacy.profile.showCountry,
            showEmail: this.props.user.settings.privacy.profile.showEmail,
            showExperience: this.props.user.settings.privacy.profile.showExperience,
            showGender: this.props.user.settings.privacy.profile.showGender,
            showGenderPronouns: this.props.user.settings.privacy.profile.showGenderPronouns,
            showRealName: this.props.user.settings.privacy.profile.showRealName,
            showStats: this.props.user.settings.privacy.profile.showStats
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
          showCountry={ this.state.settings.privacy.profile.showCountry }
          showEmail={ this.state.settings.privacy.profile.showEmail }
          showExperience={ this.state.settings.privacy.profile.showExperience }
          showGender={ this.state.settings.privacy.profile.showGender }
          showGenderPronouns={ this.state.settings.privacy.profile.showGenderPronouns }
          showRealName={ this.state.settings.privacy.profile.showRealName }
          showStats={ this.state.settings.privacy.profile.showStats }
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateUserSettings: (settings) => dispatch(updateUserSettings(settings))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSettingsContainer)
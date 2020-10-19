import React from 'react'
import { connect } from 'react-redux'
import { updateUserSettings } from '../../../store/actions/actionIndex'

import { routes } from '../../../utility/paths'

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
          showExperience: false,
          showEmail: false,
          showRealName: false,
          showAge: false,
          showGender: false
        }
      }
    }
  }

  componentDidMount(){
    document.title = "SmartApp™ | Dashboard | Settings"
    if(this.props.user.settings) this.pulledStore()
  }

  componentDidUpdate(){ if(this.props.user.settings && !this.state.pulledStore)this.pulledStore() }

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
            showExperience: this.props.user.settings.privacy.profile.showExperience,
            showEmail: this.props.user.settings.privacy.profile.showEmail,
            showRealName: this.props.user.settings.privacy.profile.showRealName,
            showAge: this.props.user.settings.privacy.profile.showAge,
            showGender: this.props.user.settings.privacy.profile.showGender,
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
            showExperience: this.props.user.settings.privacy.profile.showExperience,
            showEmail: this.props.user.settings.privacy.profile.showEmail,
            showRealName: this.props.user.settings.privacy.profile.showRealName,
            showAge: this.props.user.settings.privacy.profile.showAge,
            showGender: this.props.user.settings.privacy.profile.showGender,
          }
        }
      }
    })
  }

  onCancel = () => { this.props.history.push( routes.dashboard_profile ) }

  render(){

    console.log(this.state)

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
          showExperience={ this.state.settings.privacy.profile.showExperience }
          showEmail={ this.state.settings.privacy.profile.showEmail }
          showRealName={ this.state.settings.privacy.profile.showRealName }
          showAge={ this.state.settings.privacy.profile.showAge }
          showGender={ this.state.settings.privacy.profile.showGender }
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
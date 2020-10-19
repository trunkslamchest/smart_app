import React from 'react'
import { connect } from 'react-redux'
import { getUserProfile, clearUserProfile, updateUserProfileStatus } from '../../store/actions/actionIndex'

import UserProfileInfoContainer from './userProfileInfo/userProfileInfoContainer'
import UserProfileAchievementsContainer from './userProfileAchievements/userProfileAchievementsContainer'
import UserProfileExperience from './userProfileExperience/userProfileExperience'
import UserProfileStatsContainer from './userProfileStats/userProfileStatsContainer'

import './userProfileContainer.css'

class UserProfileContainer extends React.Component {

  state = {

  }

  componentDidMount() {

    let parseLocation = this.props.history.location.pathname.split("/")
    let user_name = parseLocation[parseLocation.length - 1]

    document.title = `SmartApp™ | ${ user_name}'s Profile`

    this.props.onGetUserProfile(user_name)
  }

  componentWillUnmount() {
    this.props.onUpdateUserProfileStatus(null)
    this.props.onClearUserProfile()
  }

  render(){

    let userProfileBlock = <></>

    if(this.props.profile.status === 'display'){
      if(typeof this.props.profile.userData === 'string') userProfileBlock = <h2>{ this.props.profile.userData }</h2>
      else {
        userProfileBlock =
          <>
            <UserProfileInfoContainer
              info={ this.props.profile.userData.info }
              history={ this.props.history }
            />
            <UserProfileExperience history={ this.props.history } />
            <UserProfileStatsContainer history={ this.props.history } />
            <UserProfileAchievementsContainer history={ this.props.history } />
          </>
      }
    }

    return(
      <div className="user_profile_container">
        { userProfileBlock }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    modal: state.modal,
    user: state.user,
    questions: state.questions,
    profile: state.profile
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetUserProfile: (user_name) => dispatch(getUserProfile(user_name)),
    onClearUserProfile: () => dispatch(clearUserProfile()),
    onUpdateUserProfileStatus: (status) => dispatch(updateUserProfileStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer)
import React from 'react'
import { connect } from 'react-redux'
import {
  getUserProfile,
  clearUserProfile,
  updateUserProfileStatus
} from '../../store/actions/actionIndex'

import UserProfileInfoContainer from './userProfileInfo/userProfileInfoContainer'
import UserProfileAchievementsContainer from './userProfileAchievements/userProfileAchievementsContainer'

import UserProfileVotesContainer from './userProfileVotes/userProfileVotesContainer'
import UserProfileCommentsContainer from './userProfileComments/userProfileCommentsContainer'

import UserStatsContainer from '../../UI/components/containers/userStatsContainer/userStatsContainer'

import './userProfileContainer.css'

class UserProfileContainer extends React.Component {

  state = { }

  componentDidMount() {
    let parseLocation = this.props.history.location.pathname.split("/")
    let user_name = parseLocation[parseLocation.length - 1]
    document.title = `SmartApp™ | ${ user_name }'s Profile`
    this.props.onGetUserProfile(user_name)
  }

  componentWillUnmount() {
    this.props.onUpdateUserProfileStatus(null)
    this.props.onClearUserProfile()
  }

  render(){

    let userProfileBlock

    if(this.props.profile.status === 'display'){
      if(typeof this.props.profile.userData === 'string') userProfileBlock = <h2>{ this.props.profile.userData }</h2>
      else {
        userProfileBlock =
          <div className="user_profile_wrapper">
            <UserProfileInfoContainer
              info={ this.props.profile.userData.info }
              history={ this.props.history }
            />
            { !!this.props.profile.userData.questions &&
              <UserStatsContainer
                question_totals={ this.props.questions.totals }
                user_questions={ this.props.profile.userData.questions }
                user_experience={ this.props.profile.userData.experience }
                history={ this.props.history }
              />
            }
           { !!this.props.profile.userData.achievements &&
              <UserProfileAchievementsContainer
                achievements={ this.props.profile.userData.achievements }
                history={ this.props.history }
              />
            }
            { !!this.props.profile.userData.questions &&
              <UserProfileVotesContainer
                questions={ this.props.profile.userData.questions }
                history={ this.props.history }
              />
            }
           { !!this.props.profile.userData.questions &&
              <UserProfileCommentsContainer
                questions={ this.props.profile.userData.questions }
                history={ this.props.history }
              />}
          </div>
      }
    }

    return(
      <>{ userProfileBlock }</>
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
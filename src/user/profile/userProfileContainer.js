import React from 'react'
import { connect } from 'react-redux'
import {
  getUserProfile,
  clearUserProfile,
  updateUserProfileStatus
} from '../../store/actions/actionIndex'

import UserProfileInfoContainer from './userProfileInfo/userProfileInfoContainer'
import UserProfileCommentsContainer from './userProfileComments/userProfileCommentsContainer'
import UserAchievementsContainer from '../../UI/components/containers/userAchievementsContainer/userAchievementsContainer'
import UserStatsContainer from '../../UI/components/containers/userStatsContainer/userStatsContainer'
import VoteContainer from '../../UI/components/containers/voteContainer/voteContainer'

import './userProfileContainer.css'

class UserProfileContainer extends React.Component {

  state = { }

  componentDidMount() {
    let parseLocation = this.props.history.location.pathname.split("/")
    let user_name = parseLocation[parseLocation.length - 1]
    document.title = `SmartApp™ | ${ user_name }'s Profile`
    this.props.onUpdateUserProfileStatus(null)
    this.props.onGetUserProfile(user_name)
  }

  componentWillUnmount() {
    this.props.onUpdateUserProfileStatus(null)
    this.props.onClearUserProfile()
  }

  render(){

    let userProfileBlock

    if(this.props.profile.status === 'display'){
      if(typeof this.props.profile.userData === 'string') {
        userProfileBlock =
          <div className="user_profile_wrapper_private">
            <h2>{ this.props.profile.userData }</h2>
          </div>
      } else {
        userProfileBlock =
          <div className="user_profile_wrapper">
            <UserProfileInfoContainer
              info={ this.props.profile.userData.info }
              history={ this.props.history }
            />
            { !!this.props.profile.userData.questions &&
              <UserStatsContainer
                from_dashboard={ false }
                question_totals={ this.props.questions.totals }
                user_questions={ this.props.profile.userData.questions }
                user_experience={ this.props.profile.userData.experience }
                history={ this.props.history }
              />
            }
           { !!this.props.profile.userData.achievements &&
              <UserAchievementsContainer
                all_achievements={ this.props.achievements }
                from_dashboard={ false }
                history={ this.props.history }
                user_achievements={ this.props.profile.userData.achievements }
              />
            }
            { !!this.props.profile.userData.votes &&
              <VoteContainer
                enableVoteButtons={ false }
                showVoteButtons={ false }
                voteProps={ this.props.profile.userData.votes }
              />
            }
           { !!this.props.profile.userData.comments &&
              <UserProfileCommentsContainer
                questions={ this.props.profile.userData.comments }
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
    achievements: state.achievements,
    modal: state.modal,
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
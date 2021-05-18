import React from 'react'

import UserProfileHeader from './userProfileHeader/userProfileHeader'
import UserProfileInfoContainer from './userProfileInfo/userProfileInfoContainer'
import UserProfileCommentsContainer from './userProfileComments/userProfileCommentsContainer'
import UserAchievementsContainer from '../../UI/components/containers/userAchievementsContainer/userAchievementsContainer'
import UserStatsContainer from '../../UI/components/containers/userStatsContainer/userStatsContainer'
import VoteContainer from '../../UI/components/containers/voteContainer/voteContainer'

import './userProfileContainer.css'
import './userProfileResponse.css'

const UserProfileContainer = (props) => {

  let userProfileBlock = <></>

  if(typeof props.userData === "string") {
    userProfileBlock =
      <div className="user_profile_wrapper_private">
        <h2>{ props.userData }</h2>
      </div>
  } else {
    userProfileBlock =
      <div className="user_profile_wrapper">
        <UserProfileHeader
          info={ props.userData.info }
          history={ props.history }
        />
        <div className='user_profile_body_wrapper'>
          { props.userData.settings.privacy.profile.showBio &&
            <UserProfileInfoContainer
              bio={ props.userData.info.bio }
              history={ props.history }
            />
          }
          { props.userData.settings.privacy.profile.showStats &&
            <UserStatsContainer
              from_dashboard={ false }
              question_totals={ props.questionTotals }
              user_questions={ props.userData.questions }
              user_experience={ props.userData.experience }
              history={ props.history }
            />
          }
          { props.userData.settings.privacy.profile.showAchievements &&
            <UserAchievementsContainer
              all_achievements={ props.achievements }
              from_dashboard={ false }
              history={ props.history }
              user_name={ props.userData.info.user_name }
              user_achievements={ props.userData.achievements }
            />
          }
          { (props.userData.settings.privacy.profile.showVotes && !!props.userData.votes.total ) &&
            <VoteContainer
              enableVoteButtons={ false }
              showVoteButtons={ false }
              showVoteStats={ true }
              staticUserProfile={ true }
              voteProps={ props.userData.votes }
            />
          }
          { (props.userData.settings.privacy.profile.showComments && !!props.userData.comments.length) &&
            <UserProfileCommentsContainer
              questions={ props.userData.comments }
              history={ props.history }
            />}
        </div>
      </div>
  }

  return userProfileBlock
}

export default React.memo(UserProfileContainer, (prevProps, nextProps) => {
  if(prevProps.modal.loading === nextProps.modal.loading) {
    return true
  }
  else return false
})
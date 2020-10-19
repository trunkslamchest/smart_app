import React from 'react'
import { connect } from 'react-redux'

import UserProfileAchievementCard from './userProfileAchievementCard/userProfileAchievementCard'

import './userProfileAchievementsContainer.css'

const UserProfileAchievementsContainer = (props) => {

  let achievementsBlock = <></>, distribAchievements

  if(!!props.profile.userData.achievements && props.achievements.totals) {
    let allAchievements = Object.entries(props.achievements.all)
    let profileAchievements = allAchievements.filter(achievement => props.profile.userData.achievements.unlocked.includes(achievement[0]))
    distribAchievements = profileAchievements.map(achievement => {
      return (
        <UserProfileAchievementCard
            key={ allAchievements.indexOf(achievement) }
            name={ achievement[0] }
            achievement={ achievement[1] }
        />
      )
    })

    achievementsBlock =
      <>
        <div className='user_profile_achievements_header'>
          <span>Achievements: { props.profile.userData.achievements.total }/{ props.achievements.totals.all }</span>
        </div>
        <div className='user_profile_achievements_container'>
          { distribAchievements }
        </div>
      </>
  }

  return(
    <div className="user_profile_achievements_container">
      { achievementsBlock }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    achievements: state.achievements,
    profile: state.profile
  }
}

export default connect(mapStateToProps)(UserProfileAchievementsContainer)
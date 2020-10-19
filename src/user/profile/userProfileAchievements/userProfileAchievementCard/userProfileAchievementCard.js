import React from 'react'
import { connect } from 'react-redux'

import './userProfileAchievementCard.css'

const UserProfileAchievementCard = (props) => {
  return (
    <div className="user_profile_achievement_card">
      <div className="user_profile_achievement_card_img_container">
        <img
          className='user_profile_achievement_card_img'
          alt={ props.achievement.text }
          src={ props.achievement.img }
        />
      </div>
      <div className="user_profile_achievement_card_text_container">
        <h4>{ props.achievement.title }</h4>
        <h5>{ props.achievement.text }</h5>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(UserProfileAchievementCard)
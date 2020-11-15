import React from 'react'

import './userAchievementCard.css'

const UserAchievementCard = (props) => {
  return (
    <div className="user_achievement_card">
      <div className="user_achievement_card_img_container">
        <img
          className={ props.unlocked ? 'user_achievement_card_img_unlocked' : 'user_achievement_card_img_locked' }
          alt={ props.achievement.text }
          src={ props.achievement.img }
        />
      </div>
      <div className={ props.unlocked ? "user_achievement_card_text_container_unlocked" : "user_achievement_card_text_container_locked"}>
        <h4>{ props.achievement.title }</h4>
        <h5>{ props.achievement.text }</h5>
      </div>
    </div>
  )
}

export default UserAchievementCard
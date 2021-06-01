import React from 'react'

import './userAchievementCard.css'

const UserAchievementCard = (props) => {

  const componentClasses = {
    achievementCard: props.unlocked ? 'user_achievement_card' : 'user_achievement_card user_achievement_card_locked',
    achievementCardImgContainer: 'user_achievement_card_img_container',
    achievementCardImg: props.unlocked ? 'user_achievement_card_img_unlocked' : 'user_achievement_card_img_locked'
  }

  return (
    <div className={ componentClasses.achievementCard }>
      <h4>{ props.achievement.title }</h4>
      <div className={ componentClasses.achievementCardImgContainer }>
        <img
          className={ componentClasses.achievementCardImg }
          alt={ props.achievement.text }
          src={ props.achievement.img }
        />
      </div>
      <h5>{ props.achievement.text }</h5>
    </div>
  )
}

export default UserAchievementCard
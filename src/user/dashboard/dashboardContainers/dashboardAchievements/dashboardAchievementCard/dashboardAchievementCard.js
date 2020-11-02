import React from 'react'
import { connect } from 'react-redux'

import './dashboardAchievementCard.css'

const DashboardAchievementCard = (props) => {
  return (
    <div className="dashboard_achievement_card">
      <div className="dashboard_achievement_card_img_container">
        <img
          className={ props.unlocked ? 'dashboard_achievement_card_img_unlocked' : 'dashboard_achievement_card_img_locked' }
          alt={ props.achievement.text }
          src={ props.achievement.img }
        />
      </div>
      <div className={ props.unlocked ? "dashboard_achievement_card_text_container_unlocked" : "dashboard_achievement_card_text_container_locked"}>
        <h4>{ props.achievement.title }</h4>
        <h5>{ props.achievement.text }</h5>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(DashboardAchievementCard)
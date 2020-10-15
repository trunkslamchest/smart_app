import React from 'react'
import { connect } from 'react-redux'

import './dashboardAchievementCard.css'

const DashboardAchievementCard = (props) => {

  let img = <></>

  if(props.achievement.img){
    img =
      <img
        alt={ props.achievement.text }
        src={ props.achievement.img }
      />
  }

  return (
    <div className="dashboard_achievement_card">
      <div className="dashboard_achievement_card_img_container">
        { img }
      </div>
      <div className="dashboard_achievement_card_text_container">
        <h4>{ props.achievement.title }</h4>
        <h5>{ props.achievement.text }</h5>
      </div>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
    // achievements: state.achievements
  }
}

export default connect(mapStateToProps)(DashboardAchievementCard)
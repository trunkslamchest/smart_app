import React from 'react'
import { connect } from 'react-redux'

import './resultsAchievementCard.css'

const ResultsAchievementCard = (props) => {

  let achievementData = props.achievements.all[props.achievement]

  return(
    <div className="results_achievement_card">
      <div className="results_achievement_card_img_container">
        <img
          alt={ achievementData.text }
          src={ achievementData.img }
        />
      </div>
      <div className="results_achievement_card_text_container">
        <h4>{ achievementData.title }</h4>
        <h5>{ achievementData.text }</h5>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    achievements: state.achievements
  }
}

export default connect(mapStateToProps)(ResultsAchievementCard)


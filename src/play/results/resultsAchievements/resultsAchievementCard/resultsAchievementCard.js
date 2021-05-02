import React from 'react'
import { connect } from 'react-redux'

import './resultsAchievementCard.css'

const ResultsAchievementCard = (props) => {
  return(
    <>
      { props.achievements.all &&
        <div className="results_achievement_card">
          <div className="results_achievement_card_img_container">
            <img
              alt={ props.achievements.all[props.achievement].text }
              src={ props.achievements.all[props.achievement].img }
            />
          </div>
          <div className="results_achievement_card_text_container">
            <h4>{ props.achievements.all[props.achievement].title }</h4>
            <h5>{ props.achievements.all[props.achievement].text }</h5>
          </div>
        </div>
      }
    </>
  )
}

const store = store => {
  return {
    achievements: store.achievements
  }
}

export default connect(store)(ResultsAchievementCard)


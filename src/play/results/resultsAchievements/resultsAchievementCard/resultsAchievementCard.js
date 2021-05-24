import React from 'react'
import { connect } from 'react-redux'

import './resultsAchievementCard.css'

const ResultsAchievementCard = (props) => {
  return(
    <>
      { props.allAchievements &&
        <div className="results_achievement_card">
          <div className="results_achievement_card_img_container">
            <img
              alt={ props.allAchievements[props.achievement].text }
              src={ props.allAchievements[props.achievement].img }
            />
          </div>
          <div className="results_achievement_card_text_container">
            <h4>{ props.allAchievements[props.achievement].title }</h4>
            <h5>{ props.allAchievements[props.achievement].text }</h5>
          </div>
        </div>
      }
    </>
  )
}

const store = store => {
  return {
    allAchievements: store.achievements.all
  }
}

export default connect(store)(ResultsAchievementCard)


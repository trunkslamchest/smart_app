import React from 'react'
import { connect } from 'react-redux'

import './resultsAchievementCard.css'

const ResultsAchievementCard = (props) => {

  const componentClasses = {
    achievementCard: 'results_achievement_card',
    achievementCardImg: 'results_achievement_card_img_container'
  }

  return(
    <>
      { props.allAchievements &&
        <div className={ componentClasses.achievementCard }>
          <h4>{ props.allAchievements[props.achievement].title }</h4>
          <div className={ componentClasses.achievementCardImg }>
            <img
              alt={ props.allAchievements[props.achievement].text }
              src={ props.allAchievements[props.achievement].img }
            />
          </div>
          <h5>{ props.allAchievements[props.achievement].text }</h5>
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


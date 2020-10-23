import React from 'react'
import { connect } from 'react-redux'

import ResultsAchievementCard from './resultsAchievementCard/resultsAchievementCard'

import './resultsAchievementsContainer.css'

const ResultsAchievementContainer = (props) => {

    let distribAchievements = <></>, achievementHeader = 'static_achievementHeaderTemp'

    if(props.play.results) {
      if(props.play.results.achievements && props.showAchievements){
        distribAchievements = props.play.results.achievements.unlocked.map(achievement => {
          return (
            <ResultsAchievementCard
              key={ props.play.results.achievements.unlocked.indexOf(achievement) }
              achievement={ achievement }
            />
          )
        })
        if(props.play.results.achievements.unlocked.length > 1) achievementHeader = <h3>New Achievements Unlocked!</h3>
        else if(props.play.results.achievements.unlocked.length === 1) achievementHeader = <h3>New Achievement Unlocked!</h3>
        else achievementHeader = <></>
      }
    }

  return(
    <div className='results_achievement_container'>
      { achievementHeader }
      <div className='results_achievement_sub_container'>
        { distribAchievements }
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    play: state.play,
    achievements: state.achievements
  }
}

export default connect(mapStateToProps)(ResultsAchievementContainer)
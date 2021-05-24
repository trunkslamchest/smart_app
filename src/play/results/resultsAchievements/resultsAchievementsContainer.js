import React from 'react'
import { connect } from 'react-redux'

import ResultsAchievementCard from './resultsAchievementCard/resultsAchievementCard'

import './resultsAchievementsContainer.css'

const ResultsAchievementContainer = (props) => {

    let distribAchievements, achievementHeader

    if(!props.staticResults) {
      if(props.unlockedAchievements && props.showAchievements){
        distribAchievements = props.unlockedAchievements.map(achievement => {
          return (
            <ResultsAchievementCard
              key={ props.unlockedAchievements.indexOf(achievement) }
              achievement={ achievement }
            />
          )
        })
        if(props.unlockedAchievements.length > 1) achievementHeader = <h3>New Achievements Unlocked!</h3>
        else if(props.unlockedAchievements.length === 1) achievementHeader = <h3>New Achievement Unlocked!</h3>
        else achievementHeader = <></>
      }
    } else {
      if(props.staticUserAchievements && props.showAchievements){
        distribAchievements = props.staticUserAchievements.unlocked.map(achievement => {
          return (
            <ResultsAchievementCard
              key={ props.staticUserAchievements.unlocked.indexOf(achievement) }
              achievement={ achievement }
            />
          )
        })
        if(props.staticUserAchievements.unlocked.length > 1) achievementHeader = <h3>New Achievements Unlocked!</h3>
        else if(props.staticUserAchievements.unlocked.length === 1) achievementHeader = <h3>New Achievement Unlocked!</h3>
        else achievementHeader = <></>
      }
    }

  return(
    <>
      { !!distribAchievements && !!distribAchievements.length &&
        <div className='results_achievement_container'>
          <div className='results_achievement_header_container'>
            { achievementHeader }
          </div>
          <div className='results_achievement_sub_container'>
            { distribAchievements }
          </div>
        </div>
      }
    </>
  )
}

const store = store => {
  return{
    unlockedAchievements: store.play.results ? store.play.results.achievements.unlocked : null,
    staticUserAchievements: store.questions.staticUserResults ? store.questions.staticUserResults.achievements : null,
  }
}

export default connect(store)(ResultsAchievementContainer)
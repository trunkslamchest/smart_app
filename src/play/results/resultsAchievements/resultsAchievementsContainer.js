import React from 'react'
import { connect } from 'react-redux'

import ResultsAchievementCard from './resultsAchievementCard/resultsAchievementCard'

import './resultsAchievementsContainer.css'

const ResultsAchievementContainer = (props) => {

    const componentClasses = {
      containerClass: 'results_achievement_container',
      subContainerClass: props.staticResults ? 'results_achievement_sub_container results_achievement_sub_container_last' : 'results_achievement_sub_container',
      headerClass: 'results_achievement_header_container'
    }

    let distribAchievements, achievementHeader

    if(!props.staticResults) {
      if(props.unlockedAchievements && props.showAchievements){
        distribAchievements = props.unlockedAchievements.map((achievement, index) => {
          return (
            <ResultsAchievementCard
              achievement={ achievement }
              // cardNumber={ index }
              // key={ index }
              totalAchievements={ props.unlockedAchievements.length - 1 }
            />
          )
        })
        if(props.unlockedAchievements.length > 1) achievementHeader = <h3>New Achievements Unlocked!</h3>
        else if(props.unlockedAchievements.length === 1) achievementHeader = <h3>New Achievement Unlocked!</h3>
        else achievementHeader = <></>
      }
    } else {
      if(props.staticUserAchievements && props.showAchievements){
        distribAchievements = props.staticUserAchievements.unlocked.map((achievement, index) => {
          return (
            <ResultsAchievementCard
              achievement={ achievement }
              // cardNumber={ index }
              // key={ index }
              totalAchievements={ props.staticUserAchievements.unlocked.length - 1 }
            />
          )
        })
        if(props.staticUserAchievements.unlocked.length >= 1) achievementHeader = <h3>New Achievements Unlocked!</h3>
        else if(props.staticUserAchievements.unlocked.length === 1) achievementHeader = <h3>New Achievement Unlocked!</h3>
        else achievementHeader = <></>
      }
    }

  return(
    <>
      { !!distribAchievements && !!distribAchievements.length &&
        <div className={ componentClasses.containerClass }>
          <div className={ componentClasses.headerClass }>
            { achievementHeader }
          </div>
          <div className={ componentClasses.subContainerClass }>
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
import React from 'react'
import { connect } from 'react-redux'

import ResultsAchievementCard from './resultsAchievementCard/resultsAchievementCard'

import './resultsAchievementsContainer.css'

const ResultsAchievementContainer = (props) => {

    let distribAchievements, achievementHeader

    if(!props.staticResults) {
      if(props.play.results.achievements.unlocked && props.showAchievements){
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

    if(props.questions.staticUserResults) {
      if(props.questions.staticUserResults.achievements.unlocked && props.showAchievements){
        distribAchievements = props.questions.staticUserResults.achievements.unlocked.map(achievement => {
          return (
            <ResultsAchievementCard
              key={ props.questions.staticUserResults.achievements.unlocked.indexOf(achievement) }
              achievement={ achievement }
            />
          )
        })
        if(props.questions.staticUserResults.achievements.unlocked.length > 1) achievementHeader = <h3>New Achievements Unlocked!</h3>
        else if(props.questions.staticUserResults.achievements.unlocked.length === 1) achievementHeader = <h3>New Achievement Unlocked!</h3>
        else achievementHeader = <></>
      }
    }

  return(
    <>
      { !!distribAchievements && !!distribAchievements.length &&
        <div className='results_achievement_container'>
          { achievementHeader }
          <div className='results_achievement_sub_container'>
            { distribAchievements }
          </div>
        </div>
      }
    </>
  )
}

const mapStateToProps = state => {
  return{
    achievements: state.achievements,
    play: state.play,
    questions: state.questions
  }
}

export default connect(mapStateToProps)(ResultsAchievementContainer)
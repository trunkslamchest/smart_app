import React from 'react'

import DashboardStatsDifficultyCatCard from '../dashboardStatsDifficultyCatCard/dashboardStatsDifficultyCatCard'

import './dashboardStatsDifficultyAnswersContainer.css'

const DashboardStatsDifficultyAnswersContainer = (props) => {

  let cats = Object.entries(props.cats)

  let distribCats = cats.map(questions => {
    return(
      <DashboardStatsDifficultyCatCard
        key={ cats.indexOf(questions) }
        cat={ questions[0] }
        questions={ questions[1] }
      />
    )
  })

  return(
    <div className='dashboard_stats_difficulty_answers_container'>
        { distribCats }
    </div>
  )
}

export default DashboardStatsDifficultyAnswersContainer
import React from 'react'

import DashboardStatsDifficultyCatAnswerCard from '../dashboardStatsDifficultyCatAnswerCard/dashboardStatsDifficultyCatAnswerCard'

import './dashboardStatsDifficultyCatCard.css'

const DashboardStatsDifficultyCatCard = (props) => {

  // console.log(props)

  let questions = Object.entries(props.questions)

  let distribAnswers = questions.map(answer => {
    return(
      <DashboardStatsDifficultyCatAnswerCard
        key={ answer[0] }
        answer={ answer[1] }
      />
    )
  })
  // console.log(answers[1])

  return(
    <div className="dashboard_stats_difficulty_cat_card">
      <h3>{ props.cat }</h3>
      { distribAnswers }
    </div>
  )
}

export default DashboardStatsDifficultyCatCard
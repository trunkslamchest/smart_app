import React from 'react'

import DashboardStatsDifficultyCatAnswerCard from '../dashboardStatsDifficultyCatAnswerCard/dashboardStatsDifficultyCatAnswerCard'

import './dashboardStatsDifficultyCatCard.css'

const DashboardStatsDifficultyCatCard = (props) => {

  let questions = Object.entries(props.questions)

  let distribAnswers = questions.map(answer => {
    return(
      <DashboardStatsDifficultyCatAnswerCard
        key={ answer[0] }
        answer={ answer[1] }
      />
    )
  })

  return(
    <div className="dashboard_stats_difficulty_cat_card">
      <div className="dashboard_stats_difficulty_cat_card_header">
        <h3>{ props.cat }</h3>
      </div>
      { distribAnswers }
    </div>
  )
}

export default DashboardStatsDifficultyCatCard
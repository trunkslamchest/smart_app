import React from 'react'

// import DashboardStatsDifficultyCatAnswerCard from '../dashboardStatsDifficultyCatAnswerCard/dashboardStatsDifficultyCatAnswerCard'
import DashboardStatsAnswerCard from '../dashboardStatsAnswerCard/dashboardStatsAnswerCard'

import './dashboardStatsAnswersWrapper.css'

const DashboardStatsAnswersWrapper = (props) => {

  // console.log(props)

  let questions = Object.entries(props.questions)

  let distribAnswers = questions.map(answer => {
    return(
      <DashboardStatsAnswerCard
        key={ answer[0] }
        answer={ answer[1] }
      />
    )
  })

  return(
    <div className="dashboard_stats_answers_wrapper">
      <div className="dashboard_stats_answers_wrapper_header">
        <h3>{ props.qSet }</h3>
      </div>
      { distribAnswers }
    </div>
  )
}

export default DashboardStatsAnswersWrapper
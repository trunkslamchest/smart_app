import React from 'react'

import DashboardStatsAnswerCard from '../dashboardStatsAnswerCard/dashboardStatsAnswerCard'

import './dashboardStatsAnswersWrapper.css'

const DashboardStatsAnswersWrapper = (props) => {

  let questions = Object.entries(props.questions)

  let distribAnswers = questions.map(answer => {
    return(
      <DashboardStatsAnswerCard
        answer={ answer[1] }
        diff={ props.diff }
        cat={ props.cat }
        history={ props.history }
        key={ answer[0] }
        qid={ answer[0] }
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
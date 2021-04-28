import React from 'react'

import DashboardStatsAnswerCard from '../dashboardStatsAnswerCard/dashboardStatsAnswerCard'

import './dashboardStatsAnswersWrapper.css'

const DashboardStatsAnswersWrapper = (props) => {
  return(
    <div className="dashboard_stats_answers_wrapper">
      <DashboardStatsAnswerCard
        answer={ props.questions }
        diff={ props.diff }
        cat={ props.cat }
        history={ props.history }
        qid={ props.qid }
      />
    </div>
  )
}

export default DashboardStatsAnswersWrapper
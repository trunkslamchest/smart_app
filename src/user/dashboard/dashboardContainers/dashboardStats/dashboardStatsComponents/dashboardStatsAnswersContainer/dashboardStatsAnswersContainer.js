import React from 'react'

import DashboardStatsAnswersWrapper from '../dashboardStatsAnswersWrapper/dashboardStatsAnswersWrapper'

import './dashboardStatsAnswersContainer.css'

const DashboardStatsAnswersContainer = (props) => {

  let answers = Object.entries(props.answers)

  let distribAnswers = answers.map(questions => {
    return(
      <DashboardStatsAnswersWrapper
        diff={ !!props.cat ? questions[0] : props.diff }
        cat={ !!props.diff ? questions[0] : props.cat }
        history={ props.history }
        key={ answers.indexOf(questions) }
        qSet={ questions[0] }
        questions={ questions[1] }
      />
    )
  })

  return(
    <div className='dashboard_stats_answers_container'>
      { distribAnswers }
    </div>
  )
}

export default DashboardStatsAnswersContainer
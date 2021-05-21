import React from 'react'

import DashboardStatsAnswerCard from '../dashboardStatsAnswerCard/dashboardStatsAnswerCard'

import './dashboardStatsAnswersContainer.css'

const DashboardStatsAnswersContainer = (props) => {

  let answers = Object.entries(props.answers)

  let distribAnswers = answers.map((question, index) => {
    return(
      <DashboardStatsAnswerCard
        answer={ question[1] }
        diff={ question[1].difficulty.toLowerCase() }
        cat={ question[1].category.toLowerCase() }
        key={ index }
        qid={ question[0] }
      />
    )
  })

  return(
    <>
      <div className='divider_left' />
      <div className='dashboard_stats_answers_header_container'>
        <h1>Questions</h1>
      </div>
      { distribAnswers }
    </>
  )
}

export default DashboardStatsAnswersContainer
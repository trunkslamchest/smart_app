import React from 'react'

import DashboardStatsAnswerCard from '../dashboardStatsAnswerCard/dashboardStatsAnswerCard'

import './dashboardStatsAnswersContainer.css'

const DashboardStatsAnswersContainer = (props) => {

  let answers = Object.entries(props.answers)

  let distribAnswers = answers.map((questions, index) => {
    return(
      <DashboardStatsAnswerCard
        answer={ questions[1] }
        diff={ !!props.cat ? questions[1].difficulty : props.diff }
        cat={ !!props.diff ? questions[1].category : props.cat }
        history={ props.history }
        key={ index }
        qid={ questions[0] }
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
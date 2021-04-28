import React from 'react'

import DashboardStatsAnswersWrapper from '../dashboardStatsAnswersWrapper/dashboardStatsAnswersWrapper'

import './dashboardStatsAnswersContainer.css'

const DashboardStatsAnswersContainer = (props) => {

  let answers = Object.entries(props.answers)

  // console.log(answers)

  let distribAnswers = answers.map((questions, index) => {
    // console.log(questions)
    return(
      <DashboardStatsAnswersWrapper
        diff={ !!props.cat ? questions[1].difficulty : props.diff }
        cat={ !!props.diff ? questions[1].category : props.cat }
        history={ props.history }
        key={ index }
        // qSet={ question[1]. }
        qid={ questions[0] }
        questions={ questions[1] }
      />
    )
  })

  return(
    <div className='dashboard_stats_answers_container'>
      <div className='divider_left' />
      <div className='dashboard_stats_answers_header_container'>
        <h1>Questions</h1>
      </div>
      { distribAnswers }
    </div>
  )
}

export default DashboardStatsAnswersContainer
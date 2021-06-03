import React from 'react'

import DashboardStatsAnswerCard from '../dashboardStatsAnswerCard/dashboardStatsAnswerCard'

import './dashboardStatsAnswersContainer.css'

const DashboardStatsAnswersContainer = (props) => {

  let answers = Object.entries(props.answers)

  let distribAnswers = answers.map((question, index) => {
    let componentClasses = {
      answerCardContainerClass: index < answers.length - 1 ? 'dashboard_stats_answer_card_container' : 'dashboard_stats_answer_card_container dashboard_stats_answer_card_container_last',
      answerCardSubContainerClass: index < answers.length - 1 ? 'dashboard_stats_answer_card_sub_container' : 'dashboard_stats_answer_card_sub_container dashboard_stats_answer_card_sub_container_last'
    }

    return(
      <DashboardStatsAnswerCard
        answer={ question[1] }
        answerCardContainerClass={ componentClasses.answerCardContainerClass }
        answerCardSubContainerClass={ componentClasses.answerCardSubContainerClass }
        answersLimit={ answers.length - 1 }
        diff={ question[1].difficulty.toLowerCase() }
        cardNumber={ index }
        cat={ question[1].category.toLowerCase() }
        key={ index }
        qid={ question[0] }
      />
    )
  })

  return distribAnswers
}

export default DashboardStatsAnswersContainer
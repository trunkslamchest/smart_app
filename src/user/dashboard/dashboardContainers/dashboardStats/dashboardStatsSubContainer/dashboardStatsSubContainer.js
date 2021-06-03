import React from 'react'
import { connect } from 'react-redux'

import DashboardStatsCard from '../dashboardStatsComponents/dashboardStatsCard/dashboardStatsCard'

import './dashboardStatsSubContainer.css'

const DashboardStatsSubContainer = (props) => {

  let sortAnswers = {}

  const componentClasses = {
    noAnswersContainer: 'stats_no_answers_container',
    subContainer: props.qSet === 'category' ? 'stats_sub_container stats_sub_container_bottom' : 'stats_sub_container',
    subHeader: 'stats_sub_header',
    buttonWrapper: 'stats_card_button_wrapper'
  }

  for(let answer in props.userQuestions) {
    sortAnswers[props.userQuestions[answer][props.qSet]] = {
      ...sortAnswers[props.userQuestions[answer][props.qSet]], [answer]: props.userQuestions[answer]
    }
  }

  let qSortSet = Object.entries(sortAnswers)

  if(props.qSet === 'category')
    // eslint-disable-next-line
    qSortSet = Object.entries(qSortSet.sort().reduce((cat, [name, questions]) => (cat[name] = questions , cat), {}))

  let distribAnswers = qSortSet.map((qSet, index) => {
    return(
      <DashboardStatsCard
        answers={ qSet[1] }
        key={ index + 1 }
        qSet={ props.qSet }
        qSubSet={ qSet[0] }
        qSetTotals={ props.questionTotals[props.qSet][qSet[0]] }
        userTotals={ props.userTotals[props.qSet][qSet[0]] }
      />
    )
  })

  return(
    <div className={ componentClasses.subContainer }>
      <div className={ componentClasses.subHeader }>
        <h3>{ props.headerText }</h3>
      </div>
      { distribAnswers }
    </div>
  )
}

const store = (store) => {
  return {
    userQuestions: store.user.questions.list,
    questionTotals: store.questions.totals
  }
}

export default connect(store)(DashboardStatsSubContainer)
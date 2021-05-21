import React from 'react'
import { connect } from 'react-redux'

import DashboardStatsCard from '../dashboardStatsComponents/dashboardStatsCard/dashboardStatsCard'

import './dashboardStatsSubContainer.css'

const DashboardStatsSubContainer = (props) => {

    let sortAnswers = {}, statsBlock = <></>

    for(let answer in props.userQuestions) {
      sortAnswers[props.userQuestions[answer][props.qSet]] = { ...sortAnswers[props.userQuestions[answer][props.qSet]], [answer]: props.userQuestions[answer] }
    }

    const qSortSet = Object.entries(sortAnswers)

    const distribAnswers = qSortSet.map((qSet, index) => {
      return(
        <div className='stats_card_button_wrapper' key={ index + 1 }>
          <DashboardStatsCard
            answers={ qSet[1] }
            qSet={ props.qSet }
            qSubSet={ qSet[0] }
            qSetTotals={ props.questionTotals[props.qSet][qSet[0]] }
            userTotals={ props.userTotals[props.qSet][qSet[0]] }
          />
        </div>
      )
    })

    if(!distribAnswers.length)
      statsBlock =
        <>
          <div className="stats_sub_header">
            <h3>{ props.headerText }</h3>
          </div>
          <div className="stats_no_answers">
            <h3>You have not answered any questions yet</h3>
          </div>
        </>
    else
      statsBlock =
        <>
          <div className="stats_sub_header">
            <h3>{ props.headerText }</h3>
          </div>
          { distribAnswers }
        </>

    return(
      <div className="stats_sub_container">
        { statsBlock }
      </div>
    )
}

const store = (store) => {
  return {
    userQuestions: store.user.questions.list,
    userTotals: store.user.questions.totals,
    questionTotals: store.questions.totals
  }
}

export default connect(store)(DashboardStatsSubContainer)
import React from 'react'
import { connect } from 'react-redux'

import DashboardStatsCard from '../dashboardStatsComponents/dashboardStatsCard/dashboardStatsCard'

const DashboardStatsDifficultyContainer = (props) => {

    var distribAnswers

    if(props.user.questions){
      let allAnswers = props.user.questions.list, diffTotals = Object.entries(props.user.questions.totals.difficulty)

      distribAnswers = diffTotals.map((diff, index) => {
        let sortAnswers = {}

        for(let answer in allAnswers) {
          if(allAnswers[answer].difficulty === diff[0]) sortAnswers[answer] = allAnswers[answer]
        }

        return (
          <div className='stats_card_button_wrapper' key={ index + 1 }>
            <DashboardStatsCard
              answers={ Object.values(sortAnswers).length !== 0 ? sortAnswers : 'null' }
              diff={ diff[0] }
              qSet={ 'difficulty' }
              qSetTotals={ props.questions.totals.difficulty[diff[0]] }
              userTotals={ diff[1] }
            />
          </div>
        )
      })
    }

    return(
      <div className="stats_sub_container">
        <div className="stats_sub_header">
          <h3>Difficulties</h3>
        </div>
        { distribAnswers[0] }
        { distribAnswers[2] }
        { distribAnswers[1] }
      </div>
    )
}

const store = (store) => {
  return {
    user: store.user,
    questions: store.questions
  }
}

export default connect(store)(DashboardStatsDifficultyContainer)
import React from 'react'
import { connect } from 'react-redux'

import DashboardStatsCard from '../dashboardStatsComponents/dashboardStatsCard/dashboardStatsCard'

import './dashboardStatsCategory.css'

const DashboardStatsCategoryContainer = (props) => {

    var distribAnswers

    if(props.user.questions){
      let allAnswers = props.user.questions.list, catTotals = Object.entries(props.user.questions.totals.category)

      distribAnswers = catTotals.map((cat, index) => {
        let sortAnswers = {}

        for(let answer in allAnswers) {
          if(allAnswers[answer].category === cat[0]) sortAnswers[answer] = allAnswers[answer]
        }

        return <DashboardStatsCard
                answers={ Object.values(sortAnswers).length !== 0 ? sortAnswers : 'null' }
                history={ props.history }
                key={ index + 1 }
                cat={ cat[0] }
                qSet={ 'category' }
                qSetTotals={ props.questions.totals.category[cat[0]] }
                userTotals={ cat[1] }
              />
      })
    }

    return(
      <div className="stats_sub_container">
        <div className="stats_sub_header">
          <h3>Categories</h3>
        </div>
        { distribAnswers }
      </div>
    )
}

const store = (store) => {
  return {
    user: store.user,
    questions: store.questions
  }
}

const dispatch = (dispatch) => {
  return {

  }
}

export default connect(store, dispatch)(DashboardStatsCategoryContainer)
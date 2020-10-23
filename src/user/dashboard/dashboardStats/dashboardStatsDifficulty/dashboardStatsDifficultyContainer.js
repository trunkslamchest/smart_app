import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardStatsCard from '../dashboardStatsComponents/dashboardStatsCard/dashboardStatsCard'

import './dashboardStatsDifficulty.css'

class DashboardStatsDifficultyContainer extends React.Component {
  render(){

    var distribDiffs

    if(this.props.user.questions){
      let allAnswers = this.props.user.questions, diffTotals = Object.entries(this.props.user.questions.totals.difficulty)
      distribDiffs = diffTotals.map(diff => {
        return (<DashboardStatsCard
          answers={ !!allAnswers[diff[0]] ? allAnswers[diff[0]].categories : "null" }
          history={ this.props.history }
          diff={ diff[0] }
          key={ diffTotals.indexOf(diff) + 1 }
          qSet={ diff }
          totals={ this.props.questions.totals.difficulty }
        />)
        }
      )
    }

    return(
      <div className="stats_sub_container">
        <div className="stats_sub_header">
          <h3>Difficulties</h3>
        </div>
        { distribDiffs[0] }
        { distribDiffs[2] }
        { distribDiffs[1] }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsDifficultyContainer)
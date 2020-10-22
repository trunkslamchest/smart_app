import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardStatsCard from '../dashboardStatsComponents/dashboardStatsCard/dashboardStatsCard'

import './dashboardStatsDifficulty.css'

class DashboardStatsDifficultyContainer extends React.Component {
  render(){

    var distribDiffs

    if(this.props.user.questions){
      let diffs = Object.entries(this.props.user.questions.totals.difficulty)
      distribDiffs = diffs.map(diff =>
        <DashboardStatsCard
          key={ diffs.indexOf(diff) + 1 }
          qSet={ diff }
          totals={ this.props.questions.totals.difficulty }
        />
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
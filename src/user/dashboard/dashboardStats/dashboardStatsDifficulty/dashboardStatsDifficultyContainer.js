import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardStatsDifficultyCard from './dashboardStatsDifficultyCard'

import './dashboardStatsDifficulty.css'

class DashboardStatsDifficultyContainer extends React.Component {
  render(){

    var distribDiffs = <></>

    if(this.props.user.questions){
      let diffs = Object.entries(this.props.user.questions.totals.difficulty)
      distribDiffs = diffs.map(diff =>
        <DashboardStatsDifficultyCard
          key={diffs.indexOf(diff) + 1}
          difficulty={diff}
        />
      )
    }

    return(
      <div className="stats_difficulty">
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
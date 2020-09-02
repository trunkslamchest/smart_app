import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import './dashboardStatsDifficulty.css'

class DashboardStatsDifficulty extends React.Component {

  render(){
    return(
      <div className="stats_difficulty">
        <div className="stats_header">
          <h3> Difficulty </h3>
        </div>
        <div className="stats_body">
          {/* { easy_questions }
          { medium_questions }
          { hard_questions } */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsDifficulty)
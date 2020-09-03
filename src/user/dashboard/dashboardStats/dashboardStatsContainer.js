import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardStatsTotal from './dashboardStatsTotal/dashboardStatsTotal'
import DashboardStatsDifficultyContainer from './dashboardStatsDifficulty/dashboardStatsDifficultyContainer'
import DashboardStatsCategoryContainer from './dashboardStatsCategory/dashboardStatsCategoryContainer'

import './dashboardStats.css'

class DashboardStatsContainer extends React.Component {
  render(){
    return(
      <div className={ "stats_wrapper"}>
        <DashboardStatsTotal />
        <DashboardStatsDifficultyContainer />
        <DashboardStatsCategoryContainer />
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsContainer)
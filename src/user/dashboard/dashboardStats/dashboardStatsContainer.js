import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import './dashboardStats.css'

class DashboardStatsContainer extends React.Component {

  render(){
    return(
      <div className={ "stats_wrapper"}>
        {/* { totalStats }
        { byDifficulty }
        { byCategory } */}
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
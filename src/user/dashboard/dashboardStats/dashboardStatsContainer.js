import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actionIndex'

import DashboardStatsTotal from './dashboardStatsTotal/dashboardStatsTotal'
import DashboardStatsDifficultyContainer from './dashboardStatsDifficulty/dashboardStatsDifficultyContainer'
import DashboardStatsCategoryContainer from './dashboardStatsCategory/dashboardStatsCategoryContainer'

import './dashboardStats.css'

class DashboardStatsContainer extends React.Component {

  // componentDidMount(){
  //   this.props.onGetQuestionTotals()
  //   this.props.onUpdateUserQuestions()
  // }

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
    auth: state.auth,
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetQuestionTotals: () => dispatch(actions.getQuestionTotals()),
    onUpdateUserQuestions: () => dispatch(actions.updateUserQuestions())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsContainer)
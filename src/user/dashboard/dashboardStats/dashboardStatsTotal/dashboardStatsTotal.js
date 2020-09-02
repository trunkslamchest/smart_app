import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import './dashboardStatsTotal.css'

class DashboardStatsTotal extends React.Component {

  render(){
    return(
    <div className="stats_total">
      <ul>
        {/* <li>{ totalQuestionsAnswered }/{ totalQuestions } answered ({totalQuestionsAnsweredPercent}%)</li> */}
        <li>nill / nill answered (nill%)</li>

        {/* <li>{ totalQuestionsAnswered > 0 ? correct_answers : "0/0 correct (0.00%)" }</li> */}
        <li>{ "nill" > 0 ? "nill" : "0/0 correct (0.00%)" }</li>

        <br />
        {/* <li>{ this.state.user_answers.length > 0 ? `Average Time: ${this.state.average_time} seconds` : "Average Time: 0.00 seconds" }</li> */}
        <li>{ "nill" > 0 ? `Average Time: ${"nill"} seconds` : "Average Time: 0.00 seconds" }</li>

        {/* <li>Outta Times: { totalQuestionsWithNoAnswers }</li> */}
        <li>Outta Times: nill</li>

      </ul>
      <div className="stats_total_rating">
        <h2><span>SmartApp</span>™ Rating</h2>
        {/* { totalQuestionsAnswered < 5 ? stats_rating_countdown : rating } */}
        { "nill" < 5 ? "nill" : "nill" }

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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsTotal)
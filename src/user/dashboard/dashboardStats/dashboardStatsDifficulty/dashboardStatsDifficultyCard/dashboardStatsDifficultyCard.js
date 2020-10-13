import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import trend_arrow_up from '../../../../../assets/trends/trend_arrow_up.png'
import trend_arrow_down from '../../../../../assets/trends/trend_arrow_down.png'

import './dashboardStatsDifficultyCard.css'

class DashboardStatsDifficultyCard extends React.Component {

  numZero = (num) => {
    let a = num.split('')
    return !!parseInt(a[ a.length - 1]) ? parseFloat(a.join('')) : Math.round(parseInt(num))
  }

  render(){

    const diff = this.props.difficulty[0]
    const stats = this.props.difficulty[1]

    const arrow_up =
      <img
        alt='Higher than global average'
        className='trend_arrow'
        src={ trend_arrow_up }
      />

    const arrow_down =
      <img
        alt='Lower than global average'
        className='trend_arrow'
        src={ trend_arrow_down }
      />

    let questionsAnswered = ((stats.answered / this.props.questions.totals.difficulty[diff].totals.questions) * 100).toFixed(2)
    let questionsCorrect = "0.00"

    if(stats.answered > 0) questionsCorrect = parseFloat((stats.correct / stats.answered) * 100).toFixed(2)

    questionsAnswered = this.numZero(questionsAnswered)
    questionsCorrect = this.numZero(questionsCorrect)

    return(
      <div className="stats_difficulty_sub_container">
        <h3>{ diff }</h3>
        <div className="stats_difficulty_wrapper">
          <div className="stats_difficulty_stats_container">
            <div className="stats_difficulty_rank_rating_container">
              <div className="stats_difficulty_rank_rating_sub_container">
                <h4>Rank</h4>
                <span>{ stats.rank }</span>
              </div>
              <div className="stats_difficulty_rank_rating_sub_container">
                <h4>Rating</h4>
                <span>{ stats.rating }</span>
              </div>
            </div>
            <div className="stats_difficulty_answers_container">
              <span>{ stats.answered }/{ this.props.questions.totals.difficulty[diff].totals.questions } answered ({ questionsAnswered }%)</span>
              <span>
                { stats.correct }/{ stats.answered } correct ({ questionsCorrect }%)
                { questionsCorrect > this.props.questions.totals.difficulty[diff].averages.questions.correct ? arrow_up : arrow_down }
              </span>
            </div>
            <div className="stats_difficulty_time_container">
              <span>
                Average Time: { stats.avg_time } seconds
                { stats.avg_time < this.props.questions.totals.difficulty[diff].averages.questions.avgTime ? arrow_up : arrow_down }
              </span>
              <span>Outta Times: { stats.outta_times }</span>
            </div>
          </div>
          <div className="stats_difficulty_graph_container">
            <span>temp graph</span>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsDifficultyCard)
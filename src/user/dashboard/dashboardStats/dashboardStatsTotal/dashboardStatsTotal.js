import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import './dashboardStatsTotal.css'

class DashboardStatsTotal extends React.Component {

  calcRating = (answered, correct) => {
    let questionFactor = ((parseFloat(answered) + parseFloat(correct)) / 2.00) / 100
    let noAnswersFactor = this.props.user.questions.totals.all.outta_times * 0.25
    let timeFactor = (10 - this.props.user.questions.totals.all.avg_time) * questionFactor
    let finalFactor = this.props.user.questions.totals.all.outta_times === 0 ? timeFactor : timeFactor - noAnswersFactor
    let finalRating = finalFactor.toFixed(2)
    return finalRating
  }

  numZero = (num) => {
    let a = num.split('')
    return !!parseInt(a[ a.length - 1]) ? parseFloat(a.join('')) : Math.round(parseInt(num))
  }

  render(){

    let totalStats = <></>

    if(this.props.user.questions){
      let totalQuestionsAnswered = ((this.props.user.questions.totals.all.answered / this.props.questions.totals.all.questions) * 100).toFixed(2)
      let totalQuestionsCorrect = ((this.props.user.questions.totals.all.correct / this.props.user.questions.totals.all.answered) * 100).toFixed(2)
      let rating

      if(this.props.user.questions.totals.all.answered > 5) rating = <h1>{ this.calcRating(totalQuestionsAnswered, totalQuestionsCorrect) }</h1>
      else rating = <p>Answer <span>{5 - this.props.user.questions.totals.all.answered}</span> more questions to receive a rating!</p>

      totalQuestionsAnswered = this.numZero(totalQuestionsAnswered)
      totalQuestionsCorrect = this.numZero(totalQuestionsCorrect)

      totalStats =
        <div className="stats_total">
          <ul>
            <li>{ this.props.user.questions.totals.all.answered }/{ this.props.questions.totals.all.questions } answered ({ totalQuestionsAnswered }%)</li>
            <li>{ this.props.user.questions.totals.all.correct }/{ this.props.user.questions.totals.all.answered } correct ({ totalQuestionsCorrect }%)</li>
            <br />
            <li>Average Time: { this.props.user.questions.totals.all.avg_time } seconds</li>
            <li>Outta Times: { this.props.user.questions.totals.all.outta_times }</li>
          </ul>
          <div className="stats_total_rating">
            <h2><span>SmartApp</span>™ Rating</h2>
            { rating }
          </div>
        </div>
    }

    return(<>{ totalStats }</>)
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsTotal)
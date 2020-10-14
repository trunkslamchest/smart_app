import React from 'react'
import { connect } from 'react-redux'

import levels from '../../../../datasets/levels'

import trend_arrow_up from '../../../../assets/trends/trend_arrow_up.png'
import trend_arrow_down from '../../../../assets/trends/trend_arrow_down.png'

import './dashboardStatsTotal.css'
import './dashboardStatsXP.css'
import './dashboardStatsPerformance.css'

class DashboardStatsTotal extends React.Component {

  numZero = (num) => {
    let a = num.split('')
    return !!parseInt(a[ a.length - 1]) ? parseFloat(a.join('')) : Math.round(parseInt(num))
  }

  xpBar = () => {
    let currXP = this.props.user.experience.total, prevLevelXP = parseInt(levels[this.props.user.experience.level - 1])
    if(this.props.user.experience.level === 1) return currXP
    else return currXP - prevLevelXP
  }

  render(){

    const xpBarClass = {
      border: "1px solid rgba(200, 200, 200, 1)",
      boxSizing: "border-box",
      background: "green",
      height: "10px",
      width: `${ this.xpBar() }%`
    }

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

    let totalStats = <></>, rank = <span>NR</span>, rating = <span>NR</span>,
        header = <p>Answer <span>{ 5 - this.props.user.questions.totals.all.answered }</span> more questions to receive a rank & rating</p>,
        performance = <p>Answer <span>{ 5 - this.props.user.questions.totals.all.answered }</span> more questions to receive a rating!</p>,
        totalQuestionsAnswered = (0).toFixed(2), totalQuestionsCorrect = (0).toFixed(2)

    if(this.props.user.questions){
      totalQuestionsAnswered = ((this.props.user.questions.totals.all.answered / this.props.questions.totals.all.totals.questions) * 100).toFixed(2)
      if(this.props.user.questions.totals.all.answered > 0) totalQuestionsCorrect = ((this.props.user.questions.totals.all.correct / this.props.user.questions.totals.all.answered) * 100).toFixed(2)

      if(this.props.user.questions.totals.all.answered >= 5) {
        header = <></>
        rank = this.props.user.questions.totals.all.rank
        rating = this.props.user.questions.totals.all.rating
        performance =
          <>
            { header }
            <div className="stats_performance_sub_container">
              <div className="stats_total_rank">
                <h2>SmartApp™ Rank</h2>
                <h1>{ rank }</h1>
              </div>
              <div className="stats_total_rating">
                <h2>SmartApp™ Rating</h2>
                <div className="stats_total_rating_sub_container">
                  <h1>{ (rating * 10).toFixed(2) }</h1>
                  { rating > this.props.questions.totals.all.averages.questions.performance ? arrow_up : arrow_down }
                </div>
              </div>
            </div>
          </>
      }

      totalQuestionsAnswered = this.numZero(totalQuestionsAnswered)
      totalQuestionsCorrect = this.numZero(totalQuestionsCorrect)

      totalStats =
        <div className="stats_total">
          <ul>
            <li>{ this.props.user.questions.totals.all.answered }/{ this.props.questions.totals.all.totals.questions } answered ({ totalQuestionsAnswered }%)</li>
            <li>
                { this.props.user.questions.totals.all.correct }/{ this.props.user.questions.totals.all.answered } correct ({ totalQuestionsCorrect }%)
                { totalQuestionsCorrect > this.props.questions.totals.all.averages.questions.correct ? arrow_up : arrow_down }
            </li>
            <br />
            <li>
              Average Time: { this.props.user.questions.totals.all.avg_time } seconds
              { this.props.user.questions.totals.all.avg_time < this.props.questions.totals.all.averages.questions.avgTime ? arrow_up : arrow_down }


            </li>
            <li>Outta Times: { this.props.user.questions.totals.all.outta_times }</li>
          </ul>

          <div className="stats_xp_perf_container">
            <div className="stats_experience_container">
              <h3>Level { this.props.user.experience.level }</h3>
              <div className="stats_experience_bar_container">
                <div className="stats_experience_bar">
                  <div style={ xpBarClass }></div>
                </div>
                <h4>{ this.props.user.experience.total }/{ levels[this.props.user.experience.level] }</h4>
              </div>
            </div>

            <div className="stats_performance_container">
              { performance }
            </div>

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

export default connect(mapStateToProps)(DashboardStatsTotal)
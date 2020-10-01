import React from 'react'
import { connect } from 'react-redux'

import levels from '../../../../datasets/levels'

import './dashboardStatsTotal.css'
import './dashboardStatsXP.css'
import './dashboardStatsPerformance.css'

class DashboardStatsTotal extends React.Component {

  numZero = (num) => {
    let a = num.split('')
    return !!parseInt(a[ a.length - 1]) ? parseFloat(a.join('')) : Math.round(parseInt(num))
  }

  render(){

const xpBar = () => {
  let currXP = this.props.user.experience.total
  let prevLevelXP = parseInt(levels[this.props.user.experience.level - 1])
  if(this.props.user.experience.level === 1) return currXP
  else return currXP - prevLevelXP
}

    const xpBarClass = {
      border: "1px solid rgba(200, 200, 200, 1)",
      boxSizing: "border-box",
      background: "green",
      height: "10px",
      // width: `${(this.props.user.experience.total / levels[this.props.user.experience.level]) * 100}%`
      width: `${ xpBar() }%`
    }

    let totalStats = <></>, rank = <span>NR</span>, rating = <span>NR</span>,
        header = <p>Answer <span>{5 - this.props.user.questions.totals.all.answered}</span> more questions to receive a rank & rating</p>,
        performance = <p>Answer <span>{5 - this.props.user.questions.totals.all.answered}</span> more questions to receive a rating!</p>,
        totalQuestionsAnswered = (0).toFixed(2), totalQuestionsCorrect = (0).toFixed(2)

    if(this.props.user.questions){
      totalQuestionsAnswered = ((this.props.user.questions.totals.all.answered / this.props.questions.totals.all.questions) * 100).toFixed(2)
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
                <h1>{ rating }</h1>
              </div>
            </div>
          </>
      }

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
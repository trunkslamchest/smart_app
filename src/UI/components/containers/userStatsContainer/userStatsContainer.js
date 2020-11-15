import React from 'react'

import levels from '../../../../datasets/levels'

import trend_arrow_up from '../../../../assets/trends/trend_arrow_up.png'
import trend_arrow_down from '../../../../assets/trends/trend_arrow_down.png'

import './userStatsTotal.css'
import './userStatsXP.css'
import './userStatsPerformance.css'

const UserStatsTotal = (props) => {

  const numZero = (num) => {
    let a = num.split('')
    return !!parseInt(a[ a.length - 1]) ? parseFloat(a.join('')) : Math.round(parseInt(num))
  }

  const xpBar = () => {
    let currXP = props.user_experience.total, prevLevelXP = parseInt(levels[props.user_experience.level - 1])
    if(props.user_experience.level === 1) return currXP
    else return currXP - prevLevelXP
  }

  const xpBarClass = {
    border: "0px solid rgba(200, 200, 200, 1)",
    boxSizing: "border-box",
    background: "green",
    height: "10px",
    width: `${ xpBar() }%`
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

  let totalStats = <></>
  let rank = <span>NR</span>
  let rating = <span>NR</span>
  let header = <p>Answer <span>{ 5 - props.user_questions.all.answered }</span> more questions to receive a rank & rating</p>
  let performance = <p>Answer <span>{ 5 - props.user_questions.all.answered }</span> more questions to receive a rating!</p>
  let totalQuestionsAnswered = (0).toFixed(2), totalQuestionsCorrect = (0).toFixed(2)

  if(props.user_questions && props.question_totals){
    totalQuestionsAnswered = ((props.user_questions.all.answered / props.question_totals.all.totals.questions) * 100).toFixed(2)
    if(props.user_questions.all.answered > 0) totalQuestionsCorrect = ((props.user_questions.all.correct / props.user_questions.all.answered) * 100).toFixed(2)
    if(props.user_questions.all.answered >= 5) {
      header = <></>
      rank = props.user_questions.all.rank
      rating = props.user_questions.all.rating
      performance =
        <>
          { header }
          <div className="user_stats_performance_sub_container">
            <div className="user_stats_total_rank">
              <h2>SmartApp™ Rank</h2>
              <h1>{ rank }</h1>
            </div>
            <div className="user_stats_total_rating">
              <h2>SmartApp™ Rating</h2>
              <div className="user_stats_total_rating_sub_container">
                <h1>{ (rating * 10).toFixed(2) }</h1>
                { rating > props.question_totals.all.averages.questions.performance ? arrow_up : arrow_down }
              </div>
            </div>
          </div>
        </>
    }

    totalQuestionsAnswered = numZero(totalQuestionsAnswered)
    totalQuestionsCorrect = numZero(totalQuestionsCorrect)

    totalStats =
      <div className="user_stats_total">
        <ul>
          <li>{ props.user_questions.all.answered }/{ props.question_totals.all.totals.questions } answered ({ totalQuestionsAnswered }%)</li>
          <li>
            { props.user_questions.all.correct }/{ props.user_questions.all.answered } correct ({ totalQuestionsCorrect }%)
            { totalQuestionsCorrect > props.question_totals.all.averages.questions.correct ? arrow_up : arrow_down }
          </li>
          <br />
          <li>
            Average Time: { props.user_questions.all.avg_time } seconds
            { props.user_questions.all.avg_time < props.question_totals.all.averages.questions.avgTime ? arrow_up : arrow_down }
          </li>
          <li>Outta Times: { props.user_questions.all.outta_times }</li>
        </ul>
        <div className="user_stats_xp_perf_container">
          <div className="user_stats_experience_container">
            <h3>Level { props.user_experience.level }</h3>
            <div className="user_stats_experience_bar_container">
              <div className="user_stats_experience_bar">
                <div style={ xpBarClass }></div>
              </div>
              <h4>{ props.user_experience.total }/{ levels[props.user_experience.level] }</h4>
            </div>
          </div>
          <div className="user_stats_performance_container">
            { performance }
          </div>
        </div>
      </div>
  }

  return(<>{ totalStats }</>)
}

export default UserStatsTotal

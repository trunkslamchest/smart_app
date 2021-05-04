import React from 'react'

import levels from '../../../../datasets/levels'

import XPBar from '../../xpBar/xpBar'
import ContainerHeader from '../../../../UI/components/headers/containerHeader/containerHeader'

import trendArrowIndex from '../../../../assets/trend_arrows/trendArrowIndex'

import './userStatsTotal.css'
import './userStatsXP.css'
import './userStatsPerformance.css'

const UserStatsTotal = (props) => {

  const numZero = (num) => {
    let a = num.split('')
    return !!parseInt(a[ a.length - 1]) ? parseFloat(a.join('')) : Math.round(parseInt(num))
  }

  const arrow_up =
    <img
      alt='Higher than global average'
      className='trend_arrow'
      src={ trendArrowIndex.greenArrowUp }
    />

  const arrow_down =
    <img
      alt='Lower than global average'
      className='trend_arrow'
      src={ trendArrowIndex.redArrowDown }
    />

  let totalStats
  let performance
  let totalQuestionsAnswered = (0).toFixed(2), totalQuestionsCorrect = (0).toFixed(2)

  if(props.user_questions && props.question_totals){
    totalQuestionsAnswered = ((props.user_questions.all.answered / props.question_totals.all.questions) * 100).toFixed(2)
    if(props.user_questions.all.answered > 0) totalQuestionsCorrect = ((props.user_questions.all.correct / props.user_questions.all.answered) * 100).toFixed(2)
    if(props.user_questions.all.answered >= 5) {
      performance =
        <>
          <div className="user_stats_performance_sub_container">
            <div className="user_stats_total_rank">
              <h2>SmartApp™ Rank</h2>
              <h1>{ props.user_questions.all.rank }</h1>
            </div>
            <div className="user_stats_total_rating">
              <h2>SmartApp™ Rating</h2>
              <div className="user_stats_total_rating_sub_container">
                <h1>{ (props.user_questions.all.rating * 10).toFixed(2) }</h1>
                { props.user_questions.all.rating > props.question_totals.all.averages.rating ? arrow_up : arrow_down }
              </div>
            </div>
          </div>
        </>
    } else {
      if(props.from_dashboard){
        // header = <p>Answer <span>{ 5 - props.user_questions.all.answered }</span> more questions to receive a rank & rating</p>
        performance = <p>Answer <span>{ 5 - props.user_questions.all.answered }</span> more questions to receive a rank & rating!</p>
      } else {
        performance =
          <>
            <div className="user_stats_performance_sub_container">
              <div className="user_stats_total_rank">
                <h2>SmartApp™ Rank</h2>
                <h1>NR</h1>
              </div>
              <div className="user_stats_total_rating">
                <h2>SmartApp™ Rating</h2>
                <div className="user_stats_total_rating_sub_container">
                  <h1>NR</h1>
                  {/* { rating > props.question_totals.all.averages.questions.performance ? arrow_up : arrow_down } */}
                </div>
              </div>
            </div>
          </>
      }
    }

    totalQuestionsAnswered = numZero(totalQuestionsAnswered)
    totalQuestionsCorrect = numZero(totalQuestionsCorrect)

    totalStats =
      <div className="user_stats_total">
        <ul>
          <li>{ props.user_questions.all.answered }/{ props.question_totals.all.questions } answered ({ totalQuestionsAnswered }%)</li>
          <li>
            { props.user_questions.all.correct }/{ props.user_questions.all.answered } correct ({ totalQuestionsCorrect }%)
            { totalQuestionsCorrect > props.question_totals.all.averages.correct ? arrow_up : arrow_down }
          </li>
          <br />
          <li>
            Average Time: { props.user_questions.all.avg_time } seconds
            { props.user_questions.all.avg_time < props.question_totals.all.averages.avgTime ? arrow_up : arrow_down }
          </li>
          <li>Outta Times: { props.user_questions.all.outta_times }</li>
        </ul>
        <div className="user_stats_xp_perf_container">
          <div className="user_stats_experience_container">
            <h3>Level { props.user_experience.level }</h3>
            <div className="user_stats_experience_bar_container">
              <XPBar
                userXP={ props.user_experience.total }
                userLevel={ props.user_experience.level }
                prevLevelXP={ levels[props.user_experience.level - 1] ? levels[props.user_experience.level - 1] : 0 }
              />
              <h4>{ props.user_experience.total }/{ levels[props.user_experience.level] }</h4>
            </div>
          </div>
          <div className="user_stats_performance_container">
            { performance }
          </div>
        </div>
      </div>
  }

  return(
    <>
      { !props.from_dashboard && <ContainerHeader header_text={ 'Statistics' } /> }
      <div className='divider_small' />
      { totalStats }
      <div className='divider_medium' />
    </>
  )
}

export default UserStatsTotal

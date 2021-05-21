import React from 'react'
import { connect } from 'react-redux'

import levels from '../../../../datasets/levels'

import XPBar from '../../xpBar/xpBar'
import makeUserStatsTrendArrows from './userStatsFunctions/makeUserStatsTrendArrows'
import ContainerHeader from '../../../../UI/components/headers/containerHeader/containerHeader'

import trendArrowIndex from '../../../../assets/trend_arrows/trendArrowIndex'

import './userStatsTotal.css'
import './userStatsXP.css'
import './userStatsPerformance.css'
import './userStatsResponse.css'

const UserStatsTotal = (props) => {

  const numZero = (num) => {
    let a = num.split('')
    return !!parseInt(a[ a.length - 1]) ? parseFloat(a.join('')) : Math.round(parseInt(num))
  }

  let trendArrows = makeUserStatsTrendArrows(
    trendArrowIndex,
    props.userQuestions.rating,
    props.questionTotals.averages.rating,
    props.userQuestions.answered,
    props.questionTotals.averages.answers,
    props.userQuestions.correct,
    props.questionTotals.averages.correct,
    props.userQuestions.avg_time,
    props.questionTotals.averages.avgTime,
    props.userQuestions.outta_times,
    props.questionTotals.averages.outta_time
  )

  let totalStats
  let performance
  let totalQuestionsAnswered = (0).toFixed(2), totalQuestionsCorrect = (0).toFixed(2)

  if(props.userQuestions && props.questionTotals){
    totalQuestionsAnswered = ((props.userQuestions.answered / props.questionTotals.questions) * 100).toFixed(2)
    if(props.userQuestions.answered > 0) totalQuestionsCorrect = ((props.userQuestions.correct / props.userQuestions.answered) * 100).toFixed(2)
    if(props.userQuestions.answered >= 5) {
      performance =
        <>
          <div className="user_stats_performance_sub_container">
            <div className="user_stats_total_rank">
              <h2>SmartApp™ Rank</h2>
              <h1>{ props.userQuestions.rank }</h1>
            </div>
            <div className="user_stats_total_rating">
              <h2>SmartApp™ Rating</h2>
              <div className="user_stats_total_rating_sub_container">
                <h1>{ (props.userQuestions.rating * 10).toFixed(2) }</h1>
                { trendArrows.rating }
              </div>
            </div>
          </div>
        </>
    } else {
      if(props.from_dashboard){
        performance = <p>Answer <span>{ 5 - props.userQuestions.answered }</span> more questions to receive a rank & rating!</p>
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
                  { trendArrows.rating }
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
        <div className='user_stats_total_sub_container'>
        <div className='user_stats_total_sub_wrapper'>
          <div className='user_stats_total_sub_row'>
            { props.userQuestions.answered }/{ props.questionTotals.questions } answered ({ totalQuestionsAnswered }%)
            { trendArrows.answered }

          </div>
          <div className='user_stats_total_sub_row'>
            { props.userQuestions.correct }/{ props.userQuestions.answered } correct ({ totalQuestionsCorrect }%)
            { trendArrows.correct }
          </div>
        </div>
        <div className='user_stats_total_sub_wrapper'>
          <div className='user_stats_total_sub_row'>
            Average Time: { props.userQuestions.avg_time } seconds
            { trendArrows.averageTime }
          </div>
          <div className='user_stats_total_sub_row'>
            Outta Times: { props.userQuestions.outta_times }
            { trendArrows.outtaTimes }
          </div>
        </div>
        </div>
        <div className="user_stats_xp_perf_container">
          <div className="user_stats_experience_container">
            <h3>Level { props.userExperience.level }</h3>
            <div className="user_stats_experience_bar_container">
              <XPBar
                userXP={ props.userExperience.total }
                userLevel={ props.userExperience.level }
                prevLevelXP={ levels[props.userExperience.level - 1] ? levels[props.userExperience.level - 1] : 0 }
              />
              <h4>{ props.userExperience.total }/{ levels[props.userExperience.level] }</h4>
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

const store = (store) => {
  return {
    userQuestions: store.profile.userData ? store.profile.userData.questions.all : store.user.questions.totals.all,
    userExperience: store.profile.userData ? store.profile.userData.experience : store.user.experience,
    questionTotals: store.questions.totals.all
  }
}

export default connect(store)(UserStatsTotal)


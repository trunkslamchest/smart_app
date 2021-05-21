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

  console.log(props.userQuestions, props.userExperience)

  let trendArrows = makeUserStatsTrendArrows(
    trendArrowIndex,
    props.user_questions.all.rating,
    props.questionTotals.all.averages.rating,
    props.user_questions.all.answered,
    props.questionTotals.all.averages.answers,
    props.user_questions.all.correct,
    props.questionTotals.all.averages.correct,
    props.user_questions.all.avg_time,
    props.questionTotals.all.averages.avgTime,
    props.user_questions.all.outta_times,
    props.questionTotals.all.averages.outta_time
  )

  let totalStats
  let performance
  let totalQuestionsAnswered = (0).toFixed(2), totalQuestionsCorrect = (0).toFixed(2)

  if(props.user_questions && props.questionTotals){
    totalQuestionsAnswered = ((props.user_questions.all.answered / props.questionTotals.all.questions) * 100).toFixed(2)
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
                { trendArrows.rating }
              </div>
            </div>
          </div>
        </>
    } else {
      if(props.from_dashboard){
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
            { props.user_questions.all.answered }/{ props.questionTotals.all.questions } answered ({ totalQuestionsAnswered }%)
            { trendArrows.answered }

          </div>
          <div className='user_stats_total_sub_row'>
            { props.user_questions.all.correct }/{ props.user_questions.all.answered } correct ({ totalQuestionsCorrect }%)
            { trendArrows.correct }
          </div>
        </div>
        <div className='user_stats_total_sub_wrapper'>
          <div className='user_stats_total_sub_row'>
            Average Time: { props.user_questions.all.avg_time } seconds
            { trendArrows.averageTime }
          </div>
          <div className='user_stats_total_sub_row'>
            Outta Times: { props.user_questions.all.outta_times }
            { trendArrows.outtaTimes }
          </div>
        </div>
        </div>
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

const store = (store) => {
  return {
    // userData: store.profile.userData || store.user,
    userQuestions: store.profile.userData ? store.profile.userData.questions : store.user.questions,
    userExperience: store.profile.userData ? store.profile.userData.experience : store.user.experience,
    questionTotals: store.questions.totals
  }
}


// export default UserStatsTotal

export default connect(store)(UserStatsTotal)


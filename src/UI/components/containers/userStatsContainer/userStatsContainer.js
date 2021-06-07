import React from 'react'
import { connect } from 'react-redux'

import levels from '../../../../datasets/levels'

import XPBar from '../../xpBar/xpBar'
import makeUserStatsTrendArrows from './userStatsFunctions/makeUserStatsTrendArrows'
import ContainerHeader from '../../../../UI/components/headers/containerHeader/containerHeader'

import trendArrowIndex from '../../../../assets/trend_arrows/trendArrowIndex'

import './userStatsContainer.css'
import './userStatsTotal.css'
import './userStatsXP.css'
import './userStatsPerformance.css'
import './userStatsResponse.css'

const UserStatsTotal = (props) => {

  const componentClasses = {
    statsContainer: 'user_stats_container',
    statsWrapper: 'user_stats_wrapper',
    statsTotalSubContainer: 'user_stats_total_sub_container',
    statsTotalSubWrapper: 'user_stats_total_sub_wrapper',
    statsTotalSubRow: 'user_stats_total_sub_row',
    perfContainer: 'user_stats_performance_container',
    perfSubContainer: 'user_stats_performance_sub_container',
    rankContainer: 'user_stats_total_rank',
    ratingContainer: 'user_stats_total_rating',
    ratingSubContainer: 'user_stats_total_rating_sub_container',
    xpContainer: 'user_stats_experience_container',
    xpPerfContainer: 'user_stats_xp_perf_container',
    xpBarContainer: 'user_stats_experience_bar_container'
  }

  const numZero = (num) => {
    let a = num.split('')
    return !!parseInt(a[ a.length - 1]) ? parseFloat(a.join('')) : Math.round(parseInt(num))
  }

  let trendArrows = makeUserStatsTrendArrows(
    props.userQuestionTotals.rating,
    props.questionTotals.averages.rating,
    (props.userQuestionTotals.answered / props.questionTotals.questions) * 100,
    props.questionTotals.averages.answers,
    props.userQuestionTotals.averages.correct,
    props.questionTotals.averages.correct,
    props.userQuestionTotals.averages.avgTime,
    props.questionTotals.averages.avgTime,
    props.userQuestionTotals.averages.outta_time,
    props.questionTotals.averages.outta_time,
    trendArrowIndex
  )

  let totalStats
  let performance
  let totalQuestionsAnswered = (0).toFixed(2)

  if(props.userQuestionTotals && props.questionTotals){
    totalQuestionsAnswered = ((props.userQuestionTotals.answered / props.questionTotals.questions) * 100).toFixed(2)
    if(props.userQuestionTotals.answered >= 5) {
      performance =
        <div className={ componentClasses.perfSubContainer }>
          <div className={ componentClasses.rankContainer }>
            <h2>SmartApp™ Rank</h2>
            <div className={ componentClasses.ratingSubContainer }>
              { trendArrows.rating }
              <h1>{ props.userQuestionTotals.rank }</h1>
            </div>
          </div>
          <div className={ componentClasses.ratingContainer }>
            <h2>SmartApp™ Rating</h2>
            <div className={ componentClasses.ratingSubContainer }>
              { trendArrows.rating }
              <h1>{ (props.userQuestionTotals.rating * 10).toFixed(2) }</h1>
            </div>
          </div>
        </div>
    } else {
      if(props.from_dashboard){
        performance = <p>Answer <span>{ 5 - props.userQuestionTotals.answered }</span> more questions to receive a rank & rating!</p>
      } else {
        performance =
          <div className={ componentClasses.perfSubContainer }>
            <div className={ componentClasses.rankContainer }>
              <h2>SmartApp™ Rank</h2>
              <h1>NR</h1>
            </div>
            <div className={ componentClasses.ratingContainer }>
              <h2>SmartApp™ Rating</h2>
              <div className={ componentClasses.ratingSubContainer }>
                <h1>NR</h1>
                { trendArrows.rating }
              </div>
            </div>
          </div>
      }
    }

    totalQuestionsAnswered = numZero(totalQuestionsAnswered)

    totalStats =
      <div className={ componentClasses.statsWrapper }>
        <div className={ componentClasses.statsTotalSubContainer }>
          <div className={ componentClasses.statsTotalSubWrapper }>
            <div className={ componentClasses.statsTotalSubRow }>
              <span>{ props.userQuestionTotals.answered }/{ props.questionTotals.questions } answered ({ totalQuestionsAnswered }%)</span>
              { trendArrows.answered }
            </div>
            <div className={ componentClasses.statsTotalSubRow }>
              <span>{ props.userQuestionTotals.correct }/{ props.userQuestionTotals.answered } correct ({ props.userQuestionTotals.averages.correct }%)</span>
              { trendArrows.correct }
            </div>
          </div>
          <div className={ componentClasses.statsTotalSubWrapper }>
            <div className={ componentClasses.statsTotalSubRow }>
              <span>Average Time: { props.userQuestionTotals.averages.avgTime }<span>s</span></span>
              { trendArrows.averageTime }
            </div>
            <div className={ componentClasses.statsTotalSubRow }>
              <span>Outta Times: { props.userQuestionTotals.outta_time }</span>
              { trendArrows.outtaTime }
            </div>
          </div>
        </div>
        <div className={ componentClasses.xpPerfContainer }>
          <div className={ componentClasses.xpContainer }>
            <h3>Level { props.userExperience.level }</h3>
            <div className={ componentClasses.xpBarContainer }>
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
    <div className={ componentClasses.statsContainer }>
      { !props.from_dashboard && <ContainerHeader header_text={ 'Statistics' } /> }
      { totalStats }
    </div>
  )
}

const store = (store) => {
  return {
    userQuestionTotals: store.profile.userData ? store.profile.userData.questions.all : store.user.questions.totals.all,
    userExperience: store.profile.userData ? store.profile.userData.experience : store.user.experience,
    questionTotals: store.questions.totals.all
  }
}

export default connect(store)(UserStatsTotal)


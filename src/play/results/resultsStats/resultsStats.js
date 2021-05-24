import React from 'react'
import { connect } from 'react-redux'

import levels from '../../../datasets/levels'

import XPBar from '../../../UI/components/xpBar/xpBar'
import makeResultsTrendArrows from '../resultsFunctions/makeResultsTrendArrows'
import PlaySubHeaderCentered from '../../playComponents/playSubHeaderCentered/playSubHeaderCentered'

import trendArrowIndex from '../../../assets/trend_arrows/trendArrowIndex'

import './resultsStatsPerf.css'
import './resultsStatsQuestion.css'
import './resultsStatsXP.css'

const ResultsStats = (props) => {
  return(
    <>
      { props.showStats &&
        <div className="results_stats_wrapper">
          <div className='results_perf_container'>
            <PlaySubHeaderCentered header_text={ 'Performance' } />
            <div className='results_perf_sub_container'>
              <div className='results_perf_sub_wrapper'>
                <div className='results_perf_sub_wrapper_header'>
                  <h4>Your Rank</h4>
                </div>
                <div className='results_perf_sub_wrapper_text'>
                  <h5>{ props.userRank }</h5>
                  { makeResultsTrendArrows(props.userRating, props.questionRating, 'percentage', trendArrowIndex) }
                </div>
              </div>
             <div className='results_perf_sub_wrapper'>
                <div className='results_perf_sub_wrapper_header'>
                  <h4>Your Rating</h4>
                </div>
                <div className='results_perf_sub_wrapper_text'>
                  <h5>{ props.userRating }</h5>
                  { makeResultsTrendArrows(props.userRating, props.questionRating, 'percentage', trendArrowIndex) }
                </div>
              </div>
             <div className='results_perf_sub_wrapper'>
                <div className='results_perf_sub_wrapper_header'>
                  <h4>Your Time</h4>
                </div>
                <div className='results_perf_sub_wrapper_text'>
                  <h5>{ props.userTime } seconds</h5>
                  { makeResultsTrendArrows(props.userTime, props.questionTime, 'time', trendArrowIndex) }
                </div>
              </div>
            </div>
            <div className='results_xp_container'>
              <h4>Your Experience</h4>
              <div className='results_xp_wrapper'>
                <div className='results_xp_count'>
                  <h4>+{ props.userXPgain }</h4><h5>XP</h5>
                </div>
                <div className="results_xp_bar_container">
                  <h4>Level { props.userXPlevel }</h4>
                  <div className="results_xp_bar_sub_container">
                  <XPBar
                      userXP={ props.userXPtotal }
                      userLevel={ props.userXPlevel }
                      prevLevelXP={ levels[props.userXPlevel - 1] }
                    />
                  </div>
                </div>
                <div className='results_xp_total'>
                  <h4>{ props.userXPtotal }</h4><h5>/{ levels[props.userXPlevel] }</h5>
                </div>
              </div>
            </div>
          </div>
          <div className='divider_medium' />
          <div className='results_question_container'>
            <PlaySubHeaderCentered header_text={ 'Question Stats' } />
            <div className='divider_medium' />
           <div className='results_question_sub_container'>
              <div className='results_question_sub_wrapper_left'>
                <div className='results_question_sub_wrapper_header_left'>
                  <h4>Difficulty</h4>
                </div>
                <div className='results_question_sub_wrapper_sub_header_left'>
                    <h5>Level</h5>
                    <h5>Rating</h5>
                </div>
                <div className='results_question_sub_wrapper_text_left'>
                    <h6>{ props.questionDiff }</h6>
                    <h6>{ props.questionDiffRating }</h6>
                </div>
              </div>
              <div className='results_question_sub_wrapper_right'>
                <div className='results_question_sub_wrapper_header_right'>
                 <h4>Total Answers: { props.totalAnswers }</h4>
                </div>
                <div className='results_question_sub_wrapper_sub_header_right'>
                    <h5>Correct</h5>
                    <h5>Incorrect</h5>
                    <h5>Outta Times</h5>
                    <h5>Average Time</h5>
                </div>
                <div className='results_question_sub_wrapper_text_right'>
                    <h6>{ props.correctAnswers }</h6>
                    <h6>{ props.incorrectAnswers }</h6>
                    <h6>{ props.outtaTimeAnswers }</h6>
                    <h6>{ props.averageTime } seconds</h6>
                </div>
              </div>
            </div>
            <div className='divider_medium' />
          </div>
        </div>
      }
    </>
  )
}

const store = store => {
  return {
    userRating: store.play.results ? store.play.results.performance.qPerf.rating : store.questions.staticUserResults.performance.rating,
    userRank: store.play.results ? store.play.results.performance.qPerf.rank : store.questions.staticUserResults.performance.rank,
    questionRating: store.play.question ? store.play.question.perfRating : store.questions.staticQuestion.rating.performance,
    userTime: store.play.answer ? store.play.answer.time : store.questions.staticUserResults.time,
    questionTime: store.play.question ? store.play.question.answers.avg_time : store.questions.staticQuestion ? store.questions.staticQuestion.answers.avg_time : null,
    userXPgain: store.play.results ? store.play.results.experience.gain : store.questions.staticUserResults.experience.gain,
    userXPtotal: store.questions.staticUserResults ? store.questions.staticUserResults.experience.newTotal : store.user.experience.total,
    userXPlevel: store.questions.staticUserResults ? store.questions.staticUserResults.experience.level : store.user.experience.level,
    questionDiff: store.play.question ? store.play.question.difficulty : store.questions.staticQuestion.difficulty,
    questionDiffRating: store.play.question ? (store.play.question.diffRating).toFixed(2) : (store.questions.staticQuestion.rating.difficulty).toFixed(2),
    totalAnswers: store.play.question ? store.play.question.answers.total : store.questions.staticQuestion.answers.total,
    correctAnswers: store.play.question ? store.play.question.answers.correct : store.questions.staticQuestion.answers.correct,
    incorrectAnswers: store.play.question ? store.play.question.answers.incorrect : store.questions.staticQuestion.answers.incorrect,
    outtaTimeAnswers: store.play.question ? store.play.question.answers.outta_time : store.questions.staticQuestion.answers.outta_time,
    averageTime: store.play.question ? (store.play.question.answers.avg_time).toFixed(2) : (store.questions.staticQuestion.answers.avg_time).toFixed(2)
  }
}

export default connect(store)(ResultsStats)
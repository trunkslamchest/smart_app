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

  let userRating,
      userRank,
      questionRating,
      userTime,
      questionTime,
      userXPgain,
      userXPtotal,
      userXPlevel,
      questionDiff,
      questionDiffRating,
      totalAnswers,
      correctAnswers,
      incorrectAnswers,
      outtaTimeAnswers,
      averageTime

  if(!props.staticResults) {
    userRating = props.play.results.performance.qPerf.rating
    userRank = props.play.results.performance.qPerf.rank
    questionRating = props.play.question.perfRating
    userTime = props.play.answer.time
    questionTime = props.play.question.answers.avg_time
    userXPgain = props.play.results.experience.gain
    userXPtotal = props.user.experience.total
    userXPlevel = props.user.experience.level
    questionDiff = props.play.question.difficulty
    questionDiffRating = (props.play.question.diffRating).toFixed(2)
    totalAnswers = props.play.question.answers.total
    correctAnswers = props.play.question.answers.correct
    incorrectAnswers = props.play.question.answers.incorrect
    outtaTimeAnswers = props.play.question.answers.outta_time
    averageTime = (props.play.question.answers.avg_time).toFixed(2)
  }

  if(props.questions.staticUserResults) {
    userRating = props.questions.staticUserResults.performance.rating
    userRank = props.questions.staticUserResults.performance.rank
    questionRating = props.questions.staticQuestion.rating.performance
    userTime = props.questions.staticUserResults.time
    questionTime = props.questions.staticQuestion.answers.avg_time
    userXPgain = props.questions.staticUserResults.experience.gain
    userXPtotal = props.questions.staticUserResults.experience.newTotal
    userXPlevel = props.questions.staticUserResults.experience.level
    questionDiff = props.questions.staticQuestion.difficulty
    questionDiffRating = (props.questions.staticQuestion.rating.difficulty).toFixed(2)
    totalAnswers = props.questions.staticQuestion.answers.total
    correctAnswers = props.questions.staticQuestion.answers.correct
    incorrectAnswers = props.questions.staticQuestion.answers.incorrect
    outtaTimeAnswers = props.questions.staticQuestion.answers.outta_time
    averageTime = (props.questions.staticQuestion.answers.avg_time).toFixed(2)
  }

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
                  <h5>{ userRank }</h5>
                  { makeResultsTrendArrows(userRating, questionRating, 'percentage', trendArrowIndex) }
                </div>
              </div>
             <div className='results_perf_sub_wrapper'>
                <div className='results_perf_sub_wrapper_header'>
                  <h4>Your Rating</h4>
                </div>
                <div className='results_perf_sub_wrapper_text'>
                  <h5>{ userRating }</h5>
                  { makeResultsTrendArrows(userRating, questionRating, 'percentage', trendArrowIndex) }
                </div>
              </div>
             <div className='results_perf_sub_wrapper'>
                <div className='results_perf_sub_wrapper_header'>
                  <h4>Your Time</h4>
                </div>
                <div className='results_perf_sub_wrapper_text'>
                  <h5>{ userTime } seconds</h5>
                  { makeResultsTrendArrows(userTime, questionTime, 'time', trendArrowIndex) }
                </div>
              </div>
            </div>
            <div className='results_xp_container'>
              <h4>Your Experience</h4>
              <div className='results_xp_wrapper'>
                <div className='results_xp_count'>
                  <h4>+{ userXPgain }</h4><h5>XP</h5>
                </div>
                <div className="results_xp_bar_container">
                  <h4>Level { userXPlevel }</h4>
                  <div className="results_xp_bar_sub_container">
                  <XPBar
                      userXP={ userXPtotal }
                      userLevel={ userXPlevel }
                      prevLevelXP={ !props.staticResults ? levels[props.user.experience.level - 1] ? levels[props.user.experience.level - 1] : 0 : levels[props.questions.staticUserResults.experience.level - 1] ? levels[props.questions.staticUserResults.experience.level - 1] : 0 }
                    />
                  </div>
                </div>
                <div className='results_xp_total'>
                  <h4>{ userXPtotal }</h4><h5>/{ levels[userXPlevel] }</h5>
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
                    <h6>{ questionDiff }</h6>
                    <h6>{ questionDiffRating }</h6>
                </div>
              </div>
              <div className='results_question_sub_wrapper_right'>
                <div className='results_question_sub_wrapper_header_right'>
                 <h4>Total Answers: { totalAnswers }</h4>
                </div>
                <div className='results_question_sub_wrapper_sub_header_right'>
                    <h5>Correct</h5>
                    <h5>Incorrect</h5>
                    <h5>Outta Times</h5>
                    <h5>Average Time</h5>
                </div>
                <div className='results_question_sub_wrapper_text_right'>
                    <h6>{ correctAnswers }</h6>
                    <h6>{ incorrectAnswers }</h6>
                    <h6>{ outtaTimeAnswers }</h6>
                    <h6>{ averageTime } seconds</h6>
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
    play: store.play,
    questions: store.questions,
    user: store.user
  }
}

export default connect(store)(ResultsStats)
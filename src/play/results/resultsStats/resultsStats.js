import React from 'react'
import { connect } from 'react-redux'

import levels from '../../../datasets/levels'

import XPBar from '../../../UI/components/xpBar/xpBar'
import PlaySubHeaderCentered from '../../playComponents/playSubHeaderCentered/playSubHeaderCentered'

import trendArrowIndex from '../../../assets/trend_arrows/trendArrowIndex'

import './resultsStatsPerf.css'
import './resultsStatsQuestion.css'
import './resultsStatsXP.css'

const ResultsStats = (props) => {

  // const xpBar = () => {
  //   let currXP, prevLevelXP

  //   if(!props.staticResults) {
  //     currXP = props.user.experience.total
  //     prevLevelXP = parseInt(levels[props.user.experience.level - 1])
  //     if(props.user.experience.level === 1) return currXP
  //     else return currXP - prevLevelXP
  //   }

  //   if(props.questions.staticUserResults) {
  //     currXP = props.questions.staticUserResults.experience.newTotal
  //     prevLevelXP = parseInt(levels[props.questions.staticUserResults.experience.level - 1])
  //     if(props.questions.staticUserResults.experience.level === 1) return currXP
  //     else return currXP - prevLevelXP
  //   }
  // }

  // const xpBarClass = {
  //   border: "0px solid rgba(200, 200, 200, 1)",
  //   boxSizing: "border-box",
  //   background: "green",
  //   height: "10px",
  //   width: `${ xpBar() }%`
  // }

  const arrow_up = <img alt='Higher than global average' className='trend_arrow' src={ trendArrowIndex.greenArrowUp } />
  const arrow_down = <img alt='Lower than global average' className='trend_arrow' src={ trendArrowIndex.redArrowDown } />

  let rating_trend_arrow, time_trend_arrow

  if(!props.staticResults) {
    if(props.play.results.performance.qPerf.rating > props.play.question.perfRating) rating_trend_arrow = arrow_up
    if(props.play.results.performance.qPerf.rating < props.play.question.perfRating) rating_trend_arrow = arrow_down
    if(props.play.answer.time < props.play.question.answers.avg_time) time_trend_arrow = arrow_up
    if(props.play.answer.time > props.play.question.answers.avg_time) time_trend_arrow = arrow_down
  }

  if(props.questions.staticUserResults) {
    if(props.questions.staticUserResults.performance.rating > props.questions.staticQuestion.rating.performance) rating_trend_arrow = arrow_up
    if(props.questions.staticUserResults.performance.rating < props.questions.staticQuestion.rating.performance) rating_trend_arrow = arrow_down
    if(props.questions.staticUserResults.time < props.questions.staticQuestion.answers.avg_time) time_trend_arrow = arrow_up
    if(props.questions.staticUserResults.time > props.questions.staticQuestion.answers.avg_time) time_trend_arrow = arrow_down
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
                  { !props.staticResults && <h5>{ props.play.results.performance.qPerf.rank }</h5> }
                  { props.questions.staticUserResults && <h5>{ props.questions.staticUserResults.performance.rank }</h5> }
                </div>
              </div>
             <div className='results_perf_sub_wrapper'>
                <div className='results_perf_sub_wrapper_header'>
                  <h4>Your Rating</h4>
                </div>
                <div className='results_perf_sub_wrapper_text'>
                  { !props.staticResults && <h5>{ props.play.results.performance.qPerf.rating }</h5> }
                  { props.questions.staticUserResults && <h5>{ props.questions.staticUserResults.performance.rating }</h5> }
                  { rating_trend_arrow }
                </div>
              </div>
             <div className='results_perf_sub_wrapper'>
                <div className='results_perf_sub_wrapper_header'>
                  <h4>Your Time</h4>
                </div>
                <div className='results_perf_sub_wrapper_text'>
                  { !props.staticResults && <h5>{ props.play.answer.time } seconds</h5>}
                  { props.questions.staticUserResults && <h5>{ props.questions.staticUserResults.time } seconds</h5>}
                  { time_trend_arrow }
                </div>
              </div>
            </div>
            <div className='results_xp_container'>
              <h4>Your Experience</h4>
              <div className='results_xp_wrapper'>
                <div className='results_xp_count'>
                  { !props.staticResults && <><h4>+{ props.play.results.experience.gain }</h4><h5>XP</h5></> }
                  { props.questions.staticUserResults && <><h4>+{ props.questions.staticUserResults.experience.gain }</h4><h5>XP</h5></> }
                </div>
                <div className="results_xp_bar_container">
                  { !props.staticResults && <h4>Level { props.user.experience.level }</h4> }
                  { props.questions.staticUserResults && <h4>Level { props.questions.staticUserResults.experience.level }</h4> }
                  <div className="results_xp_bar_sub_container">
                    {/* <div className="results_xp_bar">
                      <div style={ xpBarClass }></div>
                    </div> */}
                  <XPBar
                      userXP={ !props.staticResults ? props.user.experience.total : props.questions.staticUserResults.experience.newTotal }
                      userLevel={ !props.staticResults ? props.user.experience.level : props.questions.staticUserResults.experience.level }
                      prevLevelXP={ !props.staticResults ? levels[props.user.experience.level - 1] ? levels[props.user.experience.level - 1] : 0 : levels[props.questions.staticUserResults.experience.level - 1] ? levels[props.questions.staticUserResults.experience.level - 1] : 0 }
                    />
                  </div>
                </div>
                <div className='results_xp_total'>
                  { !props.staticResults && <><h4>{ props.user.experience.total }</h4><h5>/{ levels[props.user.experience.level] }</h5></> }
                  { props.questions.staticUserResults && <><h4>{ props.questions.staticUserResults.experience.newTotal }</h4><h5>/{ levels[props.questions.staticUserResults.experience.level] }</h5></> }
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
                    { !props.staticResults && <h6>{ props.play.question.difficulty }</h6> }
                    <h6>{ props.questions.staticQuestion && props.questions.staticQuestion.difficulty }</h6>
                    { !props.staticResults && <h6>{ props.play.question.diffRating }</h6> }
                    <h6>{ props.questions.staticQuestion && props.questions.staticQuestion.rating.difficulty }</h6>
                </div>
              </div>
              <div className='results_question_sub_wrapper_right'>
                <div className='results_question_sub_wrapper_header_right'>
                 { !props.staticResults && <h4>Total Answers: { props.play.question.answers.total }</h4> }
                 { props.questions.staticQuestion && <h4>Total Answers: { props.questions.staticQuestion.answers.total }</h4> }
                </div>
                <div className='results_question_sub_wrapper_sub_header_right'>
                    <h5>Correct</h5>
                    <h5>Incorrect</h5>
                    <h5>Outta Times</h5>
                    <h5>Average Time</h5>
                </div>
                <div className='results_question_sub_wrapper_text_right'>
                    { !props.staticResults && <h6>{ props.play.question.answers.correct }</h6> }
                    { props.questions.staticQuestion && <h6>{ props.questions.staticQuestion.answers.correct }</h6> }

                    { !props.staticResults && <h6>{ props.play.question.answers.incorrect }</h6> }
                    { props.questions.staticQuestion && <h6>{ props.questions.staticQuestion.answers.incorrect }</h6> }

                    { !props.staticResults && <h6>{ props.play.question.answers.outta_time }</h6> }
                    { props.questions.staticQuestion && <h6>{ props.questions.staticQuestion.answers.outta_time }</h6> }

                    { !props.staticResults && <h6>{ props.play.question.answers.avg_time }</h6> }
                    { props.questions.staticQuestion && <h6>{ props.questions.staticQuestion.answers.avg_time }</h6> }
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

const mapStateToProps = state => {
  return {
    play: state.play,
    questions: state.questions,
    user: state.user
  }
}

export default connect(mapStateToProps)(ResultsStats)
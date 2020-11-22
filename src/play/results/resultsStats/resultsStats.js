import React from 'react'
import { connect } from 'react-redux'

import levels from '../../../datasets/levels'

import trendArrowIndex from '../../../assets/trend_arrows/trendArrowIndex'

import './resultsStatsPerf.css'
import './resultsStatsQuestion.css'
import './resultsStatsXP.css'

const ResultsStats = (props) => {

  const xpBar = () => {
    let currXP, prevLevelXP

    if(!props.staticResults) {
      currXP = props.user.experience.total
      prevLevelXP = parseInt(levels[props.user.experience.level - 1])
      if(props.user.experience.level === 1) return currXP
      else return currXP - prevLevelXP
    }

    if(props.questions.staticUserResults) {
      currXP = props.questions.staticUserResults.experience.newTotal
      prevLevelXP = parseInt(levels[props.questions.staticUserResults.experience.level - 1])
      if(props.questions.staticUserResults.experience.level === 1) return currXP
      else return currXP - prevLevelXP
    }
  }

  const xpBarClass = {
    border: "1px solid rgba(200, 200, 200, 1)",
    boxSizing: "border-box",
    background: "green",
    height: "10px",
    width: `${ xpBar() }%`
  }

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
            <h3>Your Performance</h3>
            <div className='results_perf_sub_container'>
              <div className='results_perf_rank_container'>
                <div className='results_perf_rank_sub_container'>
                  <div className='results_perf_rank'>
                    <h4>Rank</h4>
                    { !props.staticResults && <h5>{ props.play.results.performance.qPerf.rank }</h5> }
                    { props.questions.staticUserResults && <h5>{ props.questions.staticUserResults.performance.rank }</h5> }
                  </div>
                  <div className='results_perf_rating'>
                    <h4>Rating</h4>
                    <div className='results_perf_rating_sub_wrapper'>
                      { !props.staticResults && <h5>{ props.play.results.performance.qPerf.rating }</h5> }
                      { props.questions.staticUserResults && <h5>{ props.questions.staticUserResults.performance.rating }</h5> }
                      { rating_trend_arrow }
                    </div>
                  </div>
                </div>
              </div>
              <div className='results_time_container'>
                <h4>Time</h4>
                <div className='results_time_sub_container'>
                  { !props.staticResults && <h5>{ props.play.answer.time } seconds</h5>}
                  { props.questions.staticUserResults && <h5>{ props.questions.staticUserResults.time } seconds</h5>}
                  { time_trend_arrow }
                </div>
              </div>
            </div>
            <div className='results_xp_container'>
              <div className='results_xp_count'>
                { !props.staticResults && <><h4>+{ props.play.results.experience.gain }</h4><h5>XP</h5></> }
                { props.questions.staticUserResults && <><h4>+{ props.questions.staticUserResults.experience.gain }</h4><h5>XP</h5></> }
              </div>
              <div className="results_xp_bar_container">
                 { !props.staticResults && <h4>Level { props.user.experience.level }</h4> }
                 { props.questions.staticUserResults && <h4>Level { props.questions.staticUserResults.experience.level }</h4> }
                <div className="results_xp_bar_sub_container">
                  <div className="results_xp_bar">
                    <div style={ xpBarClass }></div>
                  </div>
                </div>
              </div>
              <div className='results_xp_total'>
                { !props.staticResults && <><h4>{ props.user.experience.total }</h4><h5>/{ levels[props.user.experience.level] }</h5></> }
                { props.questions.staticUserResults && <><h4>{ props.questions.staticUserResults.experience.newTotal }</h4><h5>/{ levels[props.questions.staticUserResults.experience.level] }</h5></> }
              </div>
            </div>
          </div>
          <div className='results_question_container'>
            <h3>Question Stats</h3>
            <div className='results_question_sub_container'>
              <div className='results_diff_container'>
                <h4>Difficulty</h4>
                <div className='results_diff_sub_container'>
                  <div className='results_diff'>
                    <h5>Level</h5>
                    <h6>{ !props.staticResults && props.play.question.difficulty }</h6>
                    <h6>{ props.questions.staticQuestion && props.questions.staticQuestion.difficulty }</h6>
                  </div>
                  <div className='results_diff_rating'>
                    <h5>Rating</h5>
                    <h6>{ !props.staticResults && props.play.question.diffRating }</h6>
                    <h6>{ props.questions.staticQuestion && props.questions.staticQuestion.rating.difficulty }</h6>
                  </div>
                </div>
              </div>
              <div className='results_totals_container'>
                 { !props.staticResults && <h4>Total: { props.play.question.answers.total } Answers</h4> }
                 { props.questions.staticQuestion && <h4>Total: { props.questions.staticQuestion.answers.total } Answers</h4> }
                <div className='results_totals_sub_container'>
                  <div className='results_totals_correct'>
                    <h4>Correct</h4>
                    { !props.staticResults && <h5>{ props.play.question.answers.correct }</h5> }
                    { props.questions.staticQuestion && <h5>{ props.questions.staticQuestion.answers.correct }</h5> }
                  </div>
                  <div className='results_totals_incorrect'>
                    <h4>Incorrect</h4>
                    { !props.staticResults && <h5>{ props.play.question.answers.incorrect }</h5> }
                    { props.questions.staticQuestion && <h5>{ props.questions.staticQuestion.answers.incorrect }</h5> }

                  </div>
                  <div className='results_totals_outta_time'>
                    <h4>Outta Times</h4>
                    { !props.staticResults && <h5>{ props.play.question.answers.outta_time }</h5> }
                    { props.questions.staticQuestion && <h5>{ props.questions.staticQuestion.answers.outta_time }</h5> }
                  </div>
                </div>
              </div>
            </div>
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
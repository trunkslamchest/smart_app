import React from 'react'
import { connect } from 'react-redux'

import levels from '../../../datasets/levels'

import trend_arrow_up from '../../../assets/trends/trend_arrow_up.png'
import trend_arrow_down from '../../../assets/trends/trend_arrow_down.png'

import './resultsStatsPerf.css'
import './resultsStatsQuestion.css'
import './resultsStatsXP.css'

const ResultsStats = (props) => {

  const xpBar = () => {
    let currXP = props.user.experience.total
    let prevLevelXP = parseInt(levels[props.user.experience.level - 1])
    if(props.user.experience.level === 1) return currXP
    else return currXP - prevLevelXP
  }

  const xpBarClass = {
    border: "1px solid rgba(200, 200, 200, 1)",
    boxSizing: "border-box",
    background: "green",
    height: "10px",
    width: `${ props.user.experience && xpBar() }%`
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
                    <h5>{ props.play.results && props.play.results.performance.qPerf.rank }</h5>
                  </div>
                  <div className='results_perf_rating'>
                    <h4>Rating</h4>
                    <div className='results_perf_rating_sub_wrapper'>
                      <h5>{ props.play.results && props.play.results.performance.qPerf.rating }</h5>
                      { props.play.results && props.play.results.performance.qPerf.rating > props.play.question.perfRating ? arrow_up : arrow_down }
                    </div>
                  </div>
                </div>
              </div>
              <div className='results_time_container'>
                <h4>Time</h4>
                <div className='results_time_sub_container'>
                  <h5>{ props.play.results && props.play.answer.time } seconds</h5>
                  { props.play.answer && props.play.answer.time < props.play.question.answers.avg_time ? arrow_up : arrow_down }
                </div>
              </div>
            </div>
            <div className='results_xp_container'>
              <div className='results_xp_count'>
                <h4>+{ props.play.results && props.play.results.experience.gain }</h4><h5>XP</h5>
              </div>
              <div className="results_xp_bar_container">
                <h4>Level { props.user.experience && props.user.experience.level }</h4>
                <div className="results_xp_bar_sub_container">
                  <div className="results_xp_bar">
                    <div style={ xpBarClass }></div>
                  </div>
                </div>
              </div>
              <div className='results_xp_total'>
              <h4>{ props.user.experience && props.user.experience.total }</h4><h5>/{ levels[props.user.experience.level] }</h5>
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
                    <h6>{ props.play.question && props.play.question.difficulty }</h6>
                  </div>
                  <div className='results_diff_rating'>
                    <h5>Rating</h5>
                    <h6>{ props.play.question && props.play.question.diffRating }</h6>
                  </div>
                </div>
              </div>
              <div className='results_totals_container'>
                <h4>Total: { props.play.question && props.play.question.answers.total } Answers</h4>
                <div className='results_totals_sub_container'>
                  <div className='results_totals_correct'>
                    <h4>Correct</h4>
                    <h5>{ props.play.question && props.play.question.answers.correct }</h5>
                  </div>
                  <div className='results_totals_incorrect'>
                    <h4>Incorrect</h4>
                    <h5>{ props.play.question && props.play.question.answers.incorrect }</h5>
                  </div>
                  <div className='results_totals_outta_time'>
                    <h4>Outta Times</h4>
                    <h5>{ props.play.question && props.play.question.answers.outta_time }</h5>
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
    question: state.question,
    user: state.user
  }
}

export default connect(mapStateToProps)(ResultsStats)
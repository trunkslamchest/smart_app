import React from 'react'
import { connect } from 'react-redux'

// import { calcRating } from './resultsStatsFunctions'

import './resultsStats.css'
import './resultsStatsPerf.css'
import './resultsStatsQuestion.css'

const ResultsStats = (props) => {

  const calcStats = () => {
    let calcObj = {}, calcCorrect = 0, calcIncorrect = 0, calcOuttaTime = 0, calcTrend = 'none'
    if(props.play.question.answers.correct !== 0) calcCorrect = parseFloat((props.play.question.answers.correct / props.play.question.answers.total).toFixed(2))
    if(props.play.question.answers.incorrect !== 0) calcIncorrect = parseFloat((props.play.question.answers.incorrect / props.play.question.answers.total).toFixed(2))
    if(props.play.question.answers.outta_time !== 0) calcOuttaTime = parseFloat((props.play.question.answers.outta_time / props.play.question.answers.total).toFixed(2))
    if(calcCorrect > calcIncorrect && calcCorrect > calcOuttaTime) calcTrend = 'Correct'
    if(calcIncorrect > calcCorrect && calcIncorrect > calcOuttaTime) calcTrend = 'Incorrect'
    if(calcOuttaTime > calcIncorrect && calcOuttaTime > calcCorrect) calcTrend = 'Outta Time'

    calcObj = { correct: calcCorrect, incorrect: calcIncorrect, trend: calcTrend }
    return calcObj
  }

  const calcComp = (stats) => {
    let compareObj = {}, calcAvgTime = '', calcAnswer = ''
    if(props.play.results.result !== 'Outta Time') {
      if(props.play.results.result === 'Correct'){
        if(stats.trend === 'Correct')calcAnswer = `On Par with ${ (stats.correct * 100).toFixed(2) }% of users`
        else calcAnswer = `Better than ${ (stats.incorrect * 100).toFixed(2) }% of users`
      } else {
        if(stats.trend === 'Incorrect') calcAnswer = `On Par with ${ (stats.incorrect * 100).toFixed(2) }% of users`
        else calcAnswer = `Worse than ${ (stats.correct * 100).toFixed(2) }% of users`
      }
      if(props.play.answer.time > props.play.question.answers.avg_time) calcAvgTime = `Worse than the average of ${ props.play.question.answers.avg_time } seconds`
      else if(props.play.answer.time === props.play.question.answers.avg_time) calcAvgTime = `On par with the average of ${ props.play.question.answers.avg_time } seconds`
      else calcAvgTime = `Better than the average of ${ props.play.question.answers.avg_time } seconds`
    }

    compareObj = { time: calcAvgTime, result: calcAnswer }
    return compareObj
  }

  const comp = calcComp(calcStats())

  const perfBlock =
    <div className='results_perf_container'>
      <h3>Your Performance</h3>
      <div className='results_perf_sub_container'>
        <div className='results_perf_rank_container'>
          <div className='results_perf_rank_sub_container'>
            <div className='results_perf_rank'>
              <h4>Rank</h4>
              <h5>{ props.play.results.performance.rank }</h5>
            </div>
            <div className='results_perf_rating'>
              <h4>Rating</h4>
              <h5>{ props.play.results.performance.rating }</h5>
            </div>
          </div>
          <span>{ comp.result }</span>
        </div>
        <div className='results_time_container'>
          <div className='results_time_sub_container'>
            <h4>Time</h4>
            <h5>{ props.play.answer.time } seconds</h5>
          </div>
          <span>{ comp.time }</span>
        </div>
      </div>
    </div>

  const questionBlock =
    <div className='results_question_container'>
      <h3>Question Stats</h3>
      <div className='results_question_sub_container'>
        <div className='results_diff_container'>
          <h4>Difficulty</h4>
          <div className='results_diff_sub_container'>
            <div className='results_diff'>
              <h5>Level</h5>
              <h6>{ props.play.question.difficulty }</h6>
            </div>
            <div className='results_diff_rating'>
              <h5>Rating</h5>
              <h6>{ props.play.question.diffRating }</h6>
            </div>
          </div>
        </div>
        <div className='results_totals_container'>
          <h4>Total: { props.play.question.answers.total } Answers</h4>
          <div className='results_totals_sub_container'>
            <div className='results_totals_correct'>
              <h4>Correct</h4>
              <h5>{ props.play.question.answers.correct }</h5>
            </div>
            <div className='results_totals_incorrect'>
              <h4>Incorrect</h4>
              <h5>{ props.play.question.answers.incorrect }</h5>
            </div>
            <div className='results_totals_outta_time'>
              <h4>Outta Times</h4>
              <h5>{ props.play.question.answers.outta_time }</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

  return(
    <>
      { props.showStats &&
        <div className="results_stats_container">
          { perfBlock }
          { questionBlock }
        </div>
      }
    </>
  )
}

const mapStateToProps = state => {
  return {
    play: state.play,
    question: state.question
  }
}

export default connect(mapStateToProps)(ResultsStats)
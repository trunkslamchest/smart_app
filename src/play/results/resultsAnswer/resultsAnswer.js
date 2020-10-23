import React from 'react'

import { connect } from 'react-redux'

import './resultsAnswer.css'

const ResultsAnswer = (props) => {

  const correct_answer_text =
    <>
      <h3>The correct answer was</h3>
      <h4>{ props.play.results ? props.play.results.correct_answer : "static_answer_temp" }</h4>
    </>

  // if

  const correct_answer = props.showCorrectAnswer && correct_answer_text
  const answer = props.play.results ? props.play.results.result === 'Incorrect' ? correct_answer : <></> : 'static_results_temp'

  return(
    <div className={ props.showCorrectAnswer ? "results_correct_answer" : "blank" }>
      { props.showCorrectAnswer && answer }
    </div>
  )
}

const mapStateToProps = state => {
  return{
    play: state.play
  }
}

export default connect(mapStateToProps)(ResultsAnswer)
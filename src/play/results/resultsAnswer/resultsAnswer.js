import React from 'react'

import { connect } from 'react-redux'

import './resultsAnswer.css'

const ResultsAnswer = (props) => {
  return(
    <>
      { props.showCorrectAnswer &&
        <div className="results_correct_answer">
          <h3>The correct answer was</h3>
          <h4>
            { !props.staticResults ? `${ props.playCorrectAnswer }` : `${ props.staticCorrectAnswer }` }
          </h4>
        </div>
      }
    </>
  )
}

const store = (store) => {
  return{
    playCorrectAnswer: store.play.results ? store.play.results.correct_answer : null,
    staticCorrectAnswer: store.questions.staticUserResults ? store.questions.staticUserResults.correct_answer : null
  }
}

export default connect(store)(ResultsAnswer)
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
            { !props.staticResults && `${ props.play.results.correct_answer }` }
            { props.questions.staticUserResults && `${ props.questions.staticUserResults.correct_answer }` }
          </h4>
          <div className='divider_medium' />
        </div>
      }
    </>
  )
}

const store = (store) => {
  return{
    play: store.play,
    questions: store.questions
  }
}

export default connect(store)(ResultsAnswer)
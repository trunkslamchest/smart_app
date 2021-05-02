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

const mapStateToProps = (state) => {
  return{
    play: state.play,
    questions: state.questions
  }
}

export default connect(mapStateToProps)(ResultsAnswer)
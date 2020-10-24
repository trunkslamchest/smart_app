import React from 'react'

import { connect } from 'react-redux'

import './resultsHeader.css'

const ResultsHeader = (props) => {
  return(
    <>
      { props.showHeader &&
        <div className="results_answer_header">
          <h3>
            { !props.staticResults && `${ props.play.results.result }!` }
            { props.questions.staticUserResults && `${ props.questions.staticUserResults.result }!` }
          </h3>
        </div>
      }
    </>
  )
}

const mapStateToProps = state => {
  return {
    play: state.play,
    questions: state.questions
  }
}

export default connect(mapStateToProps)(ResultsHeader)
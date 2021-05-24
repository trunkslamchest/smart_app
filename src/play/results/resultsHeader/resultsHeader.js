import React from 'react'

import { connect } from 'react-redux'

import './resultsHeader.css'

const ResultsHeader = (props) => {
  return(
    <>
      { props.showHeader &&
        <div className="results_answer_header">
          <h3>
            { props.results }
          </h3>
          <div className='divider_medium' />
        </div>
      }
    </>
  )
}

const store = (store) => {
  return {
    results: store.play.results ? store.play.results.result : store.questions.staticUserResults.result
  }
}

export default connect(store)(ResultsHeader)
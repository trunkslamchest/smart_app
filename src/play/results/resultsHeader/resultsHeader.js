import React from 'react'

import { connect } from 'react-redux'

import './resultsHeader.css'

const ResultsHeader = (props) => {
  return(
    <div className={ props.showHeader ? "results_answer_header" : "blank" }>
      <h3>
        { props.showHeader && props.play.results && `${ props.play.results.result }!` }
      </h3>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    play: state.play
  }
}

export default connect(mapStateToProps)(ResultsHeader)
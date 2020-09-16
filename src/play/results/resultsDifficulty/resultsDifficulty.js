import React from 'react'

import { connect } from 'react-redux'

import './resultsDifficulty.css'

const ResultsDifficulty = (props) => {

  const difficulty_text =
    <>
      <h3>Question Difficulty</h3>
      <h4>{ props.play.question.difficulty }</h4>
    </>

  return(
    <div className={ props.showDifficulty ? "results_difficulty" : "blank" }>
      { props.showDifficulty && difficulty_text }
    </div>
  )
}

const mapStateToProps = state => {
  return{
    play: state.play
  }
}

export default connect(mapStateToProps)(ResultsDifficulty)
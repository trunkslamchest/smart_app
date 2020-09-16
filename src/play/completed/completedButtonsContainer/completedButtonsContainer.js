import React from 'react'

import { connect } from 'react-redux'

import { routes } from '../../../utility/paths'

import PlayButton from '../../../UI/buttons/playButton/playButton'

import './completedButtonsContainer.css'

const CompletedButtonsContainer = (props) => {

  const onClickFunctions = (event) => {
    event.persist()
    props.onClickFunctions(event)
  }

  return(
    <div className='completed_buttons_container'>
      <div className='default_header'>
        <h1>{ props.play.question.msg1 }</h1>
        <h2>{ props.play.question.msg2 }</h2>
      </div>
      <PlayButton
        link={ routes.by_diff }
        buttonName="by_diff"
        classType="play_by_difficulty_button"
        onClick={ onClickFunctions }
      >
        Choose a new Difficulty
      </PlayButton>
      <PlayButton
        link={ routes.by_cat }
        buttonName="by_cat"
        classType="play_by_category_button"
        onClick={ onClickFunctions }
      >
        Choose a new Category
      </PlayButton>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    play: state.play
  }
}

export default connect(mapStateToProps)(CompletedButtonsContainer)
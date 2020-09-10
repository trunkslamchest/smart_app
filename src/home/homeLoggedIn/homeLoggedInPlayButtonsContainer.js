import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths'

import PlayButton from '../../UI/buttons/playButton/playButton'

import './homeLoggedIn.css'

const HomeLoggedInPlayButtonsContainer = (props) => {

  const onClickQuickPlayFunctions = () => {
    props.onSetGameMode('quick_play')
    localStorage.gameMode = 'quick_play'
    props.onSetGameState('init')
  }

  const onClickByDifficultyFunctions = () => {
    props.onSetGameMode('by_diff')
    localStorage.gameMode = 'by_diff'
    props.onSetGameState('init')
  }

  const onClickByCategoryFunctions = () => {
    props.onSetGameMode('by_cat')
    localStorage.gameMode = 'by_cat'
    props.onSetGameState('init')
  }

  return(
    <div className="play_buttons_container">
      <div className="quick_play_container">
        <PlayButton
          link={ routes.quick_play }
          buttonName="quick_play_button"
          classType="quick_play_button"
          onClick={ onClickQuickPlayFunctions }
        >
          Quick Play
        </PlayButton>
      </div>
      <div className="other_play_container">
        <PlayButton
          link={ routes.by_diff }
          buttonName="play_by_difficulty_button"
          classType="play_by_difficulty_button"
          onClick={ onClickByDifficultyFunctions }
        >
          Play By Difficulty
        </PlayButton>
        <PlayButton
          link={ routes.by_cat }
          buttonName="play_by_category_button"
          classType="play_by_category_button"
          onClick={ onClickByCategoryFunctions }
        >
          Play By Category
        </PlayButton>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onSetGameMode: (mode) => dispatch(actions.setGameMode(mode)),
    onSetGameState: (state) => dispatch(actions.setGameState(state))
  }
}

export default connect(null, mapDispatchToProps)(HomeLoggedInPlayButtonsContainer)
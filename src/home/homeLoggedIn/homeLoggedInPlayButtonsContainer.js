import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths'

import PlayButton from '../../UI/buttons/playButton/playButton'

import './homeLoggedIn.css'

const HomeLoggedInPlayButtonsContainer = (props) => {


  const onClickQuickPlayFunctions = (event) => {
    props.onSetGameMode("quickPlay")
  }

  const onClickPlayByDifficultyFunctions = (event) => {
    props.onSetGameMode("byDifficulty")
  }

  const onClickPlayByCategoryFunctions = (event) => {
    props.onSetGameMode("byCategory")
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
          onClick={ onClickPlayByDifficultyFunctions }
        >
          Play By Difficulty
        </PlayButton>
        <PlayButton
          link={ routes.by_cat }
          buttonName="play_by_category_button"
          classType="play_by_category_button"
          onClick={ onClickPlayByCategoryFunctions }
        >
          Play By Category
        </PlayButton>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onSetGameMode: (mode) => dispatch(actions.setGameMode(mode))
  }
}

export default connect(null, mapDispatchToProps)(HomeLoggedInPlayButtonsContainer)
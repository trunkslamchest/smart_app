import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths'

import PlayButton from '../../UI/buttons/playButton/playButton'

import './homeLoggedIn.css'

const HomeLoggedInPlayButtonsContainer = (props) => {

  const onClickFunctions = (event) => {
    let gameMode = event.target.name
    localStorage.gameMode = gameMode
    props.onSetGameMode(gameMode)
    props.onSetGameState('init')
    props.onResetGameQset()
    props.onResetQuestion()
    props.onResetAnswer()
    props.onResetResults()
  }

  return(
    <div className="play_buttons_container">
      <div className="quick_play_container">
        <PlayButton
          link={ routes.quick_play }
          buttonName="quick_play"
          classType="quick_play_button"
          onClick={ onClickFunctions }
        >
          Quick Play
        </PlayButton>
      </div>
      <div className="other_play_container">
        <PlayButton
          link={ routes.by_diff }
          buttonName="by_diff"
          classType="play_by_difficulty_button"
          onClick={ onClickFunctions }
        >
          Play By Difficulty
        </PlayButton>
        <PlayButton
          link={ routes.by_cat }
          buttonName="by_cat"
          classType="play_by_category_button"
          onClick={ onClickFunctions }
        >
          Play By Category
        </PlayButton>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onResetGameMode: () => dispatch(actions.resetGameMode()),
    onSetGameMode: (mode) => dispatch(actions.setGameMode(mode)),
    onSetGameState: (state) => dispatch(actions.setGameState(state)),
    onResetGameState: () => dispatch(actions.resetGameState()),
    onSetGameQset: (set) => dispatch(actions.setGameQset(set)),
    onResetGameQset: (set) => dispatch(actions.resetGameQset(set)),
    onGetQuickQuestion: (obj) => dispatch(actions.getQuickQuestion(obj)),
    onGetDiffQuestion: (obj) => dispatch(actions.getDiffQuestion(obj)),
    onGetCatQuestion: (obj) => dispatch(actions.getCatQuestion(obj)),
    onResetQuestion: () => dispatch(actions.resetQuestion()),
    onSetAnswer: (obj) => dispatch(actions.setAnswer(obj)),
    onResetAnswer: () => dispatch(actions.resetAnswer()),
    onGetResults: (obj) => dispatch(actions.getResults(obj)),
    onResetResults: () => dispatch(actions.resetResults()),
    onSetVote: (obj) => dispatch(actions.setVote(obj)),
    onResetVote: (obj) => dispatch(actions.resetVote(obj)),
    onSetComment: (obj) => dispatch(actions.setComment(obj)),
    onResetComment: (obj) => dispatch(actions.resetComment(obj))
  }
}

export default connect(null, mapDispatchToProps)(HomeLoggedInPlayButtonsContainer)
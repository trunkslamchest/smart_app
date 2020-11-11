import React from 'react'

import { connect } from 'react-redux'
import {
  resetGameMode,
  resetGameState,
  resetGameQset,
  resetQuestion,
  resetAnswer,
  resetResults,
  resetVote,
  resetComment
} from '../../../store/actions/actionIndex'
import { routes } from '../../../utility/paths'


import PlayButton from '../../../UI/buttons/playButton/playButton'

import './homeLoggedInPlayButtonsContainer.css'

const HomeLoggedInPlayButtonsContainer = (props) => {

  const onClickFunctions = (event) => {
    if(props.play.gameMode) props.onResetGameMode()
    if(props.play.gameState) props.onResetGameState()
    if(props.play.gameQset) props.onResetGameQset()
    if(props.play.question) props.onResetQuestion()
    if(props.play.answer) props.onResetAnswer()
    if(props.play.results) props.onResetResults()
    if(props.play.voted) props.onResetVote()
    if(props.play.commented) props.onResetComment()
  }

  return(
    <div className="play_buttons_container">
      <div className="quick_play_container">
        <PlayButton
          link={ routes.play }
          buttonName="start"
          classType="start_button"
          onClick={ onClickFunctions }
        >
          Start
        </PlayButton>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    play: state.play
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onResetGameMode: () => dispatch(resetGameMode()),
    onResetGameState: () => dispatch(resetGameState()),
    onResetGameQset: (set) => dispatch(resetGameQset(set)),
    onResetQuestion: () => dispatch(resetQuestion()),
    onResetAnswer: () => dispatch(resetAnswer()),
    onResetResults: () => dispatch(resetResults()),
    onResetVote: (obj) => dispatch(resetVote(obj)),
    onResetComment: (obj) => dispatch(resetComment(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLoggedInPlayButtonsContainer)
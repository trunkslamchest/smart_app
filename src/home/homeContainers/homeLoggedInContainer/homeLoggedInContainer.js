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

import makeHomeLoggedInButtons from '../../homeFunctions/makeHomeLoggedInButtons'

import HomeButtonsContainer from '../homeButtonsContainer/homeButtonsContainer'

import './homeLoggedInContainer.css'

const HomeLoggedInContainer = (props) => {

  const onStartGame = (event) => {
    if(props.play.gameMode) props.onResetGameMode()
    if(props.play.gameState) props.onResetGameState()
    if(props.play.gameQset) props.onResetGameQset()
    if(props.play.question) props.onResetQuestion()
    if(props.play.answer) props.onResetAnswer()
    if(props.play.results) props.onResetResults()
    if(props.play.voted) props.onResetVote()
    if(props.play.commented) props.onResetComment()
    props.history.push(routes.play)
  }

  let homeButtons = makeHomeLoggedInButtons(onStartGame, routes.play)


  return(
    <div className='home_logged_in_container'>
      <HomeButtonsContainer
        containerClass='logged_in_buttons_container'
        buttons={ homeButtons }
        history={ props.history }
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeLoggedInContainer)
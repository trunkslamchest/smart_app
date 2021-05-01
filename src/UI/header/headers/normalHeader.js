import React from 'react'
import { routes } from '../../../utility/paths'
import { connect } from 'react-redux'
import {
  logout,
  resetGameMode,
  resetGameState,
  resetGameQset,
  resetQuestion,
  resetAnswer,
  resetResults,
  resetVote,
  resetComment,
  setGameMode,
  setGameState,
  updateGameStatus
} from '../../../store/actions/actionIndex'

import makeLoggedInHeaderButtons from '../headerFunctions/makeLoggedInHeaderButtons'
import makePlayMenuButtons from '../headerFunctions/makePlayMenuButtons'
import makeProfileMenuButtons from '../headerFunctions/makeProfileMenuButtons'

import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import iconsIndex from '../../../assets/icons/iconsIndex'

import '../header.css'

const NormalHeader = (props) => {

  const onInitGame = (event) => {
    if(!!props.play.status) onClearGame()
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    localStorage.gameMode = buttonParams.gameMode
    props.onSetGameState('select')
    props.onSetGameMode(buttonParams.gameMode)
    props.history.push( buttonParams.route )
  }

  const onPushLink = (event) => {
    if(!!props.play.status) onClearGame()
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    props.history.push(buttonParams.route)
  }

  const onLogOut = (event) => {
    event.persist()
    props.onLogoutModal(true)
  }

  const onClearGame = () => {
    if(!!props.play.gameMode) props.onResetGameMode()
    if(!!props.play.gameState) props.onResetGameState()
    if(!!props.play.gameQset) props.onResetGameQset()
    if(!!props.play.question) props.onResetQuestion()
    if(!!props.play.answer) props.onResetAnswer()
    if(!!props.play.results) props.onResetResults()
    if(!!props.play.voted) props.onResetVote()
    if(!!props.play.commented) props.onResetComment()
  }

  const playMenuButtons = makePlayMenuButtons(onInitGame, routes)
  const profileMenuButtons = makeProfileMenuButtons(onPushLink, onLogOut, routes)

  let headerButtons

  if(props.user.info) {
    headerButtons = makeLoggedInHeaderButtons(iconsIndex, onPushLink, playMenuButtons, profileMenuButtons, props.user.info.avatar, routes)
  }

  return(
    <>
      <div className='header_nav_links'>
        <DefaultButtonsContainer
          buttons={ headerButtons }
          buttonContainerClass={ 'header_button_container' }
          containerClass={ 'header_buttons_container' }
          enableButton={ true }
        />
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    play: state.play,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutModal: (bool) => dispatch(logout(bool)),
    onResetGameMode: () => dispatch(resetGameMode()),
    onResetGameState: () => dispatch(resetGameState()),
    onResetGameQset: (set) => dispatch(resetGameQset(set)),
    onResetQuestion: () => dispatch(resetQuestion()),
    onResetAnswer: () => dispatch(resetAnswer()),
    onResetResults: () => dispatch(resetResults()),
    onResetVote: (obj) => dispatch(resetVote(obj)),
    onResetComment: (obj) => dispatch(resetComment(obj)),
    onSetGameMode: (mode) => dispatch(setGameMode(mode)),
    onSetGameState: (state) => dispatch(setGameState(state)),
    onUpdateGameStatus: (status, loading) => dispatch(updateGameStatus(status, loading)),

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(NormalHeader)
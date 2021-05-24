import React from 'react'
import { useHistory } from 'react-router-dom'
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
  setGameState
} from '../../../store/actions/actionIndex'

import makeLoggedInHeaderButtons from '../headerFunctions/makeLoggedInHeaderButtons'
import makePlayMenuButtons from '../headerFunctions/makePlayMenuButtons'
import makeProfileMenuButtons from '../headerFunctions/makeProfileMenuButtons'

import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import iconsIndex from '../../../assets/icons/iconsIndex'

import '../header.css'

const NormalHeader = (props) => {

  const history = useHistory()

  const onInitGame = (event) => {
    if(!!props.playStatus) onClearGame()
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    localStorage.gameMode = buttonParams.gameMode
    props.onSetGameState('select')
    props.onSetGameMode(buttonParams.gameMode)
    history.push( buttonParams.route )
  }

  const onPushLink = (event) => {
    if(!!props.playStatus) onClearGame()
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    history.push(buttonParams.route)
  }

  const onLogOut = (event) => {
    event.persist()
    props.onLogoutModal(true)
  }

  const onClearGame = () => {
    if(!!props.playGameMode) props.onResetGameMode()
    if(!!props.playState) props.onResetGameState()
    if(!!props.playQset) props.onResetGameQset()
    if(!!props.playQuestion) props.onResetQuestion()
    if(!!props.playAnswer) props.onResetAnswer()
    if(!!props.playResults) props.onResetResults()
    if(!!props.playVote) props.onResetVote()
    if(!!props.playComment) props.onResetComment()
  }

  const playMenuButtons = makePlayMenuButtons(onInitGame, routes)
  const profileMenuButtons = makeProfileMenuButtons(onPushLink, onLogOut, routes)

  let headerButtons

  if(props.userInfo) {
    headerButtons = makeLoggedInHeaderButtons(iconsIndex, onPushLink, playMenuButtons, profileMenuButtons, props.userInfo.avatar, routes)
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

const store = (store) => {
  return {
    playStatus: store.play.status,
    playGameMode: store.play.gameMode,
    playState: store.play.gameState,
    playQset: store.play.gameQset,
    playQuestion: store.play.question,
    playAnswer: store.play.answer,
    playResults: store.play.results,
    playVote: store.play.voted,
    playComment: store.play.commented,
    userInfo: store.user.info
  }
}

const dispatch = (dispatch) => {
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
  }
}


export default connect(store, dispatch)(NormalHeader)
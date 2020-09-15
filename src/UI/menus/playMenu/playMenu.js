import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actionIndex'

import { routes } from '../../../utility/paths.js'

import DropDownMenu from '../dropDownMenu'

import PlayMenuButton from './playMenuButton'

import './playMenu.scss'
import './playMenuButton.scss'
import './playMenuButton2.scss'

const PlayMenu = (props) => {

  const onClickFunctions = (event) => {
    let gameMode = event.target.name
    localStorage.gameMode = gameMode
    if(props.play.gameMode) props.onResetGameMode()
    if(props.play.gameState) props.onResetGameState()
    if(props.play.gameQset) props.onResetGameQset()
    if(props.play.question) props.onResetQuestion()
    if(props.play.answer) props.onResetAnswer()
    if(props.play.results) props.onResetResults()
    props.switchPlayMenu()
  }

  return(
    <DropDownMenu
      divClass='playMenu'
      menu='playMenu'
      showMenu={props.showPlayMenu}
      switchMenu={props.switchPlayMenu}
    >
      <PlayMenuButton
        link={ routes.quick_play }
        name='quick_play'
        menu='playMenu'
        onClick={onClickFunctions}
      >
        Quick Play
      </PlayMenuButton>
      <PlayMenuButton
        link={ routes.by_diff }
        name='by_diff'
        menu='playMenu'
        onClick={onClickFunctions}
      >
        By Difficulty
      </PlayMenuButton>
      <PlayMenuButton
        link={ routes.by_cat }
        name='by_cat'
        menu='playMenu'
        onClick={onClickFunctions}
      >
        By Category
      </PlayMenuButton>
    </DropDownMenu>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    play: state.play,
    user: state.user,
    questions: state.questions
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayMenu)
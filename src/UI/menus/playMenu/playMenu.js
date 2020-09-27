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
    if(props.play.voted) props.onResetVote()
    if(props.play.commented) props.onResetComment()
    props.switchPlayMenu()
  }

  return(
    <DropDownMenu
      divClass='playMenu'
      menu='playMenu'
      showMenu={ props.showPlayMenu }
      switchMenu={ props.switchPlayMenu }
    >
      <PlayMenuButton
        link={ routes.quick_play }
        name='quick_play'
        menu='playMenu'
        onClick={ onClickFunctions }
      >
        Quick Play
      </PlayMenuButton>
      <PlayMenuButton
        link={ routes.by_diff }
        name='by_diff'
        menu='playMenu'
        onClick={ onClickFunctions }
      >
        By Difficulty
      </PlayMenuButton>
      <PlayMenuButton
        link={ routes.by_cat }
        name='by_cat'
        menu='playMenu'
        onClick={ onClickFunctions }
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayMenu)
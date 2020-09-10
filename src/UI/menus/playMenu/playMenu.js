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

  const onClickQuickPlayFunctions = () => {
    props.onSetGameMode('quick_play')
    localStorage.gameMode = 'quick_play'
    props.onSetGameState('init')
    props.switchPlayMenu()
  }

  const onClickByDifficultyFunctions = () => {
    props.onSetGameMode('by_diff')
    localStorage.gameMode = 'by_diff'
    props.onSetGameState('init')
    props.switchPlayMenu()
  }

  const onClickByCategoryFunctions = () => {
    props.onSetGameMode('by_cat')
    localStorage.gameMode = 'by_cat'
    props.onSetGameState('init')
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
        name='quick_play_button'
        menu='playMenu'
        onClick={onClickQuickPlayFunctions}
      >
        Quick Play
      </PlayMenuButton>
      <PlayMenuButton
        link={ routes.by_diff }
        name='by_difficulty_button'
        menu='playMenu'
        onClick={onClickByDifficultyFunctions}
      >
        By Difficulty
      </PlayMenuButton>
      <PlayMenuButton
        link={ routes.by_cat }
        name='by_category_button'
        menu='playMenu'
        onClick={onClickByCategoryFunctions}
      >
        By Category
      </PlayMenuButton>
    </DropDownMenu>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onSetGameMode: (mode) => dispatch(actions.setGameMode(mode)),
    onSetGameState: (state) => dispatch(actions.setGameState(state))
  }
}

export default connect(null, mapDispatchToProps)(PlayMenu)
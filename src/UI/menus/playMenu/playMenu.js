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
    props.switchPlayMenu()
  }

  const onClickByDifficultyFunctions = () => {
    props.onSetGameMode("byDifficulty")
    props.switchPlayMenu()
  }

  const onClickByCategoryFunctions = () => {
    props.onSetGameMode("byCategory")
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
    onSetGameMode: (mode) => dispatch(actions.setGameMode(mode))
  }
}

export default connect(null, mapDispatchToProps)(PlayMenu)
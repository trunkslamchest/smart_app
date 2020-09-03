import React from 'react'

import { routes } from '../../../utility/paths.js'

import DropDownMenu from '../dropDownMenu'

import PlayMenuButton from './playMenuButton'

import './playMenu.scss'
import './playMenuButton.scss'
import './playMenuButton2.scss'

const PlayMenu = (props) => {

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
        onClick={props.switchPlayMenu}
      >
        Quick Play
      </PlayMenuButton>
      <PlayMenuButton
        link={ routes.by_diff }
        name='by_difficulty_button'
        menu='playMenu'
        onClick={props.switchPlayMenu}
      >
        By Difficulty
      </PlayMenuButton>
      <PlayMenuButton
        link={ routes.by_cat }
        name='by_category_button'
        menu='playMenu'
        onClick={props.switchPlayMenu}
      >
        By Category
      </PlayMenuButton>
    </DropDownMenu>
  )
}

export default PlayMenu
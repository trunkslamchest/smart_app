import React from 'react'

import { routes } from '../../../utility/paths.js'

import DropDownMenu from '../dropDownMenu'

import PlayMenuButton from './playMenuButton'
import PlayMenuButton2 from './playMenuButton2'

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
        menu='playMenu'
        link={ routes.home }
        name='quick_play_button'
        onClick={props.switchPlayMenu}
      >
        Quick Play
      </PlayMenuButton>
      <PlayMenuButton2
        menu='playMenu'
        name='by_difficulty_button'
        onClick={props.switchPlayMenu}
      >
        By Difficulty
      </PlayMenuButton2>
      <PlayMenuButton2
        menu='playMenu'
        name='by_category_button'
        onClick={props.switchPlayMenu}
      >
        By Category
      </PlayMenuButton2>
    </DropDownMenu>
  )
}

export default PlayMenu
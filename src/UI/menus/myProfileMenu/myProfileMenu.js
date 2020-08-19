import React from 'react'

import { routes } from '../../../utility/paths.js'

import DropDownMenu from '../dropDownMenu'

import MyProfileMenuButton from './myProfileMenuButton'
import MyProfileMenuButton2 from './myProfileMenuButton2'

import './myProfileMenu.scss'
import './myProfileMenuButton.scss'
import './myProfileMenuButton2.scss'

const MyProfileMenu = (props) => {

  const onLogOut = () => {
    props.showProfileMenu()
    props.showLogOutModal()
  }

  return(
    <DropDownMenu
      divClass='myProfileMenu'
      showMenu={props.showProfileMenu}
    >
      <MyProfileMenuButton
        link={ routes.dashboard }
        name='My Profile'
        onClick={props.showProfileMenu}
      >
        Dashboard
      </MyProfileMenuButton>
      <MyProfileMenuButton
        link={ routes.dashboard_profile }
        name='View Profile'
        onClick={props.showProfileMenu}
      >
        View Profile
      </MyProfileMenuButton>
      <MyProfileMenuButton
        link={ routes.dashboard_profile_edit }
        name='Edit Profile'
        onClick={props.showProfileMenu}
      >
        Edit Profile
      </MyProfileMenuButton>
      <MyProfileMenuButton2
        name='Log Out'
        onClick={onLogOut}
      >
        Log Out
      </MyProfileMenuButton2>
    </DropDownMenu>
  )
}

export default MyProfileMenu
import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actionIndex'

import { routes } from '../../../utility/paths.js'

import DropDownMenu from '../dropDownMenu'

import MyProfileMenuButton from './myProfileMenuButton'
import MyProfileMenuButton2 from './myProfileMenuButton2'

import './myProfileMenu.scss'
import './myProfileMenuButton.scss'
import './myProfileMenuButton2.scss'

const MyProfileMenu = (props) => {

  const onLogOut = () => {
    props.switchProfileMenu()
    props.onLogoutModal(true)
  }

  return(
    <DropDownMenu
      divClass='myProfileMenu'
      menu='myProfileMenu'
      showMenu={props.showProfileMenu}
      switchMenu={props.switchProfileMenu}
    >
      <MyProfileMenuButton
        menu='myProfileMenu'
        link={ routes.dashboard }
        name='My Profile'
        onClick={props.switchProfileMenu}
      >
        Dashboard
      </MyProfileMenuButton>
      <MyProfileMenuButton
        menu='myProfileMenu'
        link={ routes.dashboard_profile }
        name='View Profile'
        onClick={props.switchProfileMenu}
      >
        View Profile
      </MyProfileMenuButton>
      <MyProfileMenuButton
        menu='myProfileMenu'
        link={ routes.dashboard_profile_edit }
        name='Edit Profile'
        onClick={props.switchProfileMenu}
      >
        Edit Profile
      </MyProfileMenuButton>
      <MyProfileMenuButton2
        menu='myProfileMenu'
        name='Log Out'
        onClick={onLogOut}
      >
        Log Out
      </MyProfileMenuButton2>
    </DropDownMenu>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutModal: (bool) => dispatch(actions.logout(bool)),
  }
}

export default connect(null, mapDispatchToProps)(MyProfileMenu)
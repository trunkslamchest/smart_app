import React from 'react'
import { routes } from '../../../utility/paths'
import { connect } from 'react-redux'
import {
  login,
  signup
} from '../../../store/actions/actionIndex'

import HeaderIconButtonContainer from '../headerIconButton/headerIconButtonContainer'
import iconsIndex from '../../../assets/icons/iconsIndex'

import '../header.css'

const GuestHeader = (props) => {

  const onLogIn = (event, args) => {
    event.persist()
    props.onLoginModal(args)
  }

  const onSignUp = (event, args) => {
    event.persist()
    props.onSignupModal(args)
  }

  const headerButtons = [
    { buttonType: 'link', icon: iconsIndex.leaderboardWhiteIcon, iconHover: iconsIndex.leaderboardBlackIcon, iconClass: 'header_icon', id: 'header_leader_board_button', name: 'LeaderboardsButton', tooltipText: 'Leaderboards', route: routes.leader_boards + '/overall' },
    { buttonType: 'modal', icon: iconsIndex.loginWhiteIcon, iconHover: iconsIndex.loginBlackIcon, iconClass: 'header_icon', id: 'header_login_button', name: 'LoginButton', tooltipText: 'Login', clickFunction: onLogIn, args: true },
    { buttonType: 'modal', icon: iconsIndex.signUpWhiteIcon, iconHover: iconsIndex.signUpBlackIcon, iconClass: 'header_icon', id: 'header_sign_up_button', name: 'SignUpButton', tooltipText: 'Sign Up', clickFunction: onSignUp, args: true }
  ]

  const distribHeaderButtons = headerButtons.map((button, index) => {
    return(
      <HeaderIconButtonContainer
        args={ button.args }
        buttonClass='header_icon_button'
        buttonType={ button.buttonType }
        clickFunction={ button.clickFunction }
        history={ props.history }
        icon={ button.icon }
        iconClass={ button.iconClass }
        iconHover={ button.iconHover }
        id={ button.id }
        key={ index }
        name={ button.name }
        route={ button.route }
        tooltipText={ button.tooltipText }
      />
    )
  })

  return(
    <div className='header_nav_links'>
      { distribHeaderButtons }
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginModal: (bool) => dispatch(login(bool)),
    onSignupModal: (bool) => dispatch(signup(bool))
  }
}

export default connect(null, mapDispatchToProps)(GuestHeader)
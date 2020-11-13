import React from 'react'
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
  resetComment
} from '../../../store/actions/actionIndex'

import HeaderIconButtonContainer from '../headerIconButton/headerIconButtonContainer'
import iconsIndex from '../../../assets/icons/iconsIndex'

import '../header.css'

const NormalHeader = (props) => {

  const onInitGame = (event) => {
    if(!!props.play.status) onClearGame()
    let gameMode = event.target.name
    localStorage.gameMode = gameMode
  }

  const onClearGame = () => {
    if(!!props.play.gameMode) props.onResetGameMode()
    if(!!props.play.gameState) props.onResetGameState()
    if(!!props.play.gameQset) props.onResetGameQset()
    if(!!props.play.question) props.onResetQuestion()
    if(!!props.play.answer) props.onResetAnswer()
    if(!!props.play.results) props.onResetResults()
    if(!!props.play.voted) props.onResetVote()
    if(!!props.play.commented) props.onResetComment()
  }

  const onLogOut = (event, args) => {
    event.persist()
    props.onLogoutModal(args)
  }

  const playMenuButtons = [
    { name:'quick_play', menu: 'playMenu', route: routes.quick_play, text: "Quick Play", type: 'link', clickFunction: onInitGame },
    { name:'by_diff', menu: 'playMenu', route: routes.by_diff, text: "By Difficulty", type: 'link', clickFunction: onInitGame },
    { name:'by_cat', menu: 'playMenu', route: routes.by_cat, text: "By Category", type: 'link', clickFunction: onInitGame }
  ]

  const profileMenuButtons = [
    { name:'profile', menu: 'myProfileMenu', route: routes.dashboard_profile, text: 'Profile', type: 'link', clickFunction: onClearGame },
    { name:'stats', menu: 'myProfileMenu', route: routes.dashboard_stats, text: 'Statistics', type: 'link', clickFunction: onClearGame },
    { name:'achievements', menu: 'myProfileMenu', route: routes.dashboard_achievements, text: 'Achievements', type: 'link', clickFunction: onClearGame },
    { name:'settings', menu: 'myProfileMenu', route: routes.dashboard_settings, text: 'Settings', type: 'link', clickFunction: onClearGame },
    { name:'log_out', menu: 'myProfileMenu', text: 'Log Out', type: 'modal', clickFunction: onLogOut, args: true }
  ]

  const headerButtons = [
    { buttonType: 'link', icon: iconsIndex.leaderboardWhiteIcon, iconHover: iconsIndex.leaderboardBlackIcon, iconClass: 'header_icon', id: 'header_leader_board_button', name: 'LeaderboardsButton', tooltipText: 'Leaderboards', route: routes.leader_boards + '/overall', clickFunction: onClearGame },
    { buttonType: 'menu', icon: iconsIndex.playWhiteIcon, iconHover: iconsIndex.playBlackIcon, iconClass: 'header_icon', id: 'header_play_button', name: 'PlayButton', tooltipText: 'Play', menuButtons: playMenuButtons },
    { buttonType: 'menu', icon: props.user.info.avatar, iconHover: props.user.info.avatar, iconClass: 'header_profile_icon', id: 'header_profile_button', name: 'ProfileButton', tooltipText: 'My Profile', menuButtons: profileMenuButtons },
  ]

  const distribHeaderButtons = headerButtons.map((button, index) => {
    return(
      <HeaderIconButtonContainer
        buttonClass='header_icon_button'
        buttonType={ button.buttonType }
        history={ props.history }
        icon={ button.icon }
        iconClass={ button.iconClass }
        iconHover={ button.iconHover }
        id={ button.id }
        key={ index }
        name={ button.name }
        menuButtons={ button.menuButtons }
        clickFunction={ button.clickFunction }
        route={ button.route }
        tooltipText={ button.tooltipText }
      />
    )
  })

  return(
    <>
      {/* <div className='header_greeting'>
        { this.props.auth.valid && `Hello, ${this.props.user.info.user_name}!` }
      </div> */}

      <div className='header_nav_links'>
        { distribHeaderButtons }
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    play: state.play,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutModal: (bool) => dispatch(logout(bool)),
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


export default connect(mapStateToProps, mapDispatchToProps)(NormalHeader)
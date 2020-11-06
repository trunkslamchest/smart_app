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

import HeaderIconButton from '../headerIconButton/headerIconButton'
import iconsIndex from '../../../assets/icons/iconsIndex'

import '../header.css'

class NormalHeader extends React.Component {

  onClearGame = (event) => {
    if(!!this.props.play.status){
      if(!!this.props.play.gameMode) this.props.onResetGameMode()
      if(!!this.props.play.gameState) this.props.onResetGameState()
      if(!!this.props.play.gameQset) this.props.onResetGameQset()
      if(!!this.props.play.question) this.props.onResetQuestion()
      if(!!this.props.play.answer) this.props.onResetAnswer()
      if(!!this.props.play.results) this.props.onResetResults()
      if(!!this.props.play.voted) this.props.onResetVote()
      if(!!this.props.play.commented) this.props.onResetComment()
    }
    let gameMode = event.target.name
    localStorage.gameMode = gameMode
  }

  onLogOut = (event, args) => {
    event.persist()
    this.props.onLogoutModal(args)
  }

  render(){

    const playMenuButtons = [
      { name:'quick_play', menu: 'playMenu', route: routes.quick_play, text: "Quick Play", type: 'link' },
      { name:'by_diff', menu: 'playMenu', route: routes.by_diff, text: "By Difficulty", type: 'link' },
      { name:'by_cat', menu: 'playMenu', route: routes.by_cat, text: "By Category", type: 'link' }
    ]

    const profileMenuButtons = [
      { name:'my_profile', menu: 'myProfileMenu', route: routes.dashboard, text: 'My Profile', type: 'link' },
      { name:'view_profile', menu: 'myProfileMenu', route: routes.dashboard_profile, text: 'View Profile', type: 'link' },
      { name:'edit_profile', menu: 'myProfileMenu', route: routes.dashboard_profile_edit, text: 'Edit Profile', type: 'link' },
      { name:'log_out', menu: 'myProfileMenu', click: this.onLogOut, args: true, text: 'Log Out', type: 'modal' }
    ]

    const headerButtons = [
      { buttonType: 'link', icon: iconsIndex.leaderboardWhiteIcon, iconHover: iconsIndex.leaderboardBlackIcon, iconClass: 'header_icon', id: 'header_leader_board_button', name: 'LeaderboardsButton', tooltipText: 'Leaderboards', route: routes.leader_boards + '/overall' },
      { buttonType: 'menu', icon: iconsIndex.playWhiteIcon, iconHover: iconsIndex.playBlackIcon, iconClass: 'header_icon', id: 'header_play_button', name: 'PlayButton', tooltipText: 'Play', menuButtons: playMenuButtons },
      { buttonType: 'menu', icon: this.props.user.info.avatar, iconHover: this.props.user.info.avatar, iconClass: 'header_profile_icon', id: 'header_profile_button', name: 'ProfileButton', tooltipText: 'My Profile', menuButtons: profileMenuButtons },
    ]

    const distribHeaderButtons = headerButtons.map((button, index) => {
      return(
        <HeaderIconButton
          key={ index }
          buttonType={ button.buttonType }
          classType='header_icon_button'
          icon={ button.icon }
          iconHover={ button.iconHover }
          iconClass={ button.iconClass }
          history={ this.props.history }
          id={ button.id }
          name={ button.name }
          menuButtons={ button.menuButtons }
          onClearGame={ this.onClearGame }
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
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    modal: state.modal,
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
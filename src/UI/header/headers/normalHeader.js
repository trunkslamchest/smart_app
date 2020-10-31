import React from 'react'

import { connect } from 'react-redux'

import { routes } from '../../../utility/paths'

import MyProfileMenu from '../../menus/myProfileMenu/myProfileMenu'
import PlayMenu from '../../menus/playMenu/playMenu'

import HeaderButton2 from '../headerButton2/headerButton2'

import '../header.css'

class NormalHeader extends React.Component {

  state = {
    showLeaderBoardsMenu: false,
    showPlayMenu: false,
    showProfileMenu: false,
  }

  // switchLeaderBoardsMenu = () => {
  //   let switchMenu = !this.state.showLeaderBoardsMenu
  //   this.setState({
  //     showLeaderBoardsMenu: switchMenu,
  //     showPlayMenu: false,
  //     showProfileMenu: false
  //   })
  // }

  onClickLeaderBoardsFunctions = () => {
    this.props.history.push( routes.leader_boards + '/overall' )
  }


  switchPlayMenu = () => {
    let switchMenu = !this.state.showPlayMenu
    this.setState({
      showLeaderBoardsMenu: false,
      showPlayMenu: switchMenu,
      showProfileMenu: false
    })
  }

  switchProfileMenu = () => {
    let switchMenu = !this.state.showProfileMenu
    this.setState({
      showLeaderBoardsMenu: false,
      showPlayMenu: false,
      showProfileMenu: switchMenu
    })
  }

  render(){
    return(
      <>
        <div className='header_greeting'>
          {this.props.auth.valid && `Hello, ${this.props.user.info.user_name}!`}
        </div>
        <div className='header_nav_links'>

          <div className='header_nav_links_menu_container'>
            <HeaderButton2
              menu='leaderBoardsMenu'
              name='header_leader_boards_button'
              onClick={ this.onClickLeaderBoardsFunctions }
            >
              Leader Boards
            </HeaderButton2>
          </div>
          <div className='header_nav_links_menu_container'>
            <HeaderButton2
              menu='playMenu'
              name='header_play_button'
              onClick={ this.switchPlayMenu }
            >
              Play
            </HeaderButton2>
            {this.state.showPlayMenu ? <PlayMenu switchPlayMenu={ this.switchPlayMenu } showPlayMenu={ this.state.showPlayMenu } /> : null}
          </div>
          <div
            className='header_nav_links_menu_container'
          >
            <HeaderButton2
              menu='myProfileMenu'
              name='header_my_profile_button'
              onClick={ this.switchProfileMenu }
            >
              My Profile
            </HeaderButton2>
            {this.state.showProfileMenu ? <MyProfileMenu switchProfileMenu={ this.switchProfileMenu } showProfileMenu={ this.state.showProfileMenu } /> : null}
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user
  }
}

export default connect(mapStateToProps)(NormalHeader)
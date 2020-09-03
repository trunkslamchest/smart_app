import React from 'react'

import { connect } from 'react-redux'

import MyProfileMenu from '../../menus/myProfileMenu/myProfileMenu'
import PlayMenu from '../../menus/playMenu/playMenu'

import HeaderButton2 from '../headerButton2'

import '../header.css'
import '../headerButton2.css'

class NormalHeader extends React.Component {

  // constructor(props) {
  //   super(props)
  //   this.setButtonRef = this.setButtonRef.bind(this)
  // }

  state = {
    showPlayMenu: false,
    showProfileMenu: false,
  }

  // setButtonRef(node){this.buttonRef = node}

  switchPlayMenu = (bool) => {
    let switchMenu = !this.state.showPlayMenu
    this.setState({
      showPlayMenu: switchMenu,
      showProfileMenu: false
    })
  }

  switchProfileMenu = () => {
    let switchMenu = !this.state.showProfileMenu
    this.setState({
      showProfileMenu: switchMenu,
      showPlayMenu: false
    })
  }

  render(){

    // console.log(this.state)

    return(
      <>
        <div className='header_greeting'>
          {!!this.props.user.info && `Hello, ${this.props.user.info.user_name}!`}
        </div>
        <div className='header_nav_links'>

          <div className='header_nav_links_menu_container'>
            <HeaderButton2
              menu='playMenu'
              name='header_play_button'
              onClick={this.switchPlayMenu}
              // ref={this.setButtonRef}
            >
              Play
            </HeaderButton2>
            {this.state.showPlayMenu ? <PlayMenu switchPlayMenu={ this.switchPlayMenu } showPlayMenu={ this.state.showPlayMenu } /> : null}
          </div>

          <div
            className='header_nav_links_menu_container'
            onMouseEnter={this.onHover}
            onMouseLeave={this.onHover}
          >
            <HeaderButton2
              menu='myProfileMenu'
              name='header_my_profile_button'
              onClick={this.switchProfileMenu}
              // ref={this.setButtonRef}
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
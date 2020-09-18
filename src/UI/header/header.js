import React from 'react'

import { connect } from 'react-redux'

import { routes } from '../../utility/paths.js'

import GuestHeader from './headers/guestHeader'
import NormalHeader from './headers/normalHeader'

import HeaderButton from './headerButton/headerButton'

import './header.css'

const Header = (props) => {
  let home_link = null

  let header = <GuestHeader />

  if(props.auth.valid) {
    home_link =
      <HeaderButton
        link={ routes.home }
        name='header_home_button'
      >
        Home
      </HeaderButton>

    header =
      <NormalHeader
        user_name={props.user_name}
        showProfileMenu={props.showProfileMenu}
      />
  }

  return(
    <div className='header'>
      <div className='header_left'>
        { home_link }
      </div>
      <div className='header_right'>
        { header }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Header)
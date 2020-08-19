import React from 'react'

import GuestHeader from './headers/guestHeader'
import NormalHeader from './headers/normalHeader'

import HeaderButton from './headerButton'

import './header.css'

const Header = (props) => {
  let home_link = null

  let header =
    <GuestHeader
      showLogInModal={props.showLogInModal}
      showSignUpModal={props.showSignUpModal}
    />

  if(!!props.user_token) {
    home_link =
      <HeaderButton
        link='/'
        name='header_home_button'
        onClick={props.onClickHomeFunctions}
      >
        Home
      </HeaderButton>

    header =
      <NormalHeader
        user_name={props.user_name}
        showLogOutModal={props.showLogOutModal}
        showProfileMenu={props.showProfileMenu}
      />
  }

  return(
    <div className='header'>
      <div className='header_left'>
        {home_link}
      </div>
      <div className='header_right'>
        { header }
      </div>
    </div>
  )
}

export default Header
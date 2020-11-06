import React from 'react'
import { connect } from 'react-redux'
import { routes } from '../../utility/paths.js'

import GuestHeader from './headers/guestHeader'
import NormalHeader from './headers/normalHeader'

import HeaderIconButtonContainer from './headerIconButton/headerIconButtonContainer'

import iconsIndex from '../../assets/icons/iconsIndex'

import './header.css'

const Header = (props) => {

  let header

  if(localStorage.access === 'guest') header = <GuestHeader history={ props.history } />

  if(props.auth.status === 'authValid') {
    header =
      <NormalHeader
        history={ props.history }
        user_name={ props.user_name }
      />
  }

  return(
    <div className='header'>
      <div className='header_left'>
        <HeaderIconButtonContainer
          buttonClass='header_home_button'
          buttonType='link'
          history={ props.history }
          icon={ iconsIndex.homeWhiteIcon }
          iconClass="header_home_icon"
          iconHover={ iconsIndex.homeBlackIcon }
          id="header_home_button"
          key="0header_home_button"
          name="headerHomeButton"
          route={ routes.home }
        />
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
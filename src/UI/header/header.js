import React from 'react'
import { connect } from 'react-redux'
import { routes } from '../../utility/paths.js'

import makeHomeButton from './headerFunctions/makeHomeButton'

import GuestHeader from './headers/guestHeader'
import NormalHeader from './headers/normalHeader'

// import HeaderIconButtonContainer from './headerIconButton/headerIconButtonContainer'
import DefaultButtonContainer from '../buttons/defaultButtonsContainer/defaultButtonsContainer'

import iconsIndex from '../../assets/icons/iconsIndex'

import './header.css'

const Header = (props) => {

  let header


  const onPushLink = (event) => {
    // if(!!props.play.status) onClearGame()
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    props.history.push(buttonParams.route)
  }

  if(localStorage.access === 'guest') header = <GuestHeader history={ props.history } />

  if(props.auth.status === 'authValid') {
    header =
      <NormalHeader
        history={ props.history }
        user_name={ props.user_name }
      />
  }

  const homeButton = makeHomeButton(iconsIndex, onPushLink, routes)

  return(
    <div className='header_container'>
      {/* <div className='header_wrapper'> */}
        <div className='header_left'>
          {/* <HeaderIconButtonContainer
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
          /> */}
          <DefaultButtonContainer
            buttons={ homeButton }
            buttonContainerClass={ 'header_button_container' }
            containerClass={ 'header_buttons_container' }
            enableButton={ true }
          />
        </div>
        {/* <div className='header_center'></div> */}
        <div className='header_right'>
          { header }
        </div>
      {/* </div> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Header)
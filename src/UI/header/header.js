import React from 'react'
import { connect } from 'react-redux'
import { routes } from '../../utility/paths.js'

import makeHomeButton from './headerFunctions/makeHomeButton'

import GuestHeader from './headers/guestHeader'
import NormalHeader from './headers/normalHeader'
import DefaultButtonContainer from '../buttons/defaultButtonsContainer/defaultButtonsContainer'

import iconsIndex from '../../assets/icons/iconsIndex'

import './header.css'

const Header = (props) => {

  let header

  const onPushLink = (event) => {
    // console.log(event.target.attributes)
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
        <div className='header_left'>
          <DefaultButtonContainer
            buttons={ homeButton }
            buttonContainerClass={ 'header_button_container' }
            containerClass={ 'header_buttons_container' }
            enableButton={ true }
            history={ props.history }
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
import React from 'react'
import { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { routes } from '../../utility/paths.js'

import makeHomeButton from './headerFunctions/makeHomeButton'

import GuestHeader from './headers/guestHeader'
import NormalHeader from './headers/normalHeader'
import DefaultButtonContainer from '../buttons/defaultButtonsContainer/defaultButtonsContainer'

import iconsIndex from '../../assets/icons/iconsIndex'

import './header.css'

const Header = (props) => {

  const history = useHistory()

  let header

  const onPushLink = useCallback((event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    if (history.location.pathname !== buttonParams.route) history.push(buttonParams.route)
  }, [ history ])

  if(localStorage.access === 'guest' || !localStorage.length) header = <GuestHeader />

  if(props.authStatus === 'authValid') {
    header =
      <NormalHeader
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
          />
        </div>
        <div className='header_right'>
          { header }
        </div>
    </div>
  )
}

const store = (store) => {
  return {
    authStatus: store.auth.status
  }
}

export default connect(store)(Header)
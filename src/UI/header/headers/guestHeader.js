import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../utility/paths'
import { connect } from 'react-redux'
import {
  login,
  signup
} from '../../../store/actions/actionIndex'

import makeLoggedOutHeaderButtons from '../headerFunctions/makeLoggedOutHeaderButtons'

import DefaultButtonsContainer from '../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'
import iconsIndex from '../../../assets/icons/iconsIndex'

import '../header.css'

const GuestHeader = (props) => {

  const history = useHistory()

  const onLogIn = (event) => {
    event.persist()
    props.onLoginModal(true)
  }

  const onSignUp = (event) => {
    event.persist()
    props.onSignupModal(true)
  }

  const onPushLink = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    history.push(buttonParams.route)
  }

  let headerButtons = makeLoggedOutHeaderButtons(iconsIndex, onLogIn, onSignUp, onPushLink, routes)

  return(
    <div className='header_nav_links'>
      <DefaultButtonsContainer
        buttons={ headerButtons }
        buttonContainerClass={ 'header_button_container' }
        containerClass={ 'header_buttons_container' }
        enableButton={ true }
      />
    </div>
  )
}

const dispatch = (dispatch) => {
  return {
    onLoginModal: (bool) => dispatch(login(bool)),
    onSignupModal: (bool) => dispatch(signup(bool))
  }
}

export default connect(null, dispatch)(GuestHeader)
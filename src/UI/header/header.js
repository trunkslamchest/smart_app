import React from 'react'
import { useLocation } from 'react-router-dom'
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
  const location = useLocation()

  const onPushLink = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    if (location.pathname !== buttonParams.route) props.history.push(buttonParams.route)
  }

  if(localStorage.access === 'guest' || !localStorage.length) header = <GuestHeader history={ props.history } />

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

const store = (store) => {
  return {
    modal: store.modal,
    auth: store.auth
  }
}

// export default connect(store)(Header)

export default connect(store)(React.memo(Header))

// export default connect(store)(React.memo(Header, (prevProps, nextProps) => {
//   // console.log(prevProps, nextProps)
//   // console.log(prevProps.modal.loading, nextProps.modal.loading)

//   if(prevProps.auth.loading === nextProps.auth.loading) {
//     return true
//   }
//   else return false
// }))
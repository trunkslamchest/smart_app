import React from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { routes } from '../../../../utility/paths'

import DefaultButtonsContainer from '../../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './footerLogo.css'

const FooterLogo = (props) => {

  const location = useLocation()

  const onClickFunctions = () => {
    document.body.scrollTop = 0
    if (location.pathname !== props.route) props.history.push( props.route )
  }

  let footerLogoButton = [
    {
      buttonClass: 'footer_logo_button',
      buttonType: 'link',
      id: 'footer_logo_button',
      image: props.logo,
      imageHover: props.logoHover,
      name: 'footerLogoButton',
      onClickFunction: onClickFunctions,
      params: JSON.stringify({ route: routes.home })
    }
  ]

  return (
    <DefaultButtonsContainer
      buttons={ footerLogoButton }
      containerClass={ 'footer_logo_container' }
      enableButton={ true }
    />
  )
}

const store = (store) => {
  return {
    auth: store.auth
  }
}

export default connect(store)(FooterLogo)
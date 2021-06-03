import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../utility/paths'

import makeFooterLogoButton from '../../footerFunctions/makeFooterLogoButton'

import DefaultButtonsContainer from '../../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import footerLogosIndex from '../../../../assets/logos/footerLogosIndex'

import './footerLogo.css'

const FooterLogo = () => {

  const history = useHistory()

  const onClickFunctions = () => {
    requestAnimationFrame(() => { requestAnimationFrame(() => { document.body.scrollTo({ behavior: "smooth", top: 0 }) }) })
    if (history.location.pathname !== routes.home) history.push( routes.home )
  }

  const footerLogoButton = makeFooterLogoButton(footerLogosIndex, onClickFunctions, routes.home)

  return (
    <DefaultButtonsContainer
      buttons={ footerLogoButton }
      containerClass={ 'footer_logo_container' }
      enableButton={ true }
    />
  )
}

export default FooterLogo
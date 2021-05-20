import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from '../../../../utility/paths.js'

import makeFooterLinkButtons from '../../footerFunctions/makeFooterLinkButtons'

import DefaultButtonsContainer from '../../../buttons/defaultButtonsContainer/defaultButtonsContainer'

const FooterLinks = () => {

  const history = useHistory()

  const onPushLink = (event) => {
    document.body.scrollTop = 0
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    history.push(buttonParams.route)
  }

  const footerLinkButtons = makeFooterLinkButtons(onPushLink, routes)

  return(
    <DefaultButtonsContainer
      buttons={ footerLinkButtons }
      buttonClass={ 'footer_link' }
      buttonContainerClass={ 'footer_link_container' }
      containerClass={ 'footer_links_container' }
      enableButton={ true }
    />
  )
}

export default FooterLinks
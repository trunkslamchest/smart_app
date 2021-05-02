import React from 'react'

import { routes } from '../../../../utility/paths.js'

import makeFooterLinkButtons from '../footerFunctions/makeFooterLinkButtons'

import DefaultButtonsContainer from '../../../buttons/defaultButtonsContainer/defaultButtonsContainer'

const FooterLinks = (props) => {

  const footerLinkButtons = makeFooterLinkButtons(routes)

  return(
    <DefaultButtonsContainer
      buttons={ footerLinkButtons }
      buttonClass={ 'footer_link' }
      buttonContainerClass={ 'footer_link_container' }
      containerClass={ 'footer_links_container' }
      enableButton={ true }
      history={ props.history }
    />
  )
}

export default FooterLinks
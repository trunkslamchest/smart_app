import React from 'react'

import './footerLinkButton.css'

const FooterLinkButton = (props) => {
  return(
    <a
      href={ props.route }
      rel="noopener noreferrer"
      target="_blank"
    >
      <button
        id={ props.id }
        className='footer_link_button'
        name={ props.name }
      >
        { props.text }
      </button>
    </a>
  )
}

export default FooterLinkButton
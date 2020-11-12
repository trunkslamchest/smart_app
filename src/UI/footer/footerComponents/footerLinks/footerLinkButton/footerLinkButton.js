import React from 'react'

import './footerLinkButton.css'

const FooterLinkButton = (props) => {

  // const onClickFunction = () => { props.history.push(props.route) }

  return(
    <button
      id={ props.id }
      className='footer_link_button'
      name={ props.name }
      // onClick={ onClickFunction }
    >
      <a
        href={ props.route }
        rel="noopener noreferrer"
        target="_blank"
      >
        { props.text }
      </a>
    </button>
  )
}

export default FooterLinkButton
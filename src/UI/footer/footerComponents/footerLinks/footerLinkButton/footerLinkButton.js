import React from 'react'

import './footerLinkButton.css'

const FooterLinkButton = (props) => {

  const onClickFunction = () => { props.onClickFunction(props.route) }

  return(
    <button
      id={ props.id }
      className='footer_link_button'
      name={ props.name }
      onClick={ onClickFunction }
    >
      { props.text }
    </button>
  )
}

export default FooterLinkButton
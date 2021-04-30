import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

import './footerLogo.css'

const FooterLogo = (props) => {

  const [hoverState, setHoverState] = useState(false);
  const location = useLocation()

  const switchHoverState = (bool) => { setHoverState(bool) }

  const onHover = () => { switchHoverState(true) }
  const offHover = () => { switchHoverState(false) }

  const onClickFunctions = () => {
    document.body.scrollTop = 0
    if (location.pathname !== props.route) props.history.push( props.route )
  }

  return (
    <div className='footer_logo_container'>
      <a
        href={ props.auth.status !== 'authValid' ? props.route : undefined }
        rel='noopener noreferrer'
        // target='_blank'
        onMouseEnter={ onHover }
        onMouseLeave={ offHover }
        onClick={ props.auth.status === 'authValid' ? onClickFunctions : null }
      >
        <img
          alt='footer_logo'
          name='footerLogo'
          src={ hoverState ? props.logoHover : props.logo }
        />
      </a>
    </div>
  )
}

const store = (store) => {
  return {
    auth: store.auth
  }
}

export default connect(store)(FooterLogo)
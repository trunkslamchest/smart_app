import React from 'react'
import { useState } from 'react'

const FooterCreditLogo = (props) => {

  const [hoverState, setHoverState] = useState(false)

  const onHover = () => { setHoverState(true) }
  const offHover = () => { setHoverState(false) }

  return(
    <a
      href={ props.route }
      rel='noopener noreferrer'
      target='_blank'
      onMouseEnter={ onHover }
      onMouseLeave={ offHover }
    >
      <img
        alt={ props.alt }
        className='footer_credit_logo_rectangle'
        name={ props.name }
        src={ hoverState ? props.imageHover : props.image }
      />
    </a>
  )
}

export default FooterCreditLogo
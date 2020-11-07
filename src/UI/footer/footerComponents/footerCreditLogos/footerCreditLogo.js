import React from 'react'

const FooterCreditLogo = (props) => {
  return(
    <a
      href={ props.link }
      rel='noopener noreferrer'
      target='_blank'
    >
      { props.children }
    </a>
  )
}

export default FooterCreditLogo
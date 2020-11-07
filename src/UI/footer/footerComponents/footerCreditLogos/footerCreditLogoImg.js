import React from 'react'

const FooterCreditLogoImg = (props) => {
  return(
    <img
      alt={ props.alt }
      className='footer_credit_logo_rectangle'
      name={ props.name }
      src={ props.image }
    />
  )
}

export default FooterCreditLogoImg
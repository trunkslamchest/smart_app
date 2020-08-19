import React from 'react'

const FooterLogoImg = (props) => {
  return(
    <img
      alt={props.alt}
      className='footer_logo_rectangle'
      name={props.name}
      src={props.image}
    />
  )
}

export default FooterLogoImg
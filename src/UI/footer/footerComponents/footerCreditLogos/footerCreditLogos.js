import React from 'react'

import makeFooterCreditLogos from '../../footerFunctions/makeFooterCreditLogos'
import FooterCreditLogo from './footerCreditLogo'
import footerCreditLogosIndex from '../../../../assets/footer/footerCreditLogosIndex'

import './footerCreditLogos.css'

const FooterCreditLogos = () => {

  const footerCreditLogos = makeFooterCreditLogos(footerCreditLogosIndex)

  const distribFooterCreditLogos = footerCreditLogos.map((logo, index) => {
    return(
      <FooterCreditLogo
        alt={ logo.alt }
        id={ logo.id }
        image={ logo.image }
        imageHover={ logo.imageHover }
        key={ index }
        name={ logo.name }
        route={ logo.route }
      />
    )
  })

  return(
    <div className='footer_credit_logos'>
      { distribFooterCreditLogos }
    </div>
  )
}

export default FooterCreditLogos
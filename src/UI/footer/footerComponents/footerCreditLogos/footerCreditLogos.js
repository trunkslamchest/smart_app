import React from 'react'

import FooterCreditLogo from './footerCreditLogo'
import FooterCreditLogoImg from './footerCreditLogoImg'

import footerCreditLogosIndex from '../../../../assets/footer/footerCreditLogosIndex'

import './footerCreditLogos.css'

const FooterCreditLogos = (props) => {

  const footerCreditLogos = [
    { id: 'firebase_logo_rectangle', name: 'Firebase', alt: 'FirebaseLogo', image: footerCreditLogosIndex.firebaseLogoRectangle , link: 'https://firebase.google.com/' },
    { id: 'flatiron_logo_rectangle', name: 'Flatiron', alt: 'TheFlatironSchoolLogo', image: footerCreditLogosIndex.flatironLogoRectangle , link: 'https://flatironschool.com/' },
    { id: 'github_logo_rectangle', name: 'Github', alt: 'GithubLogo', image: footerCreditLogosIndex.githubLogoRectangle , link: 'https://github.com/trunkslamchest/smart_app' },
    { id: 'hvh_logo_rectangle', name: 'HudsonValleyHost', alt: 'HudsonValleyHostLogo', image: footerCreditLogosIndex.hvhLogoRectangle , link: 'https://hudsonvalleyhost.com/' },
    { id: 'otb_logo_rectangle', name: 'OpenTriviaDatabase', alt: 'OpenTriviaDatabaseLogo', image: footerCreditLogosIndex.otbLogoRectangle , link: 'https://opentdb.com/' },
    { id: 'react_logo_rectangle', name: 'React', alt: 'ReactLogo', image: footerCreditLogosIndex.reactLogoRectangle , link: 'https://reactjs.org/' }
  ]

  const distribFooterCreditLogos = footerCreditLogos.map((logo, index) => {
    return(
      <FooterCreditLogo
        key={ index }
        link={ logo.link }
      >
        <FooterCreditLogoImg
          alt={ logo.alt }
          id={ logo.id }
          name={ logo.name }
          image={ logo.image }
        />
      </FooterCreditLogo>
    )
  })

  return(
    <div className='footer_credit_logos'>
      { distribFooterCreditLogos }
    </div>
  )
}

export default FooterCreditLogos
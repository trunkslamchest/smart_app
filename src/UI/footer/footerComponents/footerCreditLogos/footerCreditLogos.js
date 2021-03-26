import React from 'react'

import FooterCreditLogo from './footerCreditLogo'

import footerCreditLogosIndex from '../../../../assets/footer/footerCreditLogosIndex'

import './footerCreditLogos.css'

const FooterCreditLogos = (props) => {

  const footerCreditLogos = [
    // { id: 'firebase_logo_rectangle', name: 'Firebase', alt: 'FirebaseLogo', image: footerCreditLogosIndex.firebaseLogoRectangle, imageHover: footerCreditLogosIndex.firebaseLogoRectangleHover, route: 'https://firebase.google.com/' },
    { id: 'flatiron_logo_rectangle', name: 'Flatiron', alt: 'TheFlatironSchoolLogo', image: footerCreditLogosIndex.flatironLogoRectangle, imageHover: footerCreditLogosIndex.flatironLogoRectangleHover, route: 'https://flatironschool.com/' },
    { id: 'github_logo_rectangle', name: 'Github', alt: 'GithubLogo', image: footerCreditLogosIndex.githubLogoRectangle, imageHover: footerCreditLogosIndex.githubLogoRectangleHover, route: 'https://github.com/trunkslamchest/smart_app' },
    { id: 'hvh_logo_rectangle', name: 'HudsonValleyHost', alt: 'HudsonValleyHostLogo', image: footerCreditLogosIndex.hvhLogoRectangle, imageHover: footerCreditLogosIndex.hvhLogoRectangleHover, route: 'https://hudsonvalleyhost.com/' },
    { id: 'otb_logo_rectangle', name: 'OpenTriviaDatabase', alt: 'OpenTriviaDatabaseLogo', image: footerCreditLogosIndex.otbLogoRectangle, imageHover: footerCreditLogosIndex.otbLogoRectangleHover, route: 'https://opentdb.com/' },
    // { id: 'react_logo_rectangle', name: 'React', alt: 'ReactLogo', image: footerCreditLogosIndex.reactLogoRectangle, imageHover: footerCreditLogosIndex.reactLogoRectangleHover, route: 'https://reactjs.org/' }
  ]

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
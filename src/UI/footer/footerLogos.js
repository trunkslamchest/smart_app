import React from 'react'

import FooterLogo from './footerLogo'
import FooterLogoImg from './footerLogoImg'

import './footerLogos.css'

import flatiron_logo from '../../assets/footer_logo_flatiron.png'
import postgres_logo from '../../assets/footer_logo_postgres.png'
import rails_logo from '../../assets/footer_logo_rails.png'
import react_logo from '../../assets/footer_logo_react.png'

const FooterLogos = (props) => {
  return(
    <div className='footer_logos'>
      <FooterLogo link='https://flatironschool.com/'>
        <FooterLogoImg
          alt='The Flatiron School'
          image={flatiron_logo}
          name='footer_flatiron_logo'
        />
      </FooterLogo>
      <FooterLogo link='https://www.postgresql.org/'>
        <FooterLogoImg
          alt='PostgreSQL'
          image={postgres_logo}
          name='footer_postgres_logo'
        />
      </FooterLogo>
      <FooterLogo link='https://rubyonrails.org/'>
        <FooterLogoImg
          alt='Ruby On Rails'
          image={rails_logo}
          name='footer_rails_logo'
        />
      </FooterLogo>
      <FooterLogo link='https://reactjs.org/'>
        <FooterLogoImg
          alt='React'
          image={react_logo}
          name='footer_react_logo'
        />
      </FooterLogo>
    </div>
  )
}

export default FooterLogos
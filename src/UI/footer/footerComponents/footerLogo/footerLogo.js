import React from 'react'

import './footerLogo.css'

class FooterLogo extends React.Component {

  state={ hover: false }

  onHover = () => { this.setState({ hover: true }) }
  offHover = () => { this.setState({ hover: false }) }
  pushRoute = () => { this.props.history.push( this.props.route ) }

  render() {
    return (
      <div className='footer_logo_container'>
        <img
          onClick={ this.pushRoute }
          onMouseEnter={ this.onHover }
          onMouseLeave={ this.offHover }
          alt='footer_logo'
          name='footerLogo'
          src={ !this.state.hover ? this.props.logo : this.props.logoHover }
        />
      </div>
    )
  }
}

export default FooterLogo
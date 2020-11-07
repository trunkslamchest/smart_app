import React from 'react'

class FooterCreditLogo extends React.Component {

  state={ hover: false }

  onHover = () => { this.setState({ hover: true }) }
  offHover = () => { this.setState({ hover: false }) }

  render() {
    return(
      <a
        href={ this.props.route }
        rel='noopener noreferrer'
        target='_blank'
        onMouseEnter={ this.onHover }
        onMouseLeave={ this.offHover }
      >
        <img
          alt={ this.props.alt }
          className='footer_credit_logo_rectangle'
          name={ this.props.name }
          src={ !this.state.hover ? this.props.image : this.props.imageHover }
        />
      </a>
    )
  }
}

export default FooterCreditLogo
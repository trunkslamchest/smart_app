import React from 'react'
import { NavLink } from 'react-router-dom'

import './headerButton.css'

class HeaderButton extends React.Component {

  state = { hover: false }

  onHover = () => { this.setState({ hover: true }) }

  offHover = () => { this.setState({ hover: false }) }

  onPushLink = () => {  this.props.history.push( this.props.route ) }

  render() {
    return(
      <button
        exact to={ this.props.link }
        className={ this.props.buttonClass }
        name={ this.props.name }
      >
        <img
          alt={ this.props.id }
          className={ this.props.iconClass }
          id={ this.props.id }
          name={ this.props.name }
          src={ this.state.hover ? props.iconHover : props.icon }
        />
      </button>
    )
  }
}

export default HeaderButton
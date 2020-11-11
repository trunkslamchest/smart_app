import React from 'react'

import ModalButtonTooltip from '../../../../UI/tooltips/modalButtonTooltip/modalButtonTooltip'


import './dashboardDeleteProfileButton.css'

class DashboardDeleteProfileButton extends React.Component {

  state = { hover: false, tooltip: false }

  componentWillUnmount(){
    this.setState({ hover: false, tooltip: false })
    clearTimeout(this.toolTipTimeout)
  }

  onHover = () => {
    this.setState({ hover: true })
    this.toolTipTimeout = setTimeout(() => { this.setState({ tooltip: true })}, 250)
  }

  offHover = () => {
    this.setState({ hover: false, tooltip: false })
    clearTimeout(this.toolTipTimeout)
  }

  onClickFunction = (event) => {
    event.preventDefault()

    if(this.props.enableButton){
      event.persist()
      this.props.onClickFunction(event)
    }
  }

  render() {
    return(
      <div className='delete_profile_button_container'
        onMouseEnter={ this.onHover }
        onMouseLeave={ this.offHover }
      >
        <button
          type={ this.props.type }
          id={ this.props.id }
          name={ this.props.name }
          className={ this.props.enableButton ? 'delete_profile_button' : "delete_profile_button_disabled" }
          onClick={ this.onClickFunction }
        >
          <img
            alt={ this.props.id }
            id={ `${this.props.id}_image` }
            name={ `${this.props.name}Image` }
            src={ this.state.hover ? this.props.imageHover : this.props.image }
          />
        </button>
        {
          this.props.tooltipText &&
          this.state.hover &&
          this.state.tooltip &&
          this.props.enableButton &&
            <ModalButtonTooltip
              offHover={ this.offHover }
              tooltipText={ this.props.tooltipText }
            />
        }
      </div>
    )
  }
}

export default DashboardDeleteProfileButton
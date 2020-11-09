import React from 'react'

import ModalButtonTooltip from '../../../../UI/tooltips/modalButtonTooltip/modalButtonTooltip'

import './logInFormButton.css'

class LogInFormButton extends React.Component {

  state = { hover: false, tooltip: false }

  componentDidUpdate() {
    // if(!this.props.pageLimit && this.state.showTooltip) this.setState({ showTooltip: false })
    // if(!this.props.pageLimit && this.state.hover) this.setState({ hover: false })
  }

  componentWillUnmount(){
    this.setState({ hover: false, tooltip: false })
    // clearTimeout(this.toolTipTimeout)
  }

  onHover = () => {
    this.setState({ hover: true })
    this.toolTipTimeout = setTimeout(() => { this.setState({ tooltip: true })}, 250)
  }

  offHover = () => {
    this.setState({ hover: false, tooltip: false })
    // clearTimeout(this.toolTipTimeout)
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
      <div className='log_in_form_button_container'
        onMouseEnter={ this.onHover }
        onMouseLeave={ this.offHover }
      >
        <button
          type={ this.props.type }
          id={ this.props.id }
          name={ this.props.name }
          className={ this.props.enableButton ? 'log_in_form_button' : "log_in_form_button_disabled" }
          onClick={ this.onClickFunction }
          // value={ this.props.value }
          // value={ buttonImage }
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
            <ModalButtonTooltip
              offHover={ this.offHover }
              tooltipText={ this.props.tooltipText }
            />
        }
      </div>
    )
  }
}

export default LogInFormButton
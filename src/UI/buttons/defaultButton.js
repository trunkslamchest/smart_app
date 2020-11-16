import React from 'react'
import { NavLink } from 'react-router-dom'

import DefaultButtonTooltip from '../tooltips/defaultButtonTooltip'

import './buttonStyles/addCommentButton.css'
import './buttonStyles/catButton.css'
import './buttonStyles/containerProfileHeaderButton.css'
import './buttonStyles/completedButton.css'
import './buttonStyles/dashboardProfileHeaderButton.css'
import './buttonStyles/dashboardStatsViewQuestionButton.css'
import './buttonStyles/defaultButton.css'
import './buttonStyles/diffButton.css'
import './buttonStyles/editCommentButton.css'
import './buttonStyles/editCommentFormButton.css'
import './buttonStyles/gameModesButton.css'
import './buttonStyles/navBarButton.css'
import './buttonStyles/nextQuestionButton.css'
import './buttonStyles/questionCardChoiceButton.css'

class DefaultButton extends React.Component {

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

    let buttonType

    let buttonContent =
      <>
        { !!this.props.text && <span params={ this.props.params }>{ this.props.text }</span> }
        { !!this.props.imageHover &&
          <img
            alt={ this.props.id }
            id={ `${this.props.id}_image` }
            name={ `${this.props.name}Image` }
            params={ this.props.params }
            src={ this.state.hover ? this.props.imageHover : this.props.image }
          />
        }
      </>

    if(this.props.type === 'NavLink') {
      buttonType =
        <NavLink
          activeClassName={ `${this.props.buttonClass}_active` }
          className={ this.props.enableButton ? this.props.buttonClass : `${this.props.buttonClass}_disabled` }
          id={ this.props.id }
          name={ this.props.name }
          params={ this.props.params }
          to={ this.props.route }
          type={ this.props.type }
        >
          { buttonContent }
        </NavLink>
    } else {
      buttonType =
        <button
          className={ this.props.enableButton ? this.props.buttonClass : `${this.props.buttonClass}_disabled` }
          id={ this.props.id }
          name={ this.props.name }
          params={ this.props.params }
          onClick={ this.onClickFunction }
          type={ this.props.type }
        >
          { buttonContent }
        </button>
    }

    return(
      <div className='default_button_container'
        onMouseEnter={ this.onHover }
        onMouseLeave={ this.offHover }
      >
        { buttonType }
        {
          this.props.tooltipText &&
          this.state.hover &&
          this.state.tooltip &&
            <DefaultButtonTooltip
              offHover={ this.offHover }
              tooltipText={ this.props.tooltipText }
              tooltipClass={ this.props.tooltipClass }
            />
        }
      </div>
    )
  }
}

export default DefaultButton

// this.props.enableButton
// this.props.buttonClass
// this.props.id
// this.props.name
// this.props.params
// this.props.onClickFunction
// this.props.type
// this.props.text
// this.props.image
// this.props.imageHover
// this.props.tooltipText
// this.props.tooltipClass

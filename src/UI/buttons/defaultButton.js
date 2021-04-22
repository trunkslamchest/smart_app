import React from 'react'
import { NavLink } from 'react-router-dom'

import DefaultMenu from '../menus/defaultMenu'
import DefaultButtonTooltip from '../tooltips/defaultButtonTooltip'

import './buttonStyles/addCommentButton.css'
import './buttonStyles/catButton.css'
import './buttonStyles/containerProfileHeaderButton.css'
import './buttonStyles/completedButton.css'
import './buttonStyles/dashboardFormButton.css'
import './buttonStyles/dashboardProfileHeaderButton.css'
import './buttonStyles/dashboardStatsViewQuestionButton.css'
import './buttonStyles/defaultButton.css'
import './buttonStyles/diffButton.css'
import './buttonStyles/editCommentButton.css'
import './buttonStyles/editCommentFormButton.css'
import './buttonStyles/gameModesButton.css'
import './buttonStyles/headerButton.css'
import './buttonStyles/headerHomeButton.css'
import './buttonStyles/headerMenuButton.css'
import './buttonStyles/headerProfileButton.css'
import './buttonStyles/homeButton.css'
import './buttonStyles/homeStartButton.css'
import './buttonStyles/homeLoggedInButton.css'
import './buttonStyles/navBarButton.css'
import './buttonStyles/nextQuestionButton.css'
import './buttonStyles/menuButton.css'
import './buttonStyles/modalButton.css'
import './buttonStyles/modalHelpButton.css'
import './buttonStyles/questionCardChoiceButton.css'

class DefaultButton extends React.Component {

  state = { hover: false, menu: false, tooltip: false }

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
    event.persist()
    this.setState({ tooltip: false })
    if(this.props.enableButton){
      if(!!this.props.onSwitchMenu){
        this.props.offHover()
        this.props.onSwitchMenu()
      }
      if(this.props.buttonType === 'menu'){
        let switchMenu = !this.state.menu
        this.setState({ menu: switchMenu })
      }
      if(!!this.props.onClickFunction){ this.props.onClickFunction(event) }
    }
  }

  onSwitchMenu = () => {
    let switchMenu = !this.state.menu
    this.setState({ menu: switchMenu })
  }

  render() {

    let buttonType
    let buttonClass
    let buttonContent =
      <>
        { !!this.props.text && <span params={ this.props.params }>{ this.props.text }</span> }
        { !!this.props.imageHover &&
          <img
            alt={ this.props.id }
            id={ `${this.props.id}_image` }
            name={ `${this.props.name}Image` }
            params={ this.props.params }
            src={ this.state.hover || this.state.menu || this.props.location === this.props.route ? this.props.imageHover : this.props.image }
          />
        }
      </>

    if(this.props.enableButton)
      if(this.state.hover || this.state.menu) buttonClass = `${this.props.buttonClass}_active`
      else buttonClass = this.props.buttonClass
    else buttonClass = `${this.props.buttonClass}_disabled`

    if(this.props.type === 'NavLink') {
      buttonType =
        <NavLink
          activeClassName={ `${this.props.buttonClass}_active` }
          className={ buttonClass }
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
          className={ buttonClass }
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
      <div
        className={ this.props.buttonContainerClass || 'default_button_container' }
        onMouseEnter={ this.onHover }
        onMouseLeave={ this.offHover }
      >
        { buttonType }
        {
          this.props.tooltipText &&
          this.state.hover &&
          !this.state.menu &&
          this.state.tooltip &&
            <DefaultButtonTooltip
              tooltipText={ this.props.tooltipText }
              tooltipClass={ this.props.tooltipClass }
            />
        }
        { this.state.menu &&
          <DefaultMenu
            menuButtons={ this.props.menuButtons }
            menuClass={ 'header_menu' }
            offHover={ this.offHover }
            onSwitchMenu={ this.onSwitchMenu }
          />
        }
      </div>
    )
  }
}

export default DefaultButton

// <DefaultButton
//   enableButton={  }
//   buttonClass={  }
//   id={  }
//   image={  }
//   imageHover={  }
//   name={  }
//   onClickFunction={  }
//   params={  }
//   text={  }
//   tooltipText={  }
//   tooltipClass={  }
//   type={  }
// />


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

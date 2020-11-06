import React from 'react'

import IconButtonTooltip from '../../tooltips/iconButtonTooltip/iconButtonTooltip'
import HeaderMenu from '../../menus/headerMenu/headerMenu'

import './headerIconButton.css'

class HeaderIconButton extends React.Component {

  state = { hover: false, showMenu: false, showTooltip: false }

  componentWillUnmount(){ clearTimeout(this.toolTipTimeout) }

  onHover = () => {
    this.setState({ hover: true })
    this.toolTipTimeout = setTimeout(() => { this.setState({ showTooltip: true })}, 250)
  }

  offHover = () => { this.setState({ hover: false, showTooltip: false }) }

  pushLink = () => {  this.props.history.push( this.props.route ) }

  onSwitchMenu = () => {
    let switchMenu = !this.state.showMenu
    this.setState({ showMenu: switchMenu })
  }

  splitFunction = () => {
    if(!this.state.showMenu){
      switch(this.props.buttonType){
        case 'link': return this.pushLink();
        case 'menu': return this.onSwitchMenu();
        default: return 'meh'
      }
    }
  }

  render() {
    return(
      <div className='header_icon_button_container'>
        <button
          className={ this.props.classType }
          name={ this.props.name }
          onClick={ this.splitFunction }
          onMouseEnter={ this.onHover }
          onMouseLeave={ this.offHover }
        >
          <img
            alt={ this.props.id }
            className={ this.props.iconClass }
            id={ this.props.id }
            name={ this.props.name }
            src={ this.state.hover ? this.props.iconHover : this.props.icon }
          />
        </button>
        { this.state.showMenu &&
          <HeaderMenu
            menuButtons={ this.props.menuButtons }
            showMenu={ this.state.showMenu }
            onClearGame={ this.props.onClearGame }
            onSwitchMenu={ this.onSwitchMenu }
          />
        }
        { this.state.hover && this.state.showTooltip && !this.state.showMenu &&
          <IconButtonTooltip
            hoverClear={ this.offHover }
            showTooltip={ this.state.showTooltip }
            tooltipText={ this.props.tooltipText }
          />
        }
      </div>
    )
  }
}

export default HeaderIconButton
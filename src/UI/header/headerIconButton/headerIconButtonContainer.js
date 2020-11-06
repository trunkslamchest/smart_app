import React from 'react'

import IconButtonTooltip from '../../tooltips/iconButtonTooltip/iconButtonTooltip'
import HeaderIconButton from './headerIconButton'
import HeaderMenu from '../../menus/headerMenu/headerMenu'

import './headerIconButtonContainer.css'

class HeaderIconButtonContainer extends React.Component {

  state = { hover: false, showMenu: false, showTooltip: false }

  componentWillUnmount(){ clearTimeout(this.toolTipTimeout) }

  onHover = () => {
    this.setState({ hover: true })
    this.toolTipTimeout = setTimeout(() => { this.setState({ showTooltip: true })}, 250)
  }

  offHover = () => { this.setState({ hover: false, showTooltip: false }) }

  onPushLink = () => {  this.props.history.push( this.props.route ) }

  onClickFunction = (event) => {
    if(this.props.args) this.props.clickFunction(event, this.props.args)
    else this.props.clickFunction(event)
  }

  onSwitchMenu = () => {
    let switchMenu = !this.state.showMenu
    this.setState({ showMenu: switchMenu })
  }

  splitFunction = (event) => {
    if(!this.state.showMenu){
      switch(this.props.buttonType){
        case 'link': return this.onPushLink();
        case 'menu': return this.onSwitchMenu();
        case 'modal': return this.onClickFunction(event);
        default: return 'meh'
      }
    }
  }

  render() {
    return(
      <div className='header_icon_button_container'>
        <HeaderIconButton
          buttonClass={ this.props.buttonClass }
          iconClass={ this.props.iconClass }
          icon={ this.props.icon }
          iconHover={ this.props.iconHover }
          hover={ this.state.hover }
          id={ this.props.id }
          name={ this.props.name }
          clickFunction={ this.splitFunction }
          onHover={ this.onHover }
          offHover={ this.offHover }
        />
        { this.state.showMenu &&
          <HeaderMenu
            menuButtons={ this.props.menuButtons }
            showMenu={ this.state.showMenu }
            clickFunction={ this.props.clickFunction }
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

export default HeaderIconButtonContainer
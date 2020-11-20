import React from 'react'

import DefaultButtonsContainer from '../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './menuStyles/defaultMenu.css'
import './menuStyles/headerMenu.css'

class DefaultMenu extends React.Component {

  constructor(props) {
    super(props)
    this.setMenuRef = this.setMenuRef.bind(this)
  }

  componentDidMount() { document.addEventListener('click', this.onMouseClick) }
  componentWillUnmount() { document.removeEventListener('click', this.onMouseClick) }
  setMenuRef(node){this.menuRef = node}
  onMouseClick = (event) => { if(this.menuRef && !this.menuRef.contains(event.target)) this.props.onSwitchMenu() }

  render() {
    return(
      <div
        className={ `${this.props.menuClass}_container` || "menu_container" }
        ref={ this.setMenuRef }
      >
        <div className={ `${this.props.menuClass}_wrapper` || "menu_wrapper" } >
          <DefaultButtonsContainer
            buttons={ this.props.menuButtons }
            containerClass={ 'header_menu_buttons_container' }
            enableButton={ true }
            offHover={ this.props.offHover }
            onSwitchMenu={ this.props.onSwitchMenu }
          />
        </div>
      </div>
    )
  }
}

export default (DefaultMenu)
import React from 'react'

import HeaderMenuButton from './headerMenuButton'

import './headerMenu.css'
import './headerMenuButton.css'
import './headerMenuButton2.scss'

class HeaderMenu extends React.Component {

  constructor(props) {
    super(props)
    this.setMenuRef = this.setMenuRef.bind(this)
  }

  componentDidMount() { document.addEventListener('click', this.onMouseClick) }
  componentWillUnmount() { document.removeEventListener('click', this.onMouseClick) }
  setMenuRef(node){this.menuRef = node}
  onMouseClick = (event) => { if(this.menuRef && !this.menuRef.contains(event.target)) this.props.onSwitchMenu() }

  render() {
    const distribMenuButtons = this.props.menuButtons.map((button, index) => {
      return (
        <HeaderMenuButton
          args={ button.args }
          key={ index }
          link={ button.route }
          name={ button.name }
          clickFunction={ button.clickFunction }
          onSwitchMenu={ this.props.onSwitchMenu }
        >
          { button.text }
        </HeaderMenuButton>
      )
    })

    return(
      <div className="header_menu_container" ref={ this.setMenuRef } >
        { distribMenuButtons }
      </div>
    )
  }
}

export default (HeaderMenu)
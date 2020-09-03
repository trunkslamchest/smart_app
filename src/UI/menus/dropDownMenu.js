import React from 'react'

export default class DropDownMenu extends React.Component {

  constructor(props) {
    super(props)
    this.setMenuRef = this.setMenuRef.bind(this)
  }

  componentDidMount() {
  document.addEventListener('mousedown', this.onMouseClick)
  }

  setMenuRef(node){this.menuRef = node}

  onMouseClick = (event) => {
    // console.log(this.props.menu)
    // console.log(this.menuRef.attributes.menu.value)
    // console.log(event.target.attributes.menu.value)
    // if (this.menuRef && !this.menuRef.contains(event.target) && event.target.className !== 'header_button2' ) this.props.switchMenu()
    if (this.menuRef && !this.menuRef.contains(event.target) && !event.target.attributes.menu ) this.props.switchMenu()
  }

  componentWillUnmount() { document.removeEventListener('mousedown', this.onMouseClick) }

  render(){
    return(
      <div
        className={this.props.divClass}
        menu={this.props.menu}
        ref={this.setMenuRef}
      >
        <ul>
          {this.props.children}
        </ul>
      </div>
    )
  }
}
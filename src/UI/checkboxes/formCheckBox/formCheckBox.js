import React from 'react'

import './formCheckBoxSettings.css'
import './formCheckBoxTOS.css'

class FormCheckBox extends React.Component {

  state={ hover: false }

  onHover = () => { this.setState({ hover: true }) }
  offHover = () => { this.setState({ hover: false }) }

  disabledClickFunctions = (event) => { event.preventDefault() }

  render() {

    let checkmark, xMark

    if(this.props.disabled) {
      checkmark = this.props.checkedImage
      xMark = this.props.uncheckedImage
    } else {
      if(this.state.hover) {
        checkmark = this.props.checkedImageHover
        xMark = this.props.uncheckedImageHover
      } else {
        checkmark = this.props.checkedImage
        xMark = this.props.uncheckedImage
      }
    }

    return(
        <button
          id={ this.props.id }
          className={ this.props.checkBoxClass }
          name={ this.props.name }
          onClick={ this.props.disabled ? this.disabledClickFunctions : this.props.onChecked }
          onMouseEnter={ this.onHover }
          onMouseLeave={ this.offHover }
        >
          { this.props.status ?
            <img
              alt={ 'checked' }
              name={ this.props.name }
              src={ checkmark }
              title={ this.props.name }
            />
          :
            <img
              alt={ 'not checked' }
              name={ this.props.name }
              src={ xMark }
              title={ this.props.name }
            />
          }
        </button>
    )
  }
}

export default FormCheckBox

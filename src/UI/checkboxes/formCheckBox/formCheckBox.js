import React from 'react'

import './formCheckBoxSettings.css'
import './formCheckBoxTOS.css'

class FormCheckBox extends React.Component {

  state={ hover: false }

  onHover = () => { this.setState({ hover: true }) }
  offHover = () => { this.setState({ hover: false }) }

  render() {
    return(
        <button
          id={ this.props.id }
          className={ this.props.checkBoxClass }
          name={ this.props.name }
          onClick={ this.props.onChecked }
          onMouseEnter={ this.onHover }
          onMouseLeave={ this.offHover }
        >
          { this.props.status ?
            <img
              alt={ 'checked' }
              name={ this.props.name }
              src={ this.state.hover ? this.props.checkedImageHover : this.props.checkedImage }
              title={ this.props.name }
            />
          :
            <img
              alt={ 'not checked' }
              name={ this.props.name }
              src={ this.state.hover ? this.props.uncheckedImageHover : this.props.uncheckedImage }
              title={ this.props.name }
            />
          }
        </button>
    )
  }
}

export default FormCheckBox

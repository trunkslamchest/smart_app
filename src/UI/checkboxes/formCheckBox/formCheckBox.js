import React from 'react'

import glyphIndex from '../../../assets/glyphs/glyphIndex'

import './formCheckBox.css'

class FormCheckBox extends React.Component {

  state={ hover: false }

  onHover = () => { this.setState({ hover: true }) }
  offHover = () => { this.setState({ hover: false }) }

  render() {
    return(
        <button
          id={ this.props.id }
          className='form_check_box_button'
          name={ this.props.name }
          onClick={ this.props.onChecked }
          onMouseEnter={ this.onHover }
          onMouseLeave={ this.offHover }
        >
          { this.props.status ?
            <img
              alt={ 'checked' }
              name={ this.props.name }
              src={ this.state.hover ? glyphIndex.formOrangeCheckMark : glyphIndex.formWhiteCheckMark }
              title={ this.props.name }
            />
          :
            <img
              alt={ 'not checked' }
              name={ this.props.name }
              src={ this.state.hover ? glyphIndex.formOrangeX : glyphIndex.formWhiteX }
              title={ this.props.name }
            />
          }
        </button>
    )
  }
}

export default FormCheckBox

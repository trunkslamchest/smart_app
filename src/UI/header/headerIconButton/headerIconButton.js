import React from 'react'

import './headerIconButton.css'

const HeaderIconButton = (props) => {
  return(
    <button
      className={ props.buttonClass }
      name={ props.name }
      onClick={ props.clickFunction }
      onMouseEnter={ props.onHover }
      onMouseLeave={ props.offHover }
    >
      <img
        alt={ props.id }
        className={ props.iconClass }
        id={ props.id }
        name={ props.name }
        src={ props.hover ? props.iconHover : props.icon }
      />
    </button>
  )
}

export default HeaderIconButton
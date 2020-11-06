import React from 'react'

import './iconButtonTooltip.css'

const IconButtonTooltip = (props) => {
  return(
    <div
      className='icon_button_tooltip_container'
      // onMouseEnter={ props.hoverClear }
    >
      <div className='icon_button_tooltip_wrapper'>
        <div className='icon_button_tooltop_arrow'></div>
        <span>{ props.tooltipText }</span>
      </div>
    </div>
  )
}

export default IconButtonTooltip
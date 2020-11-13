import React from 'react'

import '../tooltipStyles/iconButtonTooltip.css'

const IconButtonTooltip = (props) => {
  return(
    <div className='icon_button_tooltip_container'>
      <div className='icon_button_tooltip_wrapper'>
        <div className='icon_button_tooltop_arrow'></div>
        <span>{ props.tooltipText }</span>
      </div>
    </div>
  )
}

export default IconButtonTooltip
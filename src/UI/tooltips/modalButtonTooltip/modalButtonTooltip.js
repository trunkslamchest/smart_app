import React from 'react'

import '../tooltipStyles/modalButtonTooltip.css'

const ModalButtonTooltip = (props) => {
  return(
    <div className='modal_button_tooltip_container' >
      <div
        className='modal_button_tooltip_wrapper'
        onMouseEnter={ props.offHover }
      >
        <div className='modal_button_tooltop_arrow'></div>
        <span>{ props.tooltipText }</span>
      </div>
    </div>
  )
}

export default ModalButtonTooltip
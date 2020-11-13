import React from 'react'

import './defaultButtonTooltip.css'

const DefaultButtonTooltip = (props) => {
  return(
    <div className='default_button_tooltip_container'>
      <div className='default_button_tooltip_wrapper'>
        <div className='default_button_tooltop_arrow'></div>
        <div className='default_button_tooltip_text'>
          { props.tooltipText.map((tooltip, index) => { return <span key={ index }>{ tooltip }</span> })}
        </div>
      </div>
    </div>
  )
}

export default DefaultButtonTooltip
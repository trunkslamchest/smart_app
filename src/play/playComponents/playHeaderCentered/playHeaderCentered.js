import React from 'react'

import './playHeaderCentered.css'

const PlayHeaderCentered = (props) => {

  return(
    <div className='play_header_centered_container'>
      <div className='play_header_centered_text_container'>
        <h1>{ !!props.header_text && props.header_text }</h1>
        { !!props.sub_text && <span>{ props.sub_text }</span> }
      </div>
    </div>
  )
}

export default PlayHeaderCentered
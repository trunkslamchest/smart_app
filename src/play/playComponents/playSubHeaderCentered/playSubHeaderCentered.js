import React from 'react'

import './playSubHeaderCentered.css'
import './playSubHeaderCenteredResponse.css'

const PlaySubHeaderCentered = (props) => {

  return(
    <div className='play_sub_header_centered_container'>
      <div className='play_sub_header_centered_text_container'>
        <h1>{ !!props.header_text && props.header_text }</h1>
      </div>
    </div>
  )
}

export default PlaySubHeaderCentered
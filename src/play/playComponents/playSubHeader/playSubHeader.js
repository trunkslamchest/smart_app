import React from 'react'

import './playSubHeader.css'

const PlaySubHeader = (props) => {

  return(
    <div className='play_sub_header_container'>
      <div className='play_sub_header_container_left'>
        <h1>{ !!props.header_text && props.header_text }</h1>
      </div>
        { !!props.sub_text &&
          <div className='play_sub_header_container_right'>
            <span>{ props.sub_text }</span>
          </div>
        }
    </div>
  )
}

export default PlaySubHeader
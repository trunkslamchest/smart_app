import React from 'react'

import './playHeader.css'

const PlayHeader = (props) => {

  return(
    <div className='play_header_container'>
      <div className='play_header_container_left'>
        <span>{ !!props.header_text && props.header_text }</span>
      </div>
        { !!props.sub_text &&
          <div className='play_header_container_right'>
            <span>{ props.sub_text }</span>
          </div>
        }
    </div>
  )
}

export default PlayHeader
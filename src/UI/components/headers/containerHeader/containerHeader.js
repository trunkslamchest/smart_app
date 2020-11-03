import React from 'react'

import './containerHeader.css'

const ContainerHeader = (props) => {

  return(
    <div className='container_header'>
      <div className='container_header_left'>
        { !!props.header_text && props.header_text }
      </div>
        <div className='container_header_right'>
          { !!props.sub_text && props.sub_text }
        </div>
    </div>
  )
}

export default ContainerHeader
import React from 'react'

import './docsSubHeader.css'

const DocsSubHeader = (props) => {

  return(
    <div className='docs_sub_header'>
      <div className='docs_sub_header_left'>
        <h4>{ !!props.sub_header_text && props.sub_header_text }</h4>
      </div>
        <div className='docs_sub_header_right'>
          <h5>{ !!props.sub_text && props.sub_text }</h5>
        </div>
    </div>
  )
}

export default DocsSubHeader
import React from 'react'

import './docsThirdHeader.css'

const DocsThirdHeader = (props) => {

  return(
    <div className='docs_third_header'>
      <div className='docs_third_header_left'>
        <h4>{ !!props.header_text && props.header_text }</h4>
      </div>
        <div className='docs_third_header_right'>
          <h5>{ !!props.sub_text && props.sub_text }</h5>
        </div>
    </div>
  )
}

export default DocsThirdHeader
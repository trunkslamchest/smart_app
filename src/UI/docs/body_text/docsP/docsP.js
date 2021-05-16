import React from 'react'

import DocsThirdHeader from '../../headers/docsThirdHeader/docsThirdHeader'

import './docsP.css'

const docsP = (props) => {
  return(
    <div className='docs_p'>
      { !!props.header && <DocsThirdHeader header_text={ props.header } /> }
      { !!props.texts && props.texts.map((text, index) => { return <p key={ index }>{ text }</p> }) }
    </div>
  )
}

export default docsP
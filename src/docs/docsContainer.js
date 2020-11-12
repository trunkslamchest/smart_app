import React from 'react'

import DocsHeader from '../UI/docs/headers/docsHeader/docsHeader'
import DocsSubHeader from '../UI/docs/headers/docsSubHeader/docsSubHeader'
import DocsP from '../UI/docs/body_text/docsP/docsP'
// import DocsSpan from '../UI/docs/body_text/docsSpan/docsSpan'
import DocsUL from '../UI/docs/body_text/docsUL/docsUL'

import './docs.css'

const DocsContainer = (props) => {

  const distribDocsSections = props.sections.map((section, s_index) => {
    return(
      <div
        className='terms_sub_wrapper'
        key={ s_index }
      >
        { !!section.sub_header_text && <DocsSubHeader sub_header_text={ section.sub_header_text } /> }
        { !!section.lists && section.lists.map((list, l_index) => {
            return(
              <DocsUL
                key={ l_index }
                list_header={ list.list_header }
                list_items={ list.list_items }
              />
            )
          }) }
        { !!section.p_texts && section.p_texts.map((p_text, p_index) => {
            return(
              <DocsP
                key={ p_index }
                header={ p_text.header }
                texts={ p_text.texts }
              />
            )
          }) }
      </div>
    )
  })

  return(
    <div className='terms_wrapper'>
      <DocsHeader header_text={ props.header_text } sub_text={ props.sub_text } />
      { distribDocsSections }
    </div>
  )
}

export default DocsContainer

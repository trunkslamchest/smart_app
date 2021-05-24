import React from 'react'

import DocsHeader from '../UI/docs/headers/docsHeader/docsHeader'
import DocsSubHeader from '../UI/docs/headers/docsSubHeader/docsSubHeader'
import DocsP from '../UI/docs/body_text/docsP/docsP'
import DocsUL from '../UI/docs/body_text/docsUL/docsUL'

import './docs.css'

const DocsContainer = (props) => {

  const distribDocsSections = props.sections.map((section, s_index) => {
    return(
    <div className='docs_sub_container' key={ s_index }>
      <div className='docs_sub_wrapper'  >
        { !!section.sub_header_text && <DocsSubHeader sub_header_text={ section.sub_header_text } /> }
        { !!section.lists && section.lists.map((list, l_index) => {  return <DocsUL key={ l_index } list_header={ list.list_header }  list_items={ list.list_items } /> }) }
        { !!section.p_texts && section.p_texts.map((p_text, p_index) => { return <DocsP key={ p_index }  header={ p_text.header }  texts={ p_text.texts }  /> }) }
      </div>
      <div className='divider_left' />
    </div>
    )
  })

  return(
    <div className='docs_wrapper'>
      <DocsHeader header_text={ props.header_text } sub_text={ props.sub_text } />
      { distribDocsSections }
    </div>
  )
}

export default DocsContainer

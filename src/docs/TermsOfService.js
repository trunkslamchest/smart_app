import React, { useEffect } from 'react'

import DocsHeader from '../UI/docs/headers/docsHeader/docsHeader'
import DocsSubHeader from '../UI/docs/headers/docsSubHeader/docsSubHeader'
import DocsP from '../UI/docs/body_text/docsP/docsP'
// import DocsSpan from '../UI/docs/body_text/docsSpan/docsSpan'
import DocsUL from '../UI/docs/body_text/docsUL/docsUL'

import makeTOSsections from './docsFunctions/makeTOSsections'

import * as lists from './docsFunctions/tosLists'

import './docs.css'

const TermsOfService = () => {

  useEffect(() => { document.title = "SmartApp™ | Terms Of Service" }, [])

  let docsSections = makeTOSsections(lists)

  const distribDocsSections = docsSections.map((section, s_index) => {
    return(
      <div
        className='terms_sub_wrapper'
        key={ s_index }
      >
        <DocsSubHeader sub_header_text={ section.sub_header_text } />
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
      <DocsHeader header_text='TERMS OF SERVICE' sub_text='Last Updated: 11/12/2020' />
      { distribDocsSections }
    </div>
  )
}

export default TermsOfService

import React from 'react'
import { useEffect } from 'react'

import tosSections from './tosSections'
import DocsContainer from '../docsContainer'

const TermsOfService = () => {

  useEffect(() => { document.title = "SmartApp™ | Terms Of Service" }, [])

  return(
    <DocsContainer
      sections={ tosSections }
      header_text={ 'TERMS OF SERVICE' }
      sub_text={ 'Last Updated: 11/12/2020' }
    />
  )
}

export default TermsOfService
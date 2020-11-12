import React, { useEffect } from 'react'

import disclaimerSections from './disclaimerSections'
import DocsContainer from '../docsContainer'

const Disclaimer = () => {

  useEffect(() => { document.title = "SmartApp™ | Disclaimer" }, [])

  return(
    <DocsContainer
      sections={ disclaimerSections }
      header_text={ 'DISCLAIMER' }
      sub_text={ 'Last Updated: 11/12/2020' }
    />
  )
}

export default Disclaimer
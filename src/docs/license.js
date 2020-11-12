import React, { useEffect } from 'react'

import licenseSections from './docsFunctions/licenseSections'
import DocsContainer from './docsContainer'

const License = () => {

  useEffect(() => { document.title = "SmartApp™ | License" }, [])

  return(
    <DocsContainer
      sections={ licenseSections }
      header_text={ 'License' }
      sub_text={ 'Last Updated: 11/12/2020' }
    />
  )
}

export default License
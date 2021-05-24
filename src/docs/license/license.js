import React from 'react'
import { useEffect } from 'react'

import licenseSections from './licenseSections'
import DocsContainer from '../docsContainer'

const License = () => {

  useEffect(() => { document.title = "SmartApp™ | License" }, [])

  return(
    <DocsContainer
      sections={ licenseSections }
      header_text={ 'LICENSE' }
      sub_text={ 'Last Updated: 11/12/2020' }
    />
  )
}

export default License
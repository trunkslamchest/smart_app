import React, { useEffect } from 'react'

import makeTOSsections from './docsFunctions/makeTOSsections'
import DocsContainer from './docsContainer'

const TermsOfService = () => {

  useEffect(() => { document.title = "SmartApp™ | Terms Of Service" }, [])

  let docsSections = makeTOSsections()

  return(
    <DocsContainer
      sections={ docsSections }
      header_text={ 'TERMS OF SERVICE' }
      sub_text={ 'Last Updated: 11/12/2020' }
    />
  )
}

export default TermsOfService
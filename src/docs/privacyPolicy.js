import React, { useEffect } from 'react'

import makePrivacySections from './docsFunctions/makePrivacySections'
import DocsContainer from './docsContainer'

const PrivacyPolicy = () => {

  useEffect(() => { document.title = "SmartApp™ | Privacy Policy" }, [])

  let docsSections = makePrivacySections()

  return(
    <DocsContainer
      sections={ docsSections }
      header_text={ 'PRIVACY POLICY' }
      sub_text={ 'Last Updated: 11/12/2020' }
    />
  )
}

export default PrivacyPolicy
import React from 'react'
import { useEffect } from 'react'

import privacySections from './privacySections'
import DocsContainer from '../docsContainer'

const PrivacyPolicy = () => {

  useEffect(() => { document.title = "SmartApp™ | Privacy Policy" }, [])

  return(
    <DocsContainer
      sections={ privacySections }
      header_text={ 'PRIVACY POLICY' }
      sub_text={ 'Last Updated: 11/12/2020' }
    />
  )
}

export default PrivacyPolicy
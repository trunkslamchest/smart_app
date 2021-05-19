import React from 'react'

import MakeHomeLoggedOutTechIcons from '../../homeFunctions/makeHomeLoggedOutTechIcons'

import './homeTech.css'
import './homeTechResponse.css'

const HomeTech = () => {
  return(
    <div className='home_logged_out_tech_container'>
      <MakeHomeLoggedOutTechIcons />
    </div>
  )
}

export default React.memo(HomeTech)
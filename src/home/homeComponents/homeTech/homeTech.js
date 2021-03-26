import React from 'react'

import MakeHomeLoggedOutTechIcons from '../../homeFunctions/makeHomeLoggedOutTechIcons'

import './homeTech.css'

const HomeTech = (props) => {
  return(
    <>
      <div className='home_logged_out_tech_container'>
        {/* <div className='home_logged_out_tech_bar_container'>
          <div className='home_logged_out_tech_bar'></div>
        </div> */}
        <MakeHomeLoggedOutTechIcons />
      </div>
    </>
  )
}

export default HomeTech
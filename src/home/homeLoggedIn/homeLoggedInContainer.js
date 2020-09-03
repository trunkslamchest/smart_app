import React from 'react'
// import { useEffect, useCallback } from 'react'

import HomeLoggedInPlayButtonsContainer from './homeLoggedInPlayButtonsContainer'

import index_logo from '../../assets/index_logo_blue3.png'

const HomeLoggedInContainer = (props) => {
  return(
    <>
      <div className="logo_container">
        <img src={index_logo} alt={"logo"}/>
      </div>
      <HomeLoggedInPlayButtonsContainer />
    </>
  )
}

export default HomeLoggedInContainer
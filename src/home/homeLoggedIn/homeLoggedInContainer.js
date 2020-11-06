import React from 'react'

import HomeLoggedInPlayButtonsContainer from './homeLoggedInPlayButtonsContainer/homeLoggedInPlayButtonsContainer'

import './homeLoggedIn.css'

const HomeLoggedInContainer = (props) => {
  return(
    <>
      <div className="logo_container">
        <img src={ props.indexLogo } alt={ "logo" }/>
      </div>
      <HomeLoggedInPlayButtonsContainer />
    </>
  )
}

export default HomeLoggedInContainer
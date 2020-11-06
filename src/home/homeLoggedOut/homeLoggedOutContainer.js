import React from 'react'

import HomeLoggedOutAuthButtonsContainer from './homeLoggedOutAuthButtonsContainer/homeLoggedOutAuthButtonsContainer'

import './homeLoggedOut.css'

const HomeLoggedOutContainer = (props) => {
  return(
    <>
      <div className="logo_container">
        <img src={ props.indexLogo } alt={ "logo" }/>
      </div>
      <HomeLoggedOutAuthButtonsContainer />
    </>
  )
}

export default HomeLoggedOutContainer
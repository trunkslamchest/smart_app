import React from 'react'

import HomeLoggedOutAuthButtonsContainer from './homeLoggedOutAuthButtonsContainer/homeLoggedOutAuthButtonsContainer'

import index_logo from '../../assets/index_logo_blue3.png'

import './homeLoggedOut.css'

const HomeLoggedOutContainer = (props) => {
  return(
    <>
      <div className="logo_container">
        <img src={index_logo} alt={"logo"}/>
      </div>
      <HomeLoggedOutAuthButtonsContainer />
    </>
  )
}

export default HomeLoggedOutContainer
import React from 'react'

// import { useEffect } from 'react'

import HomeLoggedInContainer from './homeLoggedIn/homeLoggedInContainer'
import HomeLoggedOutContainer from './homeLoggedOut/homeLoggedOutContainer'

import './Home.css'

const HomeContainer = (props) => {
  return(
    <div className='default_wrapper'>
      {localStorage.access === 'guest' ?
          <HomeLoggedOutContainer
            history={props.history}
          />
        :
          <HomeLoggedInContainer />
      }
    </div>
  )
}

export default HomeContainer
import React from 'react'

// import { useEffect } from 'react'

import HomeLoginSignup from './homeLoginSignup'
import HomeLoggedIn from './homeLoggedIn'

import './Home.css'

const Home = (props) => {
  return(
    <div className='default_wrapper'>
      {localStorage.access === 'guest' ?
          <HomeLoginSignup
            history={props.history}
            setToken={props.setToken}
            updateLogin={props.updateLogin}
          />
        :
          <HomeLoggedIn />
      }
    </div>
  )
}

export default Home
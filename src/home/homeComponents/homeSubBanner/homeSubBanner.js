import React from 'react'

import './homeSubBanner.css'

const HomeSubBanner = (props) => {

  return(
    <div className='home_logged_out_sub_banner'>
      <div className='home_logged_out_tagline_container'>
        <h1>
          SmartApp™ is for people who love trivia and love to test their knowledge
        </h1>
        <h2>
          Answer Questions. Unlock Achievements. Improve Your Rank. Climb The Leaderboards.
        </h2>
        <h3>
          Get Smart
        </h3>
      </div>
    </div>
  )
}

export default HomeSubBanner
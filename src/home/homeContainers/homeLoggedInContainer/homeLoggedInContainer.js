import React from 'react'
import { connect } from 'react-redux'

import HomeBanner from '../../homeComponents/homeBanner/homeBanner'
import HomeGreeting from '../../homeComponents/homeGreeting/homeGreeting'
import HomeLoggedInSections from '../../homeComponents/homeLoggedInSections/homeLoggedInSections'
import HomeSubBanner from '../../homeComponents/homeSubBanner/homeSubBanner'
import HomeTech from '../../homeComponents/homeTech/homeTech'

import './homeLoggedInContainer.css'

const HomeLoggedInContainer = (props) => {
  return(
    <div className='home_logged_in_wrapper'>
      <HomeBanner />
      <div className='divider_medium'></div>
      <HomeGreeting user_name={ props.user.info.user_name } />
      <HomeLoggedInSections history={props.history} />
      <div className='divider_medium'></div>
      <HomeSubBanner history={props.history} />
      <div className='divider_medium'></div>
      <HomeTech history={ props.history } />
      <div className='divider_medium'></div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    // play: state.play,
    user: state.user
  }
}

export default connect(mapStateToProps)(HomeLoggedInContainer)

    // <div className='home_logged_in_wrapper'>
    //   <div className='home_logged_in_top_container'>

    //     <HomeLogoContainer />
    //     <div className='home_logged_in_top_right_container'>

    //     <DefaultButtonsContainer
    //       buttons={ homeButtons }
    //       buttonClass={ 'home_start_button' }
    //       containerClass={ 'home_buttons_container' }
    //       enableButton={ true }
    //       // tooltipClass={  }
    //     />
    //     </div>
    //   </div>
    // </div>
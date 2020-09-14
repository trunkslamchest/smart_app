import React from 'react'

import { connect } from 'react-redux'

import HomeLoggedInContainer from './homeLoggedIn/homeLoggedInContainer'
import HomeLoggedOutContainer from './homeLoggedOut/homeLoggedOutContainer'

import LoadingSpinnerRoller from '../UI/loading/spinner/roller'

import './Home.css'

const HomeContainer = (props) => {

  let homePage = <LoadingSpinnerRoller />

  if(!props.auth.valid && !props.auth.loading) homePage = <HomeLoggedOutContainer history={props.history} />
  if(props.auth.valid) homePage = <HomeLoggedInContainer />

  return(
    <div className='default_wrapper'>
      { homePage }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(HomeContainer)
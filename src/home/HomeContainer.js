import React from 'react'

import { connect } from 'react-redux'

// import { useEffect } from 'react'

import HomeLoggedInContainer from './homeLoggedIn/homeLoggedInContainer'
import HomeLoggedOutContainer from './homeLoggedOut/homeLoggedOutContainer'

// import index_logo from '../assets/index_logo_blue3.png'

import LoadingSpinnerRoller from '../UI/loading/spinner/roller'

import './Home.css'

const HomeContainer = (props) => {

  let homePage = <LoadingSpinnerRoller />

  // if(!props.auth.valid) homePage = <HomeLoggedOutContainer history={props.history} />
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
    auth: state.auth,
    modal: state.modal,
    logIn: state.logIn,
    play: state.play,
    questions: state.questions,
    signUp: state.signUp,
    user: state.user
  }
}

export default connect(mapStateToProps)(HomeContainer)
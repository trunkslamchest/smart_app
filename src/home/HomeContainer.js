import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'

import HomeLoggedInContainer from './homeContainers/homeLoggedInContainer/homeLoggedInContainer'
import HomeLoggedOutContainer from './homeContainers/homeLoggedOutContainer/homeLoggedOutContainer'

import './HomeContainer.css'

const HomeContainer = (props) => {

  useEffect(() => {
    document.title = "SmartApp™ | Get Your Smart On"
  }, [])

  let homePage = <></>

  if(props.auth.status === 'authValid') {
    homePage = <HomeLoggedInContainer user_name={ !!props.user.info ? props.user.info.user_name : null } />
  } else {
    homePage = <HomeLoggedOutContainer />
  }

  return <>{ (!props.auth.loading && !props.modal.loading) && homePage }</>
}

const store = store => {
  return {
    auth: store.auth,
    modal: store.modal,
    user: store.user
  }
}

export default connect(store)(HomeContainer)

import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'

import HomeLoggedInContainer from './homeContainers/homeLoggedInContainer/homeLoggedInContainer'
import HomeLoggedOutContainer from './homeContainers/homeLoggedOutContainer/homeLoggedOutContainer'

const HomeContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Get Your Smart On" }, [])

  let homePage = <></>

  if(props.authStatus === 'authValid') homePage = <HomeLoggedInContainer user_name={ props.userName } />
  else homePage = <HomeLoggedOutContainer />

  return !props.showModal && homePage
}

const store = store => {
  return {
    authStatus: store.auth.status,
    showModal: store.modal.showModal,
    userName: store.user.info ? store.user.info.user_name : null
  }
}

export default connect(store)(HomeContainer)

import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import HomeLoggedInContainer from './homeContainers/homeLoggedInContainer/homeLoggedInContainer'
import HomeLoggedOutContainer from './homeContainers/homeLoggedOutContainer/homeLoggedOutContainer'

import './HomeContainer.css'

const HomeContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Get Your Smart On" }, [])

  let homePage

  if(props.auth.status === 'authValid' && !props.auth.loading && !props.modal.loading) {
    homePage = <HomeLoggedInContainer history={ props.history } user_name={ props.user.info.user_name } />
  } else {
    homePage = <HomeLoggedOutContainer history={ props.history } />
  }

  return(<>{ homePage }</>)
}

const store = (store) => {
  return {
    auth: store.auth,
    modal: store.modal,
    user: store.user
  }
}

// export default connect(store)(HomeContainer)

export default connect(store)(React.memo(HomeContainer, (props, nextProps) => {
  // console.log(props, nextProps)
  if(
      props.modal.loading || !nextProps.modal.loading ||
      props.auth.loading || !nextProps.auth.loading
    ) return true
  else return false
}))

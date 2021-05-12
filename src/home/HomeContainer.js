import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import HomeLoggedInContainer from './homeContainers/homeLoggedInContainer/homeLoggedInContainer'
import HomeLoggedOutContainer from './homeContainers/homeLoggedOutContainer/homeLoggedOutContainer'

import './HomeContainer.css'

const HomeContainer = (props) => {

  useEffect(() => { document.title = "SmartApp™ | Get Your Smart On" }, [])

  let homePage

  // if(!props.auth.loading || !props.modal.loading) {
    if(props.auth.status === 'authValid') {
      homePage = <HomeLoggedInContainer history={ props.history } user_name={ props.user.info.user_name } />
    } else {
      homePage = <HomeLoggedOutContainer history={ props.history } />
    }
  // }

  return(<>{ (!props.auth.loading && !props.modal.loading) && homePage }</>)
}

const store = (store) => {
  return {
    auth: store.auth,
    modal: store.modal,
    user: store.user
  }
}

export default connect(store)(HomeContainer)

// export default connect(mapStateToProps)(React.memo(HomeContainer, (props, nextProps) => {
//   if(!nextProps.modal.loading) return true
//   else return false
// }))

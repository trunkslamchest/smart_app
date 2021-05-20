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

  let homePage

  if(props.auth.status === 'authValid') {
    homePage = <HomeLoggedInContainer user_name={ !!props.user.info ? props.user.info.user_name : null } />
  } else {
    homePage = <HomeLoggedOutContainer />
  }


  return <>{ (!props.auth.loading && !props.modal.loading) && homePage }</>
  // return <HomeLoggedOutContainer />
}

const store = store => {
  return {
    auth: store.auth,
    modal: store.modal,
    user: store.user
  }
}

// export default HomeContainer

// export default React.memo(HomeContainer)

// export default connect(store)(HomeContainer)

export default React.memo(connect(store)(HomeContainer))


// export default React.memo(HomeContainer, (prevProps, nextProps) => {
//   // console.log(prevProps)
//   if(prevProps.authLoading !== nextProps.authLoading) {
//     return true
//   }
//   else return false
// })

// export default connect(store)(React.memo(HomeContainer, (prevProps, nextProps) => {
//   if(prevProps.authLoading !== nextProps.authLoading) {
//     return true
//   }
//   else return false
// }))
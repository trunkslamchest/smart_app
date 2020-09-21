import React from 'react'

import { connect } from 'react-redux'

import { loadingBarClassSwitch } from './barFunctions/loadingBarClassSwitch'
import { loadingBarTextSwitch } from './barFunctions/loadingBarTextSwitch'


import './baseDynamicBar.css'

const BaseDynamicBar = (props) => {

  // let loadingBarClass = 'loading_bar_0'

  // console.log(loadingBarClassSwitch)

  let loadingBarClass = loadingBarClassSwitch(props.barType, props.auth.status)

  let loadingText = loadingBarTextSwitch(props.barType, props.auth.status)

  return(
    <div className="dyanmic_bar_container">
      <div className="loading_bar_container">
        <div className={ loadingBarClass }></div>
      </div>
      <div className="loading_text">
        <p>{ loadingText }</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    user: state.user,
    questions: state.questions
  }
}

export default connect(mapStateToProps)(BaseDynamicBar)
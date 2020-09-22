import React from 'react'

import { connect } from 'react-redux'

import { loadingBarClassSwitch } from './barFunctions/loadingBarClassSwitch'
import { loadingBarTextSwitch } from './barFunctions/loadingBarTextSwitch'

import './baseDynamicBar.css'

const BaseDynamicBar = (props) => {
  return(
    <div className="dyanmic_bar_container">
      <div className="loading_bar_container">
        <div className={ loadingBarClassSwitch(props.barType, props.auth.status) }></div>
      </div>
      <div className="loading_text">
        <p>{ loadingBarTextSwitch(props.barType, props.auth.status) }</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(BaseDynamicBar)
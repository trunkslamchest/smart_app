import React from 'react'

import { connect } from 'react-redux'

import { loadingBarClassSwitch } from './barFunctions/loadingBarClassSwitch'
import { loadingBarTextSwitch } from './barFunctions/loadingBarTextSwitch'

import './baseDynamicBar.css'

const BaseDynamicBar = (props) => {

  let loadStatus

  if(props.modalType === 'auth') loadStatus = props.auth.status
  if(props.modalType === 'play') loadStatus = props.play.status
  if(props.modalType === 'questionVote') loadStatus = props.play.voteStatus
  if(props.modalType === 'questionComment') loadStatus = props.play.commentStatus

  // console.log(loadStatus)

  return(
    <div className="dyanmic_bar_container">
      <div className="loading_bar_container">
        <div className={ loadingBarClassSwitch(props.barType, loadStatus) }></div>
      </div>
      <div className="loading_text">
        <p>{ loadingBarTextSwitch(props.barType, loadStatus) }</p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    play: state.play
  }
}

export default connect(mapStateToProps)(BaseDynamicBar)
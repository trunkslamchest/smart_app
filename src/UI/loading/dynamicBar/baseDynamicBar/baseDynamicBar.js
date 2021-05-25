import React from 'react'

import { connect } from 'react-redux'

import { loadingBarClassSwitch } from './barFunctions/loadingBarClassSwitch'
import { loadingBarTextSwitch } from './barFunctions/loadingBarTextSwitch'

import './baseDynamicBar.css'

const BaseDynamicBar = (props) => {
  let loadStatus
  let barType = props.barType || props.authType

  if(props.modalType === 'auth') loadStatus = props.authStatus
  if(props.modalType === 'play') loadStatus = props.playStatus
  if(props.modalType === 'leaderBoards') loadStatus = props.leaderboardStatus
  if(props.modalType === 'userProfile') loadStatus = props.profileStatus


  if(props.modalType === 'questionVote') loadStatus = props.voteStatus
  if(props.modalType === 'questionComment') loadStatus = props.commentStatus || props.staticCommentStatus

  return(
    <div className="dyanmic_bar_container">
      <div className="loading_bar_container">
        <div className={ loadingBarClassSwitch(barType, loadStatus) }></div>
      </div>
      <div className="loading_text">
        <p>{ loadingBarTextSwitch(barType, loadStatus) }</p>
      </div>
    </div>
  )
}

const store = store => {
  return {
    authType: store.auth.authType,
    authStatus: store.auth.status,
    leaderboardStatus: store.leaderBoards.status,
    playStatus: store.play.status,
    voteStatus: store.play.voteStatus,
    commentStatus: store.play.commentStatus,
    staticCommentStatus: store.questions.commentStatus,
    profileStatus: store.profile.status
  }
}

export default connect(store)(BaseDynamicBar)
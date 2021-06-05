import React from 'react'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { loadingBarClassSwitch } from './barFunctions/loadingBarClassSwitch'
import { loadingBarTextSwitch } from './barFunctions/loadingBarTextSwitch'

import './baseDynamicBar.css'

const BaseDynamicBar = (props) => {

  const [loadStatus, setLoadStatus] = useState(null)

  const {
    authStatus,
    leaderboardsStatus,
    commentStatus,
    modalType,
    playStatus,
    profileStatus,
    questionStatus,
    staticCommentStatus,
    staticVoteStatus,
    voteStatus
  } = props

  // console.log(props)

  let barType = props.barType || props.authType

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if(modalType === 'auth') setLoadStatus(authStatus)
        if(modalType === 'leaderBoards') setLoadStatus(leaderboardsStatus)
        if(modalType === 'play') setLoadStatus(playStatus)
        if(modalType === 'staticQuestion') setLoadStatus(questionStatus)
        if(modalType === 'questionVote') setLoadStatus(voteStatus || staticVoteStatus)
        if(modalType === 'questionComment') setLoadStatus(commentStatus || staticCommentStatus)
        if(modalType === 'userProfile') setLoadStatus(profileStatus)
      })
    })
  }, [
    authStatus,
    commentStatus,
    leaderboardsStatus,
    modalType,
    playStatus,
    profileStatus,
    questionStatus,
    staticCommentStatus,
    staticVoteStatus,
    voteStatus
  ])

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
    commentStatus: store.play.commentStatus,
    leaderboardsStatus: store.leaderBoards.status,
    playStatus: store.play.status,
    profileStatus: store.profile.status,
    staticCommentStatus: store.questions.commentStatus,
    staticVoteStatus: store.questions.voteStatus,
    voteStatus: store.play.voteStatus,
    questionStatus: store.questions.status
  }
}

export default connect(store)(BaseDynamicBar)
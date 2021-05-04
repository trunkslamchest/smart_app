import React from 'react'

import { connect } from 'react-redux'

import { loadingBarClassSwitch } from './barFunctions/loadingBarClassSwitch'
import { loadingBarTextSwitch } from './barFunctions/loadingBarTextSwitch'

import './baseDynamicBar.css'

const BaseDynamicBar = (props) => {

  // shouldComponentUpdate(nextProps, nextState){
  //   if(
  //     (!!this.props.barType || !!this.props.auth.authType) &&
  //     (!!nextProps.barType || !!nextProps.auth.authType)

  //   ) {
  //     // console.log(this.props.barType, nextProps.auth.authType)

  //     return true
  //   }
  //   else return false
  // }

  // console.log(this.props.modalType, this.props.barType)
  // console.log(this.props.modalType, this.props.leaderBoards.status)
  // console.log(this.props.barType, this.props.questions.commentStatus)
  // console.log('modalType', this.props.modalType)

  let loadStatus
  let barType = props.barType || props.auth.authType

  if(props.modalType === 'auth') loadStatus = props.auth.status
  if(props.modalType === 'play') loadStatus = props.play.status
  if(props.modalType === 'leaderBoards') loadStatus = props.leaderBoards.status
  if(props.modalType === 'userProfile') loadStatus = props.profile.status


  if(props.modalType === 'questionVote') loadStatus = props.play.voteStatus
  if(props.modalType === 'questionComment') loadStatus = props.play.commentStatus || props.questions.commentStatus

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
    auth: store.auth,
    leaderBoards: store.leaderBoards,
    play: store.play,
    profile: store.profile,
    questions: store.questions
  }
}

export default connect(store)(BaseDynamicBar)
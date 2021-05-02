import React from 'react'

import { connect } from 'react-redux'

import { loadingBarClassSwitch } from './barFunctions/loadingBarClassSwitch'
import { loadingBarTextSwitch } from './barFunctions/loadingBarTextSwitch'

import './baseDynamicBar.css'

class BaseDynamicBar extends React.Component {

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

  render() {

  // console.log(this.props.modalType, this.props.barType)
  // console.log(this.props.modalType, this.props.leaderBoards.status)
  // console.log(this.props.barType, this.props.questions.commentStatus)
  // console.log('modalType', this.props.modalType)

    let loadStatus
    let barType = this.props.barType || this.props.auth.authType

    if(this.props.modalType === 'auth') loadStatus = this.props.auth.status
    if(this.props.modalType === 'play') loadStatus = this.props.play.status
    if(this.props.modalType === 'leaderBoards') loadStatus = this.props.leaderBoards.status
    if(this.props.modalType === 'userProfile') loadStatus = this.props.profile.status


    if(this.props.modalType === 'questionVote') loadStatus = this.props.play.voteStatus
    if(this.props.modalType === 'questionComment') loadStatus = this.props.play.commentStatus || this.props.questions.commentStatus

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
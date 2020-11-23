import React from 'react'

import { connect } from 'react-redux'

import { loadingBarClassSwitch } from './barFunctions/loadingBarClassSwitch'
import { loadingBarTextSwitch } from './barFunctions/loadingBarTextSwitch'

import './baseDynamicBar.css'

class BaseDynamicBar extends React.Component {

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(nextProps)
  //   if(this.props.auth.status !== nextProps.auth.status) return true
  //   else return false
  // }

  // console.log(loadStatus)

  render() {

    let loadStatus

    if(this.props.modalType === 'auth') loadStatus = this.props.auth.status
    if(this.props.modalType === 'play') loadStatus = this.props.play.status
    if(this.props.modalType === 'questionVote') loadStatus = this.props.play.voteStatus
    if(this.props.modalType === 'questionComment') loadStatus = this.props.play.commentStatus

    return(
      <div className="dyanmic_bar_container">
        <div className="loading_bar_container">
          <div className={ loadingBarClassSwitch(this.props.barType, loadStatus) }></div>
        </div>
        <div className="loading_text">
          <p>{ loadingBarTextSwitch(this.props.barType, loadStatus) }</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    play: state.play
  }
}

export default connect(mapStateToProps)(BaseDynamicBar)
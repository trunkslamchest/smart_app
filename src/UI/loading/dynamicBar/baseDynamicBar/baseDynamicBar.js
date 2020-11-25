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

  // console.log(this.props.barType, this.props.auth.authType)

    let loadStatus, barType

    barType = this.props.barType || this.props.auth.authType

    if(this.props.modalType === 'auth') loadStatus = this.props.auth.status
    if(this.props.modalType === 'play') loadStatus = this.props.play.status
    if(this.props.modalType === 'questionVote') loadStatus = this.props.play.voteStatus
    if(this.props.modalType === 'questionComment') loadStatus = this.props.play.commentStatus

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

const mapStateToProps = state => {
  return {
    auth: state.auth,
    play: state.play
  }
}

export default connect(mapStateToProps)(BaseDynamicBar)
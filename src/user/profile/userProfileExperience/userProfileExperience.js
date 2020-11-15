import React from 'react'
import { connect } from 'react-redux'

import levels from '../../../datasets/levels'


import './userProfileExperience.css'

const UserProfileExperience = (props) => {

  const xpBar = () => {
    let currXP = props.experience.total, prevLevelXP = parseInt(levels[props.experience.level - 1])
    if(props.experience.level === 1) return currXP
    else return currXP - prevLevelXP
  }

  const xpBarClass = {
    border: "0px solid rgba(200, 200, 200, 1)",
    boxSizing: "border-box",
    background: "green",
    height: "10px",
    width: `${ xpBar() }%`
  }

  return(
    <div className="user_profile_experience_container">
      <div className="user_profile_experience_container_left">
        <h3>Level { props.experience.level }</h3>
      </div>
      <div className="user_profile_experience_bar_container">
        <div className="user_profile_experience_bar">
          <div style={ xpBarClass }></div>
        </div>
      </div>
      <div className="user_profile_experience_container_right">
        <h4>{ props.experience.total }</h4>/<h5>{ levels[props.experience.level] }</h5><h6>XP</h6>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(UserProfileExperience)
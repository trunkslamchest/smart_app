import React from 'react'
import { connect } from 'react-redux'

import './userProfileExperience.css'

const UserProfileExperience = (props) => {

  let experienceBlock = <></>

  if(!!props.profile.userData.experience){
    experienceBlock =
      <>
      <h3>Level { props.profile.userData.experience.level }</h3>
      <h4>{ props.profile.userData.experience.total }XP</h4>
      </>
  }

  return(
    <div className="user_profile_experience_container">
      { experienceBlock }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(UserProfileExperience)
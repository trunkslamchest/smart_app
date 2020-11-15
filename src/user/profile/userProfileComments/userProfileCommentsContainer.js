import React from 'react'
import { connect } from 'react-redux'

import ContainerHeaderCentered from '../../../UI/components/headers/containerHeaderCentered/containerHeaderCentered'

import './userProfileCommentsContainer.css'

const UserProfileCommentsContainer = (props) => {

  let commentBlock =
    <div className="user_profile_comments_sub_container">
      <span>comments_temp</span>
    </div>

  return(
    <div className="user_profile_stats_container">
      <ContainerHeaderCentered header_text={ 'Comments' } />
      { commentBlock }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(UserProfileCommentsContainer)

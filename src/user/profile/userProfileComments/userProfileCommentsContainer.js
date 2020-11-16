import React from 'react'
import { connect } from 'react-redux'

import ContainerHeaderCentered from '../../../UI/components/headers/containerHeaderCentered/containerHeaderCentered'
import UserProfileQuestionCard from './userProfileQuestionCard/userProfileQuestionCard'

import './userProfileCommentsContainer.css'

const UserProfileCommentsContainer = (props) => {

  const distribQuestions = props.questions.map((question, index) => {
    return(
      <UserProfileQuestionCard
        key={ index }
        question={ question }
      />
    )
  })


  // let commentBlock =
  //   <div className="user_profile_comments_sub_container">
  //     <span>comments_temp</span>
  //   </div>

  return(
    <div className="user_profile_comments_container">
      <ContainerHeaderCentered header_text={ 'Comments' } />
      {/* { commentBlock } */}
      { distribQuestions }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(UserProfileCommentsContainer)

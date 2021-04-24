import React from 'react'
import { connect } from 'react-redux'

import ContainerHeader from '../../../UI/components/headers/containerHeader/containerHeader'
import UserProfileQuestionCard from './userProfileQuestionCard/userProfileQuestionCard'

import './userProfileCommentsContainer.css'

const UserProfileCommentsContainer = (props) => {

  console.log(props)

  const distribQuestions = props.questions.map((question, index) => {
    return(
      <UserProfileQuestionCard
        key={ index }
        question={ question }
      />
    )
  })


  return(
    <div className="user_profile_comments_container">
      <ContainerHeader header_text={ 'Comments' } />
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

import React from 'react'

import ContainerHeader from '../../../UI/components/headers/containerHeader/containerHeader'
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

  return(
    <div className="user_profile_comments_container">
      <ContainerHeader header_text={ 'Comments' } />
      { distribQuestions }
    </div>
  )
}

export default UserProfileCommentsContainer

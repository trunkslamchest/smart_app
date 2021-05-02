import React from 'react'
import { connect } from 'react-redux'

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
      <div className='divider_left' />
      { distribQuestions }
    </div>
  )
}

const store = (store) => {
  return {
    profile: store.profile
  }
}

export default connect(store)(UserProfileCommentsContainer)

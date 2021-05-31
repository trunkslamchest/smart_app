import React from 'react'

import UserProfileCommentCard from '../userProfileCommentCard/userProfileCommentCard'

import'./userProfileQuestionCard.css'

const UserProfileQuestionCard = (props) => {

  const distribComments = Object.values(props.question.comments).map((comment, index) => {
    return(
      <UserProfileCommentCard
        key={ index }
        comment={ comment }
      />
    )
  })

  return(
    <div className='user_profile_question_card_container'>
        <span>{ props.question.question }</span>
        { distribComments }
    </div>
  )
}

export default UserProfileQuestionCard
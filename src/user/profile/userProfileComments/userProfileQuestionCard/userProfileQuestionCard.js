import React from 'react'

import UserProfileCommentCard from '../userProfileCommentCard/userProfileCommentCard'

import'./userProfileQuestionCard.css'

const UserProfileQuestionCard = (props) => {

  const questionComments = Object.values(props.question.comments)

  const distribComments = questionComments.map((comment, index) => {
    return(
      <UserProfileCommentCard
        key={ index }
        cardNumber={ index }
        comment={ comment }
        commentsLimit={ questionComments.length - 1 }
      />
    )
  })

  return(
    <div className='user_profile_question_card_container'>
        <h1>{ props.question.question }</h1>
        { distribComments }
    </div>
  )
}

export default UserProfileQuestionCard
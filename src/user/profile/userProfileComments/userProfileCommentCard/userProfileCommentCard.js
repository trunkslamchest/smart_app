import React from 'react'

import'./userProfileCommentCard.css'

const UserProfileCommentCard = (props) => {

  const componentClasses = {
    containerClass: props.cardNumber === props.commentsLimit ? 'user_profile_comment_container user_profile_comment_container_last' : 'user_profile_comment_container'
  }

  return(
    <div className={ componentClasses.containerClass }>
      <span>{ props.comment.comment }</span>
      <span>{ props.comment.timestamp }</span>
    </div>
  )
}

export default UserProfileCommentCard
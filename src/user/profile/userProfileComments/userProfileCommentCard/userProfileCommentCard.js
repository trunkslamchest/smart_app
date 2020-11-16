import React from 'react'

import'./userProfileCommentCard.css'

const UserProfileCommentCard = (props) => {
  return(
    <div className='user_profile_comment_card_container'>
      <span>{ props.comment.timestamp }</span>
      <span>{ props.comment.comment }</span>
    </div>
  )
}

export default UserProfileCommentCard
import React from 'react'

import './commentFormErrorItem.css'

const CommentFormErrorItem = (props) => {
  return(
    <div className='results_comment_error_item'>
      err{ props.error.code }: { props.error.msg }
    </div>
  )
}

export default CommentFormErrorItem
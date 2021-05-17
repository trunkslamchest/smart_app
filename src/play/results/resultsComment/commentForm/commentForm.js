import React from 'react'

import makeAddCommentButton from '../../resultsFunctions/makeAddCommentButton'
import CommentFormErrorItem from '../commentFormErrorItem/commentFormErrorItem'
import DefaultButtonsContainer from '../../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import './commentForm.css'

const commentForm = (props) => {

  let distribCommentErrors

  if(!props.commentForm.valid) {
    if(props.commentForm.errors){
      distribCommentErrors = props.commentForm.errors.map(error => {
        return <CommentFormErrorItem
          key={ props.commentForm.errors.indexOf(error) }
          error={ error }
        />
      })
    }
  }

  const addCommentButton = makeAddCommentButton(props.enableAddCommentButton, props.onAddComment)

  return(
    <form
      name="results_comment_form"
      className="results_comment_form"
      onSubmit={ props.onAddComment }
    >
      <textarea
        rows="3"
        id="results_add_comment"
        name="comment_text"
        placeholder="Your comment..."
        onChange={ props.onChangeComment }
        value={ props.comment }
      />
      <DefaultButtonsContainer
        buttons={ addCommentButton }
        containerClass='add_comment_button_container'
        enableButton={ props.enableAddCommentButton }
      />
      { !props.commentForm.valid && props.commentForm.errors.length && <div className='results_comment_error_container'>{ distribCommentErrors }</div> }
    </form>
  )
}

export default commentForm
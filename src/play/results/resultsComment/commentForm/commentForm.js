import React from 'react'

import CommentFormErrorItem from '../commentFormErrorItem/commentFormErrorItem'


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

  return(
    <form
      name="results_comment_form"
      interaction="submit"
      className="results_comment_form"
      onSubmit={ props.onAddComment }
    >
      <textarea
        rows="5"
        id="results_add_comment"
        name="comment_text"
        placeholder="Add A Comment..."
        onChange={ props.onChangeComment }
        value={ props.comment }
      />
      { !props.commentForm.valid && props.commentForm.errors.length ? <div className='results_comment_error_container'>{ distribCommentErrors }</div> : <br /> }
      <div className="results_comment_button_container">
        <input
          disabled={ !props.enableAddCommentButton }
          className={ props.enableAddCommentButton ? "results_comment_button" : "results_comment_button_disabled" }
          type="submit"
          value="Add Comment"
        />
      </div>
    </form>
  )
}

export default commentForm
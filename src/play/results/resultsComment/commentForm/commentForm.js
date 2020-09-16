import React from 'react'

import './commentForm.css'

const commentForm = (props) => {
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
      <div className="results_comment_button_container">
        <input
          type="submit"
          className="results_comment_button"
          value="Add Comment"
        />
      </div>
    </form>
  )
}

export default commentForm
import React from 'react'
import { connect } from 'react-redux'
import {
  deleteUserComment,
  deleteQuestionComment,
  editUserComment,
  editQuestionComment,
  updateCommentStatus
} from '../../../../store/actions/actionIndex'

import CommentFormErrorItem from '../commentFormErrorItem/commentFormErrorItem'

import validateComment from '../../../../utility/validation/validateComment'

import './commentCard.css'
import './editComment.css'

class commentCard extends React.Component {

    state = {
      editedComment: '',
      editCommentForm: { valid: true },
      showEditCommentForm: false,
      enableEditCommentButton: true
    }

  componentDidMount(){ this.setState({ editedComment: this.props.comment.comment }) }

  onEditComment = (event) => { this.setState({ editedComment: event.target.value }) }

  onAddEditedComment = (event) => {
    event.persist()
    event.preventDefault()

    let authCheck = validateComment(this.state.editedComment)
    this.setState({ editCommentForm: authCheck })

    if (authCheck.valid) {
      this.setState({ enableEditCommentButton: false })
      this.props.onEditUserComment({
        uData: {
          qid: this.props.play.question.id,
          uid: localStorage.id,
          cid: this.props.comment.cid,
          answer: this.props.play.answer.choice,
          difficulty: this.props.play.question.difficulty,
          category: this.props.play.question.category,
          correct_answer: this.props.play.results.correct_answer,
          result: this.props.play.results.result,
          question: this.props.play.question.question
        },
        cData: {
          comment: this.state.editedComment,
          user: this.props.user.info.user_name
        }
      })
      this.props.onEditQuestionComment({ comment: this.state.editedComment, cid: this.props.comment.cid })
      this.setState({ editedComment: '', showEditCommentForm: false })
    }
  }

  render() {

    let deleteButton = <></>, editButton = <></>, distribEditCommentErrors

    if(this.props.comment.user === this.props.user.info.user_name){
      const onDeleteCommentFunctions = () => {
        this.props.onDeleteUserComment({
          cid: this.props.comment.cid,
          qid: this.props.play.question.id,
          uid: localStorage.id,
          difficulty: this.props.play.question.difficulty,
          category: this.props.play.question.category
        })
        this.props.onDeleteQuestionComment(this.props.comment.cid)
      }

      const onEditCommentFunctions = () => { this.setState({ showEditCommentForm: true }) }

      editButton =
        <button
          id='edit_comment_button'
          name='edit_comment_button'
          className='edit_comment_button'
          onClick={ onEditCommentFunctions }
        >
          Edit
        </button>

      deleteButton =
        <button
          id='delete_comment_button'
          name='delete_comment_button'
          className='delete_comment_button'
          onClick={ onDeleteCommentFunctions }
        >
          Delete
        </button>
    }

    let commentCard = <></>

    if(!this.state.editCommentForm.valid) {
      if(this.state.editCommentForm.errors){
        distribEditCommentErrors = this.state.editCommentForm.errors.map(error => {
          return <CommentFormErrorItem
            key={ this.state.editCommentForm.errors.indexOf(error) }
            error={ error }
          />
        })
      }
    }

    if(this.state.showEditCommentForm) {
      commentCard =
        <form
          name="results_edit_comment_form"
          className="results_edit_comment_form"
          onSubmit={ this.onAddEditedComment }
        >
        <textarea
          rows="3"
          id="results_edit_comment"
          name="edit_comment_text"
          placeholder="Your comment..."
          onChange={ this.onEditComment }
          value={ this.state.editedComment }
        />
        <div className="results_edit_comment_button_container">
          <input
            disabled={ !this.state.enableEditCommentButton }
            className={ this.state.enableEditCommentButton ? "results_edit_comment_button" : "results_edit_comment_button_disabled" }
            type="submit"
            value="Edit Comment"
          />
        </div>
        { !this.state.editCommentForm.valid && this.state.editCommentForm.errors.length && <div className='results_edit_comment_error_container'>{ distribEditCommentErrors }</div> }
      </form>
    } else {
      commentCard =
        <ul>
          <li>
            <h5>{ this.props.comment.user }</h5>
            <p>{ this.props.comment.comment }</p>
            { editButton }
            { deleteButton }
          </li>
        </ul>
    }

    return(
      <>
        { commentCard }
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    play: state.play,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditUserComment: (obj) => dispatch(editUserComment(obj)),
    onEditQuestionComment: (obj) => dispatch(editQuestionComment(obj)),
    onUpdateCommentStatus: (status, loading) => dispatch(updateCommentStatus(status, loading)),
    onDeleteUserComment: (obj) => dispatch(deleteUserComment(obj)),
    onDeleteQuestionComment: (obj) => dispatch(deleteQuestionComment(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(commentCard)
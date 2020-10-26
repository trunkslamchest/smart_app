import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { routes } from '../../../../utility/paths'
import {
  deleteUserComment,
  deleteQuestionComment,
  editUserComment,
  editQuestionComment
} from '../../../../store/actions/actionIndex'

import makeCommentObject from '../../resultsFunctions/makeCommentObject'
import validateComment from '../../../../utility/validation/validateComment'

import CommentFormErrorItem from '../commentFormErrorItem/commentFormErrorItem'

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

  componentDidUpdate(){
    if(this.props.play.commentLoading && this.state.enableEditCommentButton) this.setState({ enableEditCommentButton: false })
    if(!this.props.play.commentLoading && !this.state.enableEditCommentButton) this.setState({ enableEditCommentButton: true })
  }

  onEditComment = (event) => { this.setState({ editedComment: event.target.value }) }

  onAddEditedComment = (event) => {
    event.persist()
    event.preventDefault()

    let authCheck = validateComment(this.state.editedComment)
    this.setState({ editCommentForm: authCheck })

    if (authCheck.valid) {
      let commentObj = makeCommentObject(this.props, this.state.editedComment)
      this.props.onEditUserComment(commentObj)
      this.props.onEditQuestionComment(commentObj)
      this.setState({ enableEditCommentButton: false, showEditCommentForm: false })
    }
  }

  render() {

    let deleteButton, editButton, editCommentCancelButton, distribEditCommentErrors, distribButtons, commentCard, commentUser = this.props.comment.user

    if(this.props.comment.user === this.props.user.info.user_name){

      const onDeleteCommentFunctions = () => {
        let commentObj = makeCommentObject(this.props, this.state.editedComment)
        this.props.onDeleteUserComment(commentObj)
        this.props.onDeleteQuestionComment(commentObj)
      }

      const onEditCommentFunctions = () => { this.setState({ showEditCommentForm: true }) }
      const onCancelEditCommentFunctions = () => { this.setState({ editedComment: this.props.comment.comment, showEditCommentForm: true }) }

      const commentButtons = [
        { kind: 'button', name: 'edit_comment', className: 'results_edit_comment_button', onClickFunctions: onEditCommentFunctions, text: 'Edit' },
        { kind: 'button', name: 'delete_comment', className: 'results_edit_comment_button', onClickFunctions: onDeleteCommentFunctions, text: 'Delete' },
        { kind: 'button', name: 'edit_comment_cancel', className: 'results_edit_comment_button', onClickFunctions: onCancelEditCommentFunctions, text: 'Cancel' },
      ]

      distribButtons = commentButtons.map( commentButton => {
        return (
          <commentButton.kind
            className='results_edit_comment_button'
            id={`results_${ commentButton.name }_button`}
            key={ commentButtons.indexOf(commentButton) + commentButton.name }
            name={`results_${ commentButton.name }_button`}
            onClick={ commentButton.onClickFunctions }
          >
            { commentButton.text }
          </commentButton.kind>
        )
      })

      editButton = distribButtons[0]
      deleteButton = distribButtons[1]
      editCommentCancelButton = distribButtons[2]
    } else commentUser = <Link to={ routes.user_profile + '/' + this.props.comment.user } target='_blank'>{ this.props.comment.user }</Link>

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
        <div className="results_edit_comment_buttons_container">
          <input
            disabled={ !this.state.enableEditCommentButton }
            id='results_edit_comment_confirm_button'
            name='results_edit_comment_confirm_button'
            className={ this.state.enableEditCommentButton ? "results_edit_comment_button" : "results_edit_comment_button_disabled" }
            type="submit"
            value="Confirm"
          />
          { editCommentCancelButton }
        </div>
        { !this.state.editCommentForm.valid && this.state.editCommentForm.errors.length && <div className='results_edit_comment_error_container'>{ distribEditCommentErrors }</div> }
      </form>
    } else {
      commentCard =
        <ul>
          <div className='results_all_comments_comment_header'>
            <h5>{ commentUser }</h5>
            <span>{ this.props.comment.timestamp }</span>
          </div>
          <li>
            <p>{ this.props.comment.comment }</p>
          </li>
          <div className='results_edit_comment_buttons_container'>
            { editButton }
            { deleteButton }
          </div>
        </ul>
    }

    return <>{ commentCard }</>
  }
}

const mapStateToProps = state => {
  return {
    play: state.play,
    questions: state.questions,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEditUserComment: (obj) => dispatch(editUserComment(obj)),
    onEditQuestionComment: (obj) => dispatch(editQuestionComment(obj)),
    onDeleteUserComment: (obj) => dispatch(deleteUserComment(obj)),
    onDeleteQuestionComment: (obj) => dispatch(deleteQuestionComment(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(commentCard)
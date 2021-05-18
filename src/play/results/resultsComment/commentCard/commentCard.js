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
import makeCommentButtons from '../../resultsFunctions/makeCommentButtons'
import makeCommentFormButtons from '../../resultsFunctions/makeCommentFormButtons'

import validateComment from '../../../../utility/validation/validateComment'

import DefaultButtonsContainer from '../../../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import CommentFormErrorItem from '../commentFormErrorItem/commentFormErrorItem'

import glyphIndex from '../../../../assets/glyphs/glyphIndex'


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

    let distribEditCommentErrors, commentButtons, commentFormButtons, commentCard, commentUser = this.props.comment.user

    if(this.props.comment.user === this.props.user.info.user_name){

      const onDeleteComment = () => {
        let commentObj = makeCommentObject(this.props, this.state.editedComment)
        this.props.onDeleteUserComment(commentObj)
        this.props.onDeleteQuestionComment(commentObj)
      }

      const onEditComment = () => { this.setState({ showEditCommentForm: true }) }
      const onCancelEditComment = () => { this.setState({ editedComment: this.props.comment.comment, showEditCommentForm: false }) }

      commentButtons = makeCommentButtons(glyphIndex, onEditComment, onDeleteComment)
      commentFormButtons = makeCommentFormButtons(glyphIndex, this.onAddEditedComment, onCancelEditComment)

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
        <ul>
          <div className='results_all_comments_comment_header'>
            <h5>{ commentUser }</h5>
            <span>{ this.props.comment.timestamp }</span>
          </div>
            <li>
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
            </form>
            { !this.state.editCommentForm.valid && this.state.editCommentForm.errors.length &&
              <div className='results_edit_comment_error_container'>
                { distribEditCommentErrors }
              </div>
            }
          </li>
          <DefaultButtonsContainer
            buttons={ commentFormButtons }
            buttonClass={ "edit_comment_button" }
            containerClass={ "edit_comment_buttons_container" }
            enableButton={ this.state.enableEditCommentButton }
          />
        </ul>
    } else {
      commentCard =
        <ul>
          <div className='results_all_comments_comment_header'>
            <h5>{ commentUser }</h5>
            <span>{ this.props.comment.timestamp }</span>
          </div>
          <div className='divider_right' />
          <li>
            <p>{ this.props.comment.comment }</p>
          </li>
          <DefaultButtonsContainer
            buttons={ commentButtons }
            buttonClass={ "edit_comment_button" }
            containerClass={ "edit_comment_buttons_container" }
            enableButton={ this.state.enableEditCommentButton }
          />
        </ul>
    }

    return (
      <div className='comment_card_container'>
        { commentCard }
      </div>
    )
  }
}

const store = store => {
  return {
    play: store.play,
    questions: store.questions,
    user: store.user
  }
}

const dispatch = (dispatch) => {
  return {
    onEditUserComment: (obj) => dispatch(editUserComment(obj)),
    onEditQuestionComment: (obj) => dispatch(editQuestionComment(obj)),
    onDeleteUserComment: (obj) => dispatch(deleteUserComment(obj)),
    onDeleteQuestionComment: (obj) => dispatch(deleteQuestionComment(obj))
  }
}

export default connect(store, dispatch)(commentCard)
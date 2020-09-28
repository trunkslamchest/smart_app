import React from 'react'
import { connect } from 'react-redux'
import { deleteUserComment, deleteQuestionComment } from '../../../../store/actions/actionIndex'

import './commentCard.css'

const commentCard = (props) => {

  let deleteButton = <></>

  if(props.comment.user === props.user.info.user_name){
    const onDeleteCommentFunctions = () => {
      props.onDeleteUserComment({
        cid: props.comment.cid,
        qid: props.play.question.id,
        uid: localStorage.id,
        difficulty: props.play.question.difficulty,
        category: props.play.question.category
      })
      props.onDeleteQuestionComment(props.comment.cid)
    }

    deleteButton =
      <button
        id='delete_comment_button'
        name='delete_comment_button'
        className='delete_comment_button'
        onClick={ onDeleteCommentFunctions }
      >
        Delete Comment
      </button>
  }

  return(
    <ul>
      <li>
        <h5>{ props.comment.user }</h5>
        <p>{ props.comment.comment }</p>
        { deleteButton }
      </li>
    </ul>
  )
}

const mapStateToProps = state => {
  return {
    play: state.play,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteUserComment: (obj) => dispatch(deleteUserComment(obj)),
    onDeleteQuestionComment: (obj) => dispatch(deleteQuestionComment(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(commentCard)
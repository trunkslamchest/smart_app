import React from 'react'

import { connect } from 'react-redux'

import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import CommentCard from './commentCard/commentCard'
import CommentButton from './commentButton/commentButton'
import CommentForm from './commentForm/commentForm'

import './resultsComment.css'

const ResultsComment = (props) => {

  let commentBlock,
      allComments

  const loading =
    <div className='loading_wrapper_comments'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'questionComment' } barType={ 'questionComment' } />
    </div>

  if(props.play.commentLoading) commentBlock = loading

  if(props.play.commentStatus === 'displayComments' && !props.play.commentLoading){
    allComments = Object.entries(props.play.question.comments).map(comment =>
      <CommentCard
        key={comment[0]}
        comment={comment[1]}
      />
    )

    commentBlock =
      <div className="results_comment">
        <div className="results_all_comments">
          { allComments }
        </div>
      </div>
  }

  if(props.showCommentButton){
    commentBlock =
      <div className="results_comment">
        <div className="results_comment_button_container">
          <CommentButton
            keyNameValue="results_comment_button"
            class={ props.enableCommentButton ? "results_comment_button" : "results_comment_button_disabled" }
            onClick={ props.enableCommentButton ? props.onClickCommentFunctions : null }
          >
            Leave a Comment
          </CommentButton>
        </div>
      </div>
  }

  if(props.showCommentForm){
    commentBlock =
      <div className="results_comment">
        <div className="results_comment_text">
          <CommentForm
            comment={ props.comment }
            commentForm={ props.commentForm }
            enableAddCommentButton = { props.enableAddCommentButton }
            onAddComment={ props.onAddComment }
            onChangeComment={ props.onChangeComment }
          />
        </div>
      </div>
  }

  return(
    <>{ commentBlock }</>
  )
}

const mapStateToProps = state => {
  return {
    play: state.play
  }
}

export default connect(mapStateToProps)(ResultsComment)
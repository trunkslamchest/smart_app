import React from 'react'

import { connect } from 'react-redux'

import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import CommentCard from './commentCard/commentCard'
import CommentForm from './commentForm/commentForm'

import './resultsComment.css'

const ResultsComment = (props) => {

  let allComments = <h3>No one has commented on this question yet</h3>

  let commentForm =
    <div className='loading_wrapper_comments'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'questionComment' } barType={ 'questionComment' } />
    </div>

  if(props.play.status === 'displayResults' && props.play.question.comments){
    allComments = Object.entries(props.play.question.comments).map(comment =>
      <CommentCard
        key={ comment[0] }
        comment={ comment[1] }
        userComment= { props.comment }
        onAddComment={ props.onAddComment }
        onChangeComment={ props.onChangeComment }
      />
    )
  }

  let commentBlock =
    <div className="results_all_comments">
      { allComments }
    </div>

  if(!props.play.commentLoading)
    commentForm =
      <CommentForm
        comment={ props.comment }
        commentForm={ props.commentForm }
        enableAddCommentButton = { props.enableAddCommentButton }
        onAddComment={ props.onAddComment }
        onChangeComment={ props.onChangeComment }
      />

  return(
    <>
      { props.showComments &&
        <>
          { commentForm }
          { commentBlock }
        </>
      }
    </>
  )
}

const mapStateToProps = state => {
  return {
    play: state.play
  }
}

export default connect(mapStateToProps)(ResultsComment)
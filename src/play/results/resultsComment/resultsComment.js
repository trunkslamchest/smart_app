import React from 'react'

import { connect } from 'react-redux'

import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import CommentCard from './commentCard/commentCard'
import CommentForm from './commentForm/commentForm'

import './resultsComment.css'

const ResultsComment = (props) => {

  let commentForm, allComments, distribComments = <h3>No one has commented on this question yet</h3>

  const loading =
    <div className='loading_wrapper_comments'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'questionComment' } barType={ 'questionComment' } />
    </div>

  if(!props.staticResults) {
    if(props.play.results && props.play.question.comments) allComments = Object.entries(props.play.question.comments)
  } else {
    if (props.questions.staticQuestion && props.questions.staticQuestion.comments) allComments = Object.entries(props.questions.staticQuestion.comments)
  }

  if(allComments && (props.play.status === 'displayResults' || props.questions.status === 'StaticQuestionSuccess')){
    distribComments = allComments.map(comment =>
      <CommentCard
        key={ comment[0] }
        comment={ comment[1] }
        userComment= { props.comment }
        onAddComment={ props.onAddComment }
        onChangeComment={ props.onChangeComment }
      />
    )
  }

  if(props.play.commentLoading || props.questions.commentLoading ) commentForm = loading
  else {
    commentForm =
      <CommentForm
        comment={ props.comment }
        commentForm={ props.commentForm }
        enableAddCommentButton = { props.enableAddCommentButton }
        onAddComment={ props.onAddComment }
        onChangeComment={ props.onChangeComment }
      />
  }

  return(
    <>
      { props.showComments &&
        <>
          { commentForm }
          <div className="results_all_comments">
            { distribComments }
          </div>
        </>
      }
    </>
  )
}

const mapStateToProps = state => {
  return {
    play: state.play,
    questions: state.questions
  }
}

export default connect(mapStateToProps)(ResultsComment)
import React from 'react'
import { connect } from 'react-redux'

import BaseDynamicBar from '../../../UI/loading/dynamicBar/baseDynamicBar/baseDynamicBar'
import SmallLoadingSpinner from '../../../UI/loading/smallLoadingSpinner/smallLoadingSpinner'

import CommentCard from './commentCard/commentCard'
import CommentForm from './commentForm/commentForm'

import './resultsComment.css'

const ResultsComment = (props) => {

  let commentForm, allComments, distribComments = <h3>There are currently no comments for this question</h3>

  const loading =
    <div className='loading_wrapper_comments'>
      <SmallLoadingSpinner />
      <BaseDynamicBar modalType={ 'questionComment' } barType={ 'questionComment' } />
    </div>

  if (!!props.comments) allComments = Object.entries(props.comments)

  if(allComments && (props.status === 'displayResults' || props.status === 'displayStaticQuestion')){
    distribComments = allComments.map(comment =>
      <CommentCard
        comment={ comment[1] }
        key={ comment[0] }
        onAddComment={ props.onAddComment }
        onChangeComment={ props.onChangeComment }
        staticResults={ props.staticResults }
        userComment= { props.comment }
      />
    )
  }

  if(props.commentLoading) commentForm = loading
  else if(!props.userAnswered) commentForm = <h3>You cannot comment on this question without answering it.</h3>
  else {
    commentForm =
      <CommentForm
        comment={ props.comment }
        commentForm={ props.commentForm }
        enableAddCommentButton = { props.enableAddCommentButton }
        onAddComment={ props.onAddComment }
        onChangeComment={ props.onChangeComment }
        staticResults={ props.staticResults }
      />
  }

  return(
    <>
      { props.showComments &&
        <>
          { commentForm }
          <div className="results_all_comments">
            <div className='divider_medium' />
            { distribComments }
            <div className='divider_medium' />
          </div>
        </>
      }
    </>
  )
}

const store = store => {
  return {
    comments: store.play.question ? store.play.question.comments : store.questions.staticQuestion.comments,
    commentLoading: store.play.commentLoading || store.questions.commentLoading,
    status: store.play.status || store.questions.status,
    userAnswered: store.play.question ? store.user.questions.ids.includes(store.play.question.id) : store.user.questions.ids.includes(store.questions.staticQuestion.qid)
  }
}

export default connect(store)(ResultsComment)
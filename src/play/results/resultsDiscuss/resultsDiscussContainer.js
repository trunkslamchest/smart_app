import React from 'react'
import { connect } from 'react-redux'

import {
  setComment,
  updateCommentStatus
} from '../../../store/actions/actionIndex'

import validateComment from '../../../utility/validation/validateComment'
import getTime from '../../../utility/getTime'

import ResultsComment from '../resultsComment/resultsComment'

import './resultsDiscussContainer.css'

class ResultsDiscussContainer extends React.Component {

  state = {
    comment: '',
    commentForm: { valid: true },
    showCommentButton: false,
    showComments: true,
    enableCommentButton: false,
    enableAddCommentButton: true
  }

  componentDidUpdate(){
    if(this.props.play.commentLoading && this.state.enableAddCommentButton) this.setState({ enableAddCommentButton: false })
    if(!this.props.play.commentLoading && !this.state.enableAddCommentButton) this.setState({ enableAddCommentButton: true })
  }

  componentWillUnmount(){
    clearTimeout(this.commentsTimeout)
    clearTimeout(this.enableCommentButtonTimeout)
  }

  onClickCommentFunctions = () => { this.setState({ enableCommentButton: false }) }

  onChangeComment = (event) => { this.setState({ comment: event.target.value }) }

  onAddComment = (event) => {
    event.persist()
    event.preventDefault()

    let authCheck = validateComment(this.state.comment)
    this.setState({ commentForm: authCheck })

    if (authCheck.valid) {
      this.setState({ enableAddCommentButton: false })
      this.props.onSetComment({
        uid: localStorage.id,
        qid: this.props.play.question.id,
        user_name: this.props.user.info.user_name,
        question: this.props.play.question.question,
        difficulty: this.props.play.question.difficulty,
        category: this.props.play.question.category,
        answer: this.props.play.answer.choice,
        correct_answer: this.props.play.results.correct_answer,
        result: this.props.play.results.result,
        comment: this.state.comment,
        timestamp: getTime('fullDate')
      })
      this.props.onUpdateCommentStatus('initComment', true)
      this.setState({ comment: '' })
    }
  }


  render(){
    return(
      <div className='results_discuss_container'>
          <ResultsComment
            comment={ this.state.comment }
            commentForm={ this.state.commentForm }
            showComments={ this.state.showComments }
            enableCommentButton={ this.state.enableCommentButton }
            enableAddCommentButton={ this.state.enableAddCommentButton }
            onAddComment={ this.onAddComment }
            onChangeComment={ this.onChangeComment }
            onClickCommentFunctions={ this.onClickCommentFunctions }
          />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    play: state.play,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCommentStatus: (status, loading) => dispatch(updateCommentStatus(status, loading)),
    onSetComment: (obj) => dispatch(setComment(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsDiscussContainer)
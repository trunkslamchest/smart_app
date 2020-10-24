import React from 'react'
import { connect } from 'react-redux'

import {
  setVote,
  updateVoteStatus,
  setComment,
  updateCommentStatus
} from '../../../store/actions/actionIndex'

import validateComment from '../../../utility/validation/validateComment'
import getTime from '../../../utility/getTime'

import ResultsVote from '../resultsVote/resultsVote'
import ResultsComment from '../resultsComment/resultsComment'

import './resultsDiscussContainer.css'

class ResultsDiscussContainer extends React.Component {

  state = {
    comment: '',
    commentForm: { valid: true },
    showCommentButton: false,
    showComments: true,
    showVoteButtons: true,
    enableCommentButton: false,
    enableAddCommentButton: true,
    enableVoteButtons: false
  }

  componentDidMount() {
    // this.voteButtonsTimeout = setTimeout(() => { this.setState({ showVoteButtons: true })}, 2000)
    this.enableVoteButtonsTimeout = setTimeout(() => { this.setState({ enableVoteButtons: true })}, 500)
  }

  componentDidUpdate(){
    if(this.props.play.commentLoading && this.state.enableAddCommentButton) this.setState({ enableAddCommentButton: false })
    if(!this.props.play.commentLoading && !this.state.enableAddCommentButton) this.setState({ enableAddCommentButton: true })
    // if(this.props.play.voteLoading && this.state.enableVoteButtons) this.setState({ enableVoteButtons: false })
    // if(!this.props.play.voteLoading && !this.state.enableVoteButtons) this.setState({ enableVoteButtons: true })
  }

  componentWillUnmount(){
    clearTimeout(this.voteButtonsTimeout)
    clearTimeout(this.enableVoteButtonsTimeout)
    clearTimeout(this.commentsTimeout)
    clearTimeout(this.enableCommentButtonTimeout)
  }

  onClickVoteFunctions = (event) => {
    event.persist()

    let voteObj

    if(!this.props.staticResults){
      voteObj = {
        type: 'play',
        qid: this.props.play.question.id,
        question: this.props.play.question.question,
        difficulty: this.props.play.question.difficulty,
        category: this.props.play.question.category,
        answer: this.props.play.answer.choice,
        correct_answer: this.props.play.results.correct_answer,
        result: this.props.play.results.result
      }
    } else {
      voteObj = {
        type: 'static',
        qid: this.props.qid,
        question: this.props.questions.staticQuestion.question,
        difficulty: this.props.diff,
        category: this.props.cat,
        answer: this.props.questions.staticUserResults.answer,
        correct_answer: this.props.questions.staticQuestion.correct,
        result: this.props.questions.staticUserResults.result
      }
    }

    voteObj['uid'] = localStorage.id
    voteObj['vote'] = event.target.attributes.vote.value

    console.log(voteObj)

    this.props.onSetVote(voteObj)
    this.props.onUpdateVoteStatus('initVote', true)
    this.setState({ showVoteButtons: false, enableVoteButtons: false })
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
          <ResultsVote
            staticResults={ this.props.staticResults }
            enableVoteButtons={ this.state.enableVoteButtons }
            showVoteButtons={ this.state.showVoteButtons }
            onClickVoteFunctions={ this.onClickVoteFunctions }
          />
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
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateVoteStatus: (status, loading) => dispatch(updateVoteStatus(status, loading)),
    onSetVote: (obj) => dispatch(setVote(obj)),
    onUpdateCommentStatus: (status, loading) => dispatch(updateCommentStatus(status, loading)),
    onSetComment: (obj) => dispatch(setComment(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsDiscussContainer)
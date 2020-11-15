import React from 'react'
import { connect } from 'react-redux'

import {
  setVote,
  voteLoading,
  setComment,
  updateVoteStatus,
  updateCommentStatus,
  updateStaticQuestionVoteStatus,
  updateStaticQuestionCommentStatus
} from '../../../store/actions/actionIndex'

import validateComment from '../../../utility/validation/validateComment'
import getTime from '../../../utility/getTime'

import VoteContainer from '../../../UI/components/containers/voteContainer/voteContainer'
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
    this.enableVoteButtonsTimeout = setTimeout(() => { this.setState({ enableVoteButtons: true })}, 500)
  }

  componentDidUpdate(){
    if(((this.props.play.results && this.props.play.results.vote) ||
       (this.props.questions.staticUserResults && this.props.questions.staticUserResults.vote)) && this.state.showVoteButtons) this.setState({ showVoteButtons: false })
    if(this.props.play.commentLoading && this.state.enableAddCommentButton) this.setState({ enableAddCommentButton: false })
    if(!this.props.play.commentLoading && !this.state.enableAddCommentButton) this.setState({ enableAddCommentButton: true })
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
        difficulty: this.props.play.question.difficulty,
        category: this.props.play.question.category
      }
      this.props.onUpdateVoteStatus('initVote', true)
    } else {
      voteObj = {
        type: 'static',
        qid: this.props.qid,
        difficulty: this.props.diff,
        category: this.props.cat
      }
      this.props.onUpdateStaticQuestionVoteStatus('initVote')
      this.props.onVoteLoading(true)
    }

    voteObj['uid'] = localStorage.id
    voteObj['vote'] = event.target.attributes.vote.value

    this.props.onSetVote(voteObj)
    this.setState({ showVoteButtons: false, enableVoteButtons: false })
  }

  onClickCommentFunctions = () => { this.setState({ enableCommentButton: false }) }

  onChangeComment = (event) => { this.setState({ comment: event.target.value }) }

  onAddComment = (event) => {
    event.persist()
    event.preventDefault()

    let authCheck = validateComment(this.state.comment), commentObj = {}
    this.setState({ commentForm: authCheck })

    if (authCheck.valid) {
      this.setState({ enableAddCommentButton: false })
      if(!this.props.staticResults){
        commentObj = {
          type: 'play',
          qid: this.props.play.question.id,
          user_name: this.props.user.info.user_name,
          difficulty: this.props.play.question.difficulty,
          category: this.props.play.question.category,
        }
        this.props.onUpdateCommentStatus('initComment', true)
      } else {
        commentObj = {
          type: 'static',
          qid: this.props.questions.staticQuestion.qid,
          user_name: this.props.user.info.user_name,
          difficulty: this.props.questions.staticQuestion.difficulty,
          category: this.props.questions.staticQuestion.category,
        }
        this.props.onUpdateStaticQuestionCommentStatus('initComment')
      }

      commentObj['uid'] = localStorage.id
      commentObj['comment'] = this.state.comment
      commentObj['timestamp'] = getTime('fullDate')

      this.props.onSetComment(commentObj)
      this.setState({ comment: '' })
    }
  }

  render(){

    let voteProps

    if(this.props.play.question) voteProps = this.props.play.question.votes
    if(this.props.questions.staticQuestion) voteProps = this.props.questions.staticQuestion.votes

    return(
      <div className='results_discuss_container'>
          <VoteContainer
            enableVoteButtons={ this.state.enableVoteButtons }
            onClickVoteFunctions={ this.onClickVoteFunctions }
            showVoteButtons={ this.state.showVoteButtons }
            voteProps={ voteProps }
          />
          <ResultsComment
            comment={ this.state.comment }
            commentForm={ this.state.commentForm }
            enableCommentButton={ this.state.enableCommentButton }
            enableAddCommentButton={ this.state.enableAddCommentButton }
            onAddComment={ this.onAddComment }
            onChangeComment={ this.onChangeComment }
            onClickCommentFunctions={ this.onClickCommentFunctions }
            showComments={ this.state.showComments }
            staticResults={ this.props.staticResults }
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
    onSetVote: (obj) => dispatch(setVote(obj)),
    onVoteLoading: (bool) => dispatch(voteLoading(bool)),
    onSetComment: (obj) => dispatch(setComment(obj)),
    onUpdateVoteStatus: (status, loading) => dispatch(updateVoteStatus(status, loading)),
    onUpdateCommentStatus: (status, loading) => dispatch(updateCommentStatus(status, loading)),
    onUpdateStaticQuestionVoteStatus: (status) => dispatch(updateStaticQuestionVoteStatus(status)),
    onUpdateStaticQuestionCommentStatus: (status) => dispatch(updateStaticQuestionCommentStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsDiscussContainer)
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

import makeVoteObject from '../resultsFunctions/makeVoteObject'

import VoteContainer from '../../../UI/components/containers/voteContainer/voteContainer'
import ResultsComment from '../resultsComment/resultsComment'

import './resultsDiscussContainer.css'

class ResultsDiscussContainer extends React.Component {

  state = {
    comment: '',
    commentForm: { valid: true },
    showCommentButton: false,
    showComments: false,
    showVoteButtons: false,
    showVoteStats: false,
    enableCommentButton: false,
    enableAddCommentButton: false,
    enableVoteButtons: false
  }

  componentDidMount() {
    if(!this.props.staticResults) {
      this.enableVoteButtonsTimeout = setTimeout(() => { this.setState({ enableVoteButtons: true, showVoteButtons: true })}, 250)
      this.enableCommentButtonTimeout = setTimeout(() => { this.setState({ enableCommentButton: true, showComments: true })}, 500)

    }
    else {
      this.setState({ enableVoteButtons: true, showVoteButtons: true, enableCommentButton: true, showComments: true })
    }
  }

  componentDidUpdate(){
    if(((this.props.play.results && this.props.play.results.vote) ||
      (this.props.questions.staticUserResults && this.props.questions.staticUserResults.vote)) && this.state.showVoteButtons) this.setState({ showVoteButtons: false, showVoteStats: true })

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
      voteObj = makeVoteObject('play', this.props.play.question.id, this.props.play.question.difficulty, this.props.play.question.category)
      this.props.onUpdateVoteStatus('initVote', true)
    } else {
      voteObj = makeVoteObject('static', this.props.qid, this.props.diff, this.props.cat)
      this.props.onUpdateStaticQuestionVoteStatus('initVote')
      this.props.onVoteLoading(true)
    }

    voteObj['uid'] = localStorage.id
    voteObj['vote'] = event.target.attributes.vote.value

    this.props.onSetVote(voteObj)
    this.setState({ showVoteButtons: false, enableVoteButtons: false, showVoteStats: true })
  }

  onClickCommentFunctions = () => { this.setState({ enableCommentButton: false }) }

  onChangeComment = (event) => { this.setState({ comment: event.target.value }) }

  onAddComment = (event) => {
    event.persist()
    event.preventDefault()

    let commentObj = {}, authCheck = validateComment(this.state.comment)
    this.setState({ commentForm: authCheck })

    if (authCheck.valid) {
      this.setState({ enableAddCommentButton: false })
      commentObj = {
        type: !this.props.staticResults ? 'play' : 'static',
        qid: !this.props.staticResults ? this.props.play.question.id : this.props.questions.staticQuestion.qid,
        user_name: this.props.user.info.user_name,
        difficulty: !this.props.staticResults ? this.props.play.question.difficulty : this.props.questions.staticQuestion.difficulty,
        category: !this.props.staticResults ? this.props.play.question.category : this.props.questions.staticQuestion.category,
      }

      if(!this.props.staticResults)this.props.onUpdateCommentStatus('initComment', true)
      else  this.props.onUpdateStaticQuestionCommentStatus('initComment')

      commentObj['uid'] = localStorage.id
      commentObj['comment'] = this.state.comment
      commentObj['timestamp'] = getTime('fullDate')

      this.props.onSetComment(commentObj)
      this.setState({ comment: '' })
    }
  }

  render(){

    let voteProps, voteBlock, commentBlock

    if(this.props.play.question) voteProps = this.props.play.question.votes
    if(this.props.questions.staticQuestion) voteProps = this.props.questions.staticQuestion.votes

    if(this.props.play.question || this.props.questions.staticQuestion) {
      voteBlock =
        <VoteContainer
          enableVoteButtons={ this.state.enableVoteButtons }
          onClickVoteFunctions={ this.onClickVoteFunctions }
          showVoteButtons={ this.state.showVoteButtons }
          showVoteStats={ this.state.showVoteStats }
          voteProps={ voteProps }
        />
      commentBlock =
        <div className='results_comment_container'>
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
    }

    return(
      <div className='results_discuss_container'>
        { voteBlock }
        { commentBlock }
      </div>
    )
  }
}

const store = (store) => {
  return {
    play: store.play,
    user: store.user,
    questions: store.questions
  }
}

const dispatch = (dispatch) => {
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

export default connect(store, dispatch)(React.memo(ResultsDiscussContainer))
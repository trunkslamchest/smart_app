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
    else this.setState({ enableVoteButtons: true, showVoteButtons: true, enableCommentButton: true, showComments: true })
  }

  componentDidUpdate(){
    if((this.props.results && this.props.resultsVotes) && this.state.showVoteButtons) this.setState({ showVoteButtons: false, showVoteStats: true })
    if(this.props.commentLoading && this.state.enableAddCommentButton) this.setState({ enableAddCommentButton: false })
    if(!this.props.commentLoading && !this.state.enableAddCommentButton) this.setState({ enableAddCommentButton: true })
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
      voteObj = makeVoteObject('play', this.props.questionId, this.props.questionDifficulty, this.props.questionCategory)
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
        qid: this.props.questionId,
        user_name: this.props.userName,
        difficulty: this.props.questionDifficulty,
        category: this.props.questionCategory,
      }

      if(!this.props.staticResults)this.props.onUpdateCommentStatus('initComment', true)
      else  this.props.onUpdateStaticQuestionCommentStatus('initComment', true)

      commentObj['uid'] = localStorage.id
      commentObj['comment'] = this.state.comment
      commentObj['timestamp'] = getTime('fullDate')

      this.props.onSetComment(commentObj)
      this.setState({ comment: '' })
    }
  }

  render(){

    let voteProps, voteBlock, commentBlock, discussBlock

    if(!this.props.userAnswered) discussBlock = <h6 className='results_not_answered'>You cannot comment or vote on this question without answering it.</h6>
    else {
      voteProps = this.props.questionVotes
      if(this.props.question) {
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
              userAnswered={ this.props.userAnswered }
            />
          </div>
      }

      discussBlock =
        <div className='results_discuss_container'>
          { voteBlock }
          { commentBlock }
        </div>
    }

    return discussBlock
  }
}

const store = (store) => {
  return {
    commentLoading: store.play.commentLoading || store.questions.commentLoading,
    question: store.play.question ? !!store.play.question : !!store.questions.staticQuestion,
    questionCategory: store.play.question ? store.play.question.category : store.questions.question.category,
    questionDifficulty: store.play.question ? store.play.question.difficulty : store.questions.question.difficulty,
    questionId: store.play.question ? store.play.question.id : store.questions.staticQuestion ? store.questions.staticQuestion.qid : null,
    questionVotes: store.play.question ? store.play.question.votes : store.questions.staticQuestion ? store.questions.staticQuestion.votes : null,
    results: store.play.results ? !!store.play.results : !!store.questions.staticUserResults,
    resultsVotes: store.play.results ? store.play.results.vote : store.questions.staticUserResults ? store.questions.staticUserResults.vote : null,
    userName: store.user.info ? store.user.info.user_name : null
  }
}

const dispatch = (dispatch) => {
  return {
    onSetComment: (obj) => dispatch(setComment(obj)),
    onSetVote: (obj) => dispatch(setVote(obj)),
    onUpdateCommentStatus: (status, loading) => dispatch(updateCommentStatus(status, loading)),
    onUpdateStaticQuestionCommentStatus: (status, loading) => dispatch(updateStaticQuestionCommentStatus(status, loading)),
    onUpdateStaticQuestionVoteStatus: (status) => dispatch(updateStaticQuestionVoteStatus(status)),
    onUpdateVoteStatus: (status, loading) => dispatch(updateVoteStatus(status, loading)),
    onVoteLoading: (bool) => dispatch(voteLoading(bool))
  }
}

export default connect(store, dispatch)(React.memo(ResultsDiscussContainer))
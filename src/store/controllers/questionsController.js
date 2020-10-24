import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

class QuestionsController extends React.Component {

  componentDidMount(){

  }

  componentDidUpdate(){
    if(this.props.auth.status === 'authValid' && !this.props.auth.loading) {

      if(this.props.questions.status === 'StaticQuestionSuccess')
        if(this.props.questions.voteStatus === 'updateStaticUserVote' && this.props.questions.vote) this.updateStaticUserVoteModule()
        if(this.props.questions.commentStatus === 'updateStaticQuestionComment' && this.props.questions.comment) this.updateStaticUserCommentModule()

        if(this.props.questions.voteStatus === 'voteSuccess' && this.props.questions.voteLoading) this.successModule("Vote")
        if(this.props.questions.commentStatus === 'commentSuccess' && this.props.questions.commentLoading) this.successModule("Comment")
    }


  }

  componentWillUnmount(){

  }

  updateStaticUserVoteModule = () => {
    this.props.onUpdateUserVotesFromPlayController({
      type: 'static',
      vid: this.props.questions.vote.vid,
      qid: this.props.questions.staticQuestion.qid,
      difficulty: this.props.questions.staticQuestion.difficulty,
      category: this.props.questions.staticQuestion.category,
      vote: this.props.questions.vote.vote
    })
  }

  updateStaticUserCommentModule = () => {
    this.props.onUpdateUserCommentsFromPlayController({
      type: 'static',
      cid: this.props.questions.comment.cid,
      qid: this.props.questions.comment.qid,
      category: this.props.questions.staticQuestion.category,
      comment: this.props.questions.comment.comment,
      difficulty: this.props.questions.staticQuestion.difficulty,
      timestamp: this.props.questions.comment.timestamp
    })
  }

  successModule = (type) => {
    this.props[`onClearStaticUser${type}`]()
    this.props[`onClearStaticQuestion${type}Status`]()
    this.props[`on${type}Loading`](false)
  }

  render(){ return<>{ this.props.children }</> }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    auth: state.auth,
    play: state.play,
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateUserVotesFromPlayController: (obj) => dispatch(actions.updateUserVotesFromPlayController(obj)),
    onUpdateUserCommentsFromPlayController: (obj) => dispatch(actions.updateUserCommentsFromPlayController(obj)),
    onVoteLoading: (bool) => dispatch(actions.voteLoading(bool)),
    onCommentLoading: (bool) => dispatch(actions.commentLoading(bool)),
    onClearStaticQuestionVoteStatus: () => dispatch(actions.clearStaticQuestionVoteStatus()),
    onClearStaticQuestionCommentStatus: () => dispatch(actions.clearStaticQuestionCommentStatus()),
    onClearStaticUserVote: () => dispatch(actions.clearStaticUserVote()),
    onClearStaticUserComment: () => dispatch(actions.clearStaticUserComment())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsController)
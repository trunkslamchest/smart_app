import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

class QuestionsController extends React.Component {

  componentDidMount(){
    // console.log('test')
  }

  componentDidUpdate(){
    if(this.props.auth.status === 'authValid' && !this.props.auth.loading) {
      if(this.props.questions.status === 'StaticQuestionSuccess' &&
        this.props.questions.voteStatus === 'updateStaticUserVote' &&
        this.props.questions.vote)
          this.updateStaticUserVoteModule()
    }
  }

  componentWillUnmount(){

  }

  updateStaticUserVoteModule = () => {
    this.props.onUpdateStaticQuestionVotesStatus('updateUserVote')
    // this.props.onUpdateStaticUserVoteFromPlayController({
    this.props.onUpdateUserVotesFromPlayController({
      vid: this.props.questions.vote.vid,
      qid: this.props.questions.staticQuestion.qid,
      difficulty: this.props.questions.staticQuestion.difficulty,
      category: this.props.questions.staticQuestion.category,
      vote: this.props.questions.vote.vote
    })
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
    onUpdateStaticQuestionVotesStatus: (status) => dispatch(actions.updateStaticQuestionVotesStatus(status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsController)
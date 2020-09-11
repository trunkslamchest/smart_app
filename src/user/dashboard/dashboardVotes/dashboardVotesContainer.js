import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardVoteCard from './dashboardVoteCard'

import './dashboardVotes.css'

class DashboardVotesContainer extends React.Component {

  state = { votes: null }

  componentDidMount(){ if(!this.state.votes){ this.sortVotes() } }

  sortVotes = () => {
    let voteArr = []
    for(let diff in this.props.user.questions){
      if(diff !== 'ids' && diff !== 'totals'){
        let questions = Object.entries(this.props.user.questions[diff].categories)
        for(let question in questions) {
          Object.values(questions[question][1]).forEach(i => {
            if(i.vote){
              let voteObj = {
                  category: questions[question][0],
                  difficulty: diff,
                  question: i.question,
                  answer: i.answer,
                  correct_answer: i.correct_answer,
                  result: i.result,
                  vote: i.vote
                }
              voteArr.push(voteObj)
            }
          })
        }
      }
    }
    this.setState({ votes: voteArr })
  }

  render(){

    let distribVotes

    const no_votes_header =
      <div className="dashboard_alt_header">
        <h4> You have not voted on any questions yet!</h4>
      </div>

    if(this.state.votes){
      distribVotes = this.state.votes.map(question =>
        <DashboardVoteCard
          key={this.state.votes.indexOf(question) + 1}
          votedQuestion={question}
        />
      )
    }

    return(
      <div className={ "votes_wrapper"}>
        { this.state.votes ? distribVotes : no_votes_header }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardVotesContainer)
import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardVoteCard from './dashboardVoteCard'

import './dashboardVotes.css'

class DashboardVotesContainer extends React.Component {

  state = { votes: [] }

  componentDidMount(){ }

  // sortVotes = () => {
  //   let voteArr = []
  //   for(let diff in this.props.user.questions){
  //     if(diff !== 'ids' && diff !== 'totals'){
  //       let questions = Object.entries(this.props.user.questions[diff].categories)
  //       for(let question in questions) {
  //         Object.values(questions[question][1]).forEach(i => {
  //           if(i.vote){
  //             let voteObj = {
  //                 category: questions[question][0],
  //                 difficulty: diff,
  //                 question: i.question,
  //                 answer: i.answer,
  //                 correct_answer: i.correct_answer,
  //                 result: i.result,
  //                 vote: i.vote
  //               }
  //             voteArr.push(voteObj)
  //           }
  //         })
  //       }
  //     }
  //   }
  //   this.setState({ votes: voteArr })
  // }

  // sortVotes = () => {
  //   console.log(this.props.user.questions.votes)
  // }

  render(){

    // if(this.props.user.questions && this.props.user.questions.votes) {
    //   console.log(Object.values(this.props.user.questions.votes))
    // }

    // console.log(this.state)

    let distribVotes

    const noVotesHeader =
      <div className="dashboard_alt_header">
        <h4> You have not voted on any questions yet!</h4>
      </div>

    if(this.props.user.questions){
      if(this.props.user.questions.votes){
        let questions = Object.values(this.props.user.questions.votes)
        distribVotes = questions.map(question =>
          typeof question === 'object' ?
            <DashboardVoteCard
              key={questions.indexOf(question) + 1}
              votedQuestion={question}
            />
          : null
        )
      } else {
        distribVotes = noVotesHeader
      }
    }

    return(
      <div className={ "votes_wrapper"}>
        {/* { this.props.user.questions && this.props.user.questions.votes.total > 0 ? distribVotes : noVotesHeader } */}
        { distribVotes }

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
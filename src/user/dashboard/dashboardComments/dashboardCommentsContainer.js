import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardCommentCard from './dashboardCommentCard'


import './dashboardComments.css'

class DashboardCommentsContainer extends React.Component {

  state = { comments: [] }

  componentDidMount(){ if(!this.state.comments){ this.sortComments() } }

  sortComments = () => {
    let commentArr = []
    for(let diff in this.props.user.questions){
      if(diff !== 'ids' && diff !== 'totals'){
        let questions = Object.entries(this.props.user.questions[diff].categories)
        for(let question in questions) {
          Object.values(questions[question][1]).forEach(i => {
            if(i.comment){
              let commentObj = {
                  category: questions[question][0],
                  difficulty: diff,
                  question: i.question,
                  answer: i.answer,
                  correct_answer: i.correct_answer,
                  result: i.result,
                  comment: i.comment
                }
              commentArr.push(commentObj)
            }
          })
        }
      }
    }
    this.setState({ comments: commentArr })
  }
  render(){

    let distribComments

    const no_comments_header =
      <div className="dashboard_alt_header">
        <h4> You have not commented on any questions yet!</h4>
      </div>

    if(this.state.comments.length > 0){
      distribComments = this.state.comments.map(question =>
        <DashboardCommentCard
          key={this.state.comments.indexOf(question) + 1}
          commentedQuestion={question}
        />
      )
    }

    return(
      <div className={ "comment_wrapper"}>
        { this.state.comments.length > 0 ? distribComments : no_comments_header }
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCommentsContainer)
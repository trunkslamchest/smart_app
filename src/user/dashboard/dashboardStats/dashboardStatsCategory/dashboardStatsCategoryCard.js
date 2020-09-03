import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import './dashboardStatsCategory.css'

class DashboardStatsCategoryCard extends React.Component {

  render(){
    let questionsAnswered = (this.props.category[1].answered / this.props.questions.totals.category[`${this.props.category[0]}`].total).toFixed(2)
    let questionsCorrect = "0.00"

    if(this.props.category[1].answered > 0){
      questionsCorrect = (this.props.category[1].correct / this.props.category[1].answered).toFixed(2)
    }

    return(
      <ul>
        <h3>{this.props.category[0]}</h3>
        <li>{this.props.category[1].answered}/{this.props.questions.totals.category[`${this.props.category[0]}`].total} answered</li>
        <li>{ questionsAnswered } %</li>
        <li>{this.props.category[1].correct}/{this.props.category[1].answered} correct</li>
        <li>{ questionsCorrect } %</li>
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsCategoryCard)
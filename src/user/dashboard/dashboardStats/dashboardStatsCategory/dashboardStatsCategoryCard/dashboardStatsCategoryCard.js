import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

class DashboardStatsCategoryCard extends React.Component {

  numZero = (num) => {
    let a = num.split('')
    return !!parseInt(a[ a.length - 1]) ? parseFloat(a.join('')) : Math.round(parseInt(num))
  }

  render(){
    let questionsAnswered = ((this.props.category[1].answered / this.props.questions.totals.category[this.props.category[0]].questions) * 100).toFixed(2)
    let questionsCorrect = "0.00"

    if(this.props.category[1].answered > 0) questionsCorrect = ((this.props.category[1].correct / this.props.category[1].answered) * 100).toFixed(2)

    questionsAnswered = this.numZero(questionsAnswered)
    questionsCorrect = this.numZero(questionsCorrect)

    return(
      <ul>
        <h3>{this.props.category[0]}</h3>
        <li>{this.props.category[1].answered}/{this.props.questions.totals.category[`${this.props.category[0]}`].questions} answered ({ questionsAnswered }%)</li>
        <li>{this.props.category[1].correct}/{this.props.category[1].answered} correct ({ questionsCorrect }%)</li>
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
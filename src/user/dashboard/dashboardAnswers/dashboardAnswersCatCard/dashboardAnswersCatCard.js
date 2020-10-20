import React from 'react'
import { connect} from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardAnswersQuestionCard from '../dashboardAnswersQuestionCard/dashboardAnswersQuestionCard'

import './dashboardAnswersCatCard.css'

class DashboardAnswersCatCard extends React.Component {

  state = { showQuestions: false }

  onShowQuestions = () => {
    let showSwitch = !this.state.showQuestions
    this.setState({ showQuestions: showSwitch })
  }

  render(){

    let distribQuestions

    if(this.state.showQuestions){
      let questions = Object.entries(this.props.cat[1])
      distribQuestions = questions.map(question => {
        return (
          <DashboardAnswersQuestionCard
            key={ questions.indexOf(question) }
            question={ question }
          />
        )
      })
    }

    return(
      <>
        <div className='dashboard_answers_cat_card'
         onClick={ this.onShowQuestions }
        >
          <h4>{ this.props.cat[0] }</h4>
        </div>
        { distribQuestions }
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAnswersCatCard)
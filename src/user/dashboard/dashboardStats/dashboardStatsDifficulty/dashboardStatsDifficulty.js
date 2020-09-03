import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import './dashboardStatsDifficulty.css'

class DashboardStatsDifficulty extends React.Component {

  render(){

    // const easy_questions =
    //   <ul>
    //     <li>Easy</li>
    //     <li>
    //       {this.state.updatedDifficulties ? `${ this.state.user_answers_easy }/${ this.state.all_easy_questions.length } answered` : no_questions_answered }
    //       { `${ this.props.user.questions.totals.answered }` }
    //       {this.state.updatedDifficulties && this.state.user_answers_easy / this.state.all_easy_questions.length ? ` (${((this.state.user_answers_easy / this.state.all_easy_questions.length) * 100).toFixed(2)}%)` : zero_percent }
    //     </li>
    //     <li>
    //       {this.state.updatedDifficulties ? `${ this.state.user_answers_easy_correct }/${ this.state.user_answers_easy } correct` : no_correct_answers }
    //       {this.state.updatedDifficulties && this.state.user_answers_easy_correct / this.state.user_answers_easy ? ` (${((this.state.user_answers_easy_correct / this.state.user_answers_easy ) * 100).toFixed(2)}%)` : zero_percent }
    //     </li>
    //   </ul>

    // const medium_questions =
    //   <ul>
    //     <li>Medium</li>
    //     <li>
    //       {this.state.updatedDifficulties ? `${ this.state.user_answers_medium }/${ this.state.all_medium_questions.length } answered` : no_questions_answered }
    //       {this.state.updatedDifficulties && this.state.user_answers_medium / this.state.all_medium_questions.length ? ` (${((this.state.user_answers_medium / this.state.all_medium_questions.length) * 100).toFixed(2)}%)` : zero_percent }
    //     </li>
    //     <li>
    //       {this.state.updatedDifficulties ? `${ this.state.user_answers_medium_correct }/${ this.state.user_answers_medium } correct` : no_correct_answers }
    //       {this.state.updatedDifficulties && this.state.user_answers_medium_correct / this.state.user_answers_medium ? ` (${((this.state.user_answers_medium_correct / this.state.user_answers_medium ) * 100).toFixed(2)}%)` : zero_percent }
    //     </li>
    //   </ul>

    // const hard_questions =
    //   <ul>
    //     <li>Hard</li>
    //     <li>
    //       {this.state.updatedDifficulties ? `${ this.state.user_answers_hard }/${ this.state.all_hard_questions.length } answered` : no_questions_answered }
    //       {this.state.updatedDifficulties && this.state.user_answers_hard / this.state.all_hard_questions.length ? ` (${((this.state.user_answers_hard / this.state.all_hard_questions.length) * 100).toFixed(2)}%)` : zero_percent }
    //     </li>
    //     <li>
    //       {this.state.updatedDifficulties ? `${ this.state.user_answers_hard_correct }/${ this.state.user_answers_hard } correct` : no_correct_answers }
    //       {this.state.updatedDifficulties && this.state.user_answers_hard_correct / this.state.user_answers_hard ? ` (${((this.state.user_answers_hard_correct / this.state.user_answers_hard ) * 100).toFixed(2)}%)` : zero_percent }
    //     </li>
    //   </ul>

    return(
      <div className="stats_difficulty">
        <div className="stats_header">
          <h3> Difficulty </h3>
        </div>
        <div className="stats_body">
          {/* { easy_questions } */}


          {/* { medium_questions } */}
          {/* { hard_questions } */}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsDifficulty)
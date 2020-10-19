import React from 'react'
import { connect} from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardStatsDifficultyCatCard from '../dashboardStatsDifficultyCatCard/dashboardStatsDifficultyCatCard'

import './dashboardStatsDifficultyAnswersContainer.css'

class DashboardStatsDifficultyAnswersContainer extends React.Component {


  render(){

    let cats = Object.entries(this.props.cats)

    let distribCats = cats.map(questions => {
      return(
        <DashboardStatsDifficultyCatCard
          key={ cats.indexOf(questions) }
          cat={ questions[0] }
          questions={ questions[1] }
        />
      )
    })

    return(
      <div className='dashboard_stats_difficulty_answers_container'>
          { distribCats }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsDifficultyAnswersContainer)
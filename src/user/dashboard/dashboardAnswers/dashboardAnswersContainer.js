import React from 'react'
import { connect} from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardAnswersDiffCard from './dashboardAnswersDiffCard/dashboardAnswersDiffCard'

import './dashboardAnswersContainer.css'

class DashboardAnswersContainer extends React.Component {

  render(){

    let diffs = Object.entries(this.props.user.questions)

    let diffCards =
     diffs.map(diff => {
      if(diff[0] !== 'totals' && diff[0] !== 'ids') {
        return <DashboardAnswersDiffCard
          key={ diffs.indexOf(diff) }
          diff={ diff }
        />
      }
      else return null
    })

    return(
      <div className='dashboard_answers_container'>
        { this.props.user.questions.totals.all.answered === 0 ? <h3>You have not answered any questions yet</h3> : diffCards }
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardAnswersContainer)
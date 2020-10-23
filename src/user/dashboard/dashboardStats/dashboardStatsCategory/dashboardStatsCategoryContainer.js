import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardStatsCard from '../dashboardStatsComponents/dashboardStatsCard/dashboardStatsCard'

import './dashboardStatsCategory.css'

class DashboardStatsCategoryContainer extends React.Component {
  render(){

    var distribCats

    if(this.props.user.questions){
      let answers = 'null', allAnswers = this.props.user.questions, catTotals = Object.entries(this.props.user.questions.totals.categories)
      distribCats = catTotals.map(cat => {
        let statCard, sortCats = {}
        if(this.props.questions.totals.category[cat[0]]) {
          for(let diff in allAnswers) {
            if(diff !== 'totals' &&
               diff !== 'ids' &&
               !!allAnswers[diff].categories[cat[0]]) {
              sortCats[diff] = { ...sortCats[diff], ...allAnswers[diff].categories[cat[0]] }
            }
          if(!!sortCats[diff]) answers = sortCats
          }
          statCard = <DashboardStatsCard
                      answers={ answers }
                      history={ this.props.history }
                      key={ catTotals.indexOf(cat) + 1 }
                      cat={ cat[0] }
                      qSet={ cat }
                      totals={ this.props.questions.totals.category }
                    />
        }
        return statCard
      })
    }

    return(
      <div className="stats_sub_container">
        <div className="stats_sub_header">
          <h3>Categories</h3>
        </div>
        { distribCats }
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsCategoryContainer)
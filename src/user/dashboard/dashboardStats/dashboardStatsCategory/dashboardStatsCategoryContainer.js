import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardStatsCategoryCard from './dashboardStatsCategoryCard/dashboardStatsCategoryCard'

import './dashboardStatsCategory.css'

class DashboardStatsCategoryContainer extends React.Component {
  render(){

    var distribCats

    if(this.props.user.questions){
      let cats = Object.entries(this.props.user.questions.totals.categories)
      distribCats = cats.map(cat => {
        let statCard
        if(this.props.questions.totals.category[`${ cat[0] }`]) {
          statCard = <DashboardStatsCategoryCard
                      key={ cats.indexOf(cat) + 1 }
                      category={ cat }
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
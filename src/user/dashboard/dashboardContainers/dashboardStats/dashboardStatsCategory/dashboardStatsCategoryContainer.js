import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardStatsCard from '../dashboardStatsComponents/dashboardStatsCard/dashboardStatsCard'

import './dashboardStatsCategory.css'

class DashboardStatsCategoryContainer extends React.Component {
  render(){

    var distribAnswers

    if(this.props.user.questions){
      let allAnswers = this.props.user.questions.list, catTotals = Object.entries(this.props.user.questions.totals.category)
          // console.log(catTotals[0])
          // console.log(allAnswers)


      distribAnswers = catTotals.map((cat, index) => {
        let statCard, sortAnswers = {}
        // if(this.props.questions.totals.category[cat[0]]) {

          for(let answer in allAnswers) {
                if(allAnswers[answer].category === cat[0]) {
                  // console.log(cat[0])
                  sortAnswers[answer] = allAnswers[answer]
                }
          }
        // }

          //       // if(diff !== 'totals' &&
          //   //        diff !== 'ids' &&
          //   //        !!allAnswers[diff].categories[cat[0]]) {
          //       if(allAnswers[answer].category === cat[0]) {
          //         console.log(!!sortAnswers[cat[0]])
          //         if(!!sortAnswers[cat[0]]) sortAnswers[cat[0]] = { answer: allAnswers[answer] }
          //         else sortAnswers[cat[0]] = { ...sortAnswers[cat[0]], answer: allAnswers[answer] }
          //         // sortAnswers[cat[0]] = { ...sortAnswers[cat[0]],  }
          //         // console.log(cat[0], allAnswers[answer])
          //         sortAnswers[cat[0]] = { ...sortAnswers[cat[0]], answer: allAnswers[answer] }
          //       }
          //         // sortCats[diff] = { ...sortCats[diff], ...allAnswers[diff].categories[cat[0]] }
          //   }
                  // console.log(sortAnswers)
          statCard = <DashboardStatsCard
                      answers={ Object.values(sortAnswers).length !== 0 ? sortAnswers : 'null' }
                      history={ this.props.history }
                      key={ index + 1 }
                      cat={ cat[0] }
                      qSet={ cat }
                      totals={ this.props.questions.totals.category }
                    />
        // }
        return statCard
      })
    }

    return(
      <div className="stats_sub_container">
        <div className="stats_sub_header">
          <h3>Categories</h3>
        </div>
        { distribAnswers }
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
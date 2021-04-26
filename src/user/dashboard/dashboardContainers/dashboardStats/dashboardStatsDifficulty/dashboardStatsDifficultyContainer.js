import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import DashboardStatsCard from '../dashboardStatsComponents/dashboardStatsCard/dashboardStatsCard'

import './dashboardStatsDifficulty.css'

class DashboardStatsDifficultyContainer extends React.Component {
  render(){

    var distribAnswers

    // if(this.props.user.questions){
    //   let allAnswers = this.props.user.questions, diffTotals = Object.entries(this.props.user.questions.totals.difficulty)
    //   distribAnswers = diffTotals.map(diff => {
    //     return (<DashboardStatsCard
    //       answers={ !!allAnswers[diff[0]] ? allAnswers[diff[0]].categories : "null" }
    //       history={ this.props.history }
    //       diff={ diff[0] }
    //       key={ diffTotals.indexOf(diff) + 1 }
    //       qSet={ diff }
    //       totals={ this.props.questions.totals.difficulty }
    //     />)
    //     }
    //   )
    // }

    if(this.props.user.questions){
      let allAnswers = this.props.user.questions.list, diffTotals = Object.entries(this.props.user.questions.totals.difficulty)
          // console.log(catTotals[0])
          // console.log(allAnswers)


      distribAnswers = diffTotals.map((diff, index) => {
        let statCard, sortAnswers = {}
        // if(this.props.questions.totals.category[cat[0]]) {

          for(let answer in allAnswers) {
                if(allAnswers[answer].difficulty === diff[0]) {
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
                      diff={ diff[0] }
                      qSet={ diff }
                      totals={ this.props.questions.totals.difficulty }
                    />
        // }
        return statCard
      })
    }

    return(
      <div className="stats_sub_container">
        <div className="stats_sub_header">
          <h3>Difficulties</h3>
        </div>
        { distribAnswers[0] }
        { distribAnswers[2] }
        { distribAnswers[1] }
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardStatsDifficultyContainer)
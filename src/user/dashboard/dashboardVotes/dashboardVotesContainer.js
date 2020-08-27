import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import './dashboardVotes.css'

class DashboardVotesContainer extends React.Component {

  render(){
    return(
      <div className={ "votes_wrapper"}>
      {/* { this.state.userVotes.length === 0 ? no_votes_header: distributeCombineQuestionsVotes } */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardVotesContainer)
import React from 'react'

import { connect } from 'react-redux'
// import * as actions from '../../../store/actions/actionIndex'

import './dashboardVotes.css'

class DashboardVotesCard extends React.Component {

  render(){
    return(
			<div className="vote_card">
				{/* <div className={ vote_header_switch }>
					<h3>{ this.props.question.question_desc }</h3>
				</div>
				<h4>Overall Votes</h4>
				<ul>
					<li><h4>Up Votes</h4> { this.calculateUpVotes() }</li>
					<li><h4>No Votes</h4> { this.calculateNoVotes() }</li>
					<li><h4>Down Votes</h4> { this.calculateDownVotes() }</li>
				</ul>
				<span><h4>Your Vote</h4> { this.state.vote }</span> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardVotesCard)
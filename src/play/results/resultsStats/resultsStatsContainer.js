import React from 'react'
import { connect } from 'react-redux'

import {
  setVote,
  updateVoteStatus,
} from '../../../store/actions/actionIndex'

import ResultsHeader from '../resultsHeader/resultsHeader'
import ResultsAnswer from '../resultsAnswer/resultsAnswer'
import ResultsStats from './resultsStats'

import './resultsStatsContainer.css'

class ResultsStatsContainer extends React.Component{

  state = {
    showHeader: false,
    showCorrectAnswer: false,
    showStats: false,
  }

  componentDidMount(){
    this.headerTimeout = setTimeout(() => { this.setState({ showHeader: true })}, 100)
    if(this.props.play.results.result === "Incorrect") this.correctAnswerTimeout = setTimeout(() => { this.setState({ showCorrectAnswer: true })}, 1000)
    this.statsTimeout = setTimeout(() => { this.setState({ showStats: true })}, 1500)
  }

  componentWillUnmount(){
    clearTimeout(this.headerTimeout)
    clearTimeout(this.correctAnswerTimeout)
    clearTimeout(this.statsTimeout)
  }

  render(){
    return(
      <div className="results_stats_container">
        <ResultsHeader showHeader={ this.state.showHeader } />
        <ResultsAnswer showCorrectAnswer={ this.state.showCorrectAnswer } />
        <ResultsStats showStats={ this.state.showStats } />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    play: state.play,
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateVoteStatus: (status, loading) => dispatch(updateVoteStatus(status, loading)),
    onSetVote: (obj) => dispatch(setVote(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsStatsContainer)
import React from 'react'
import { connect } from 'react-redux'

import {
  setVote,
  updateVoteStatus,
} from '../../../store/actions/actionIndex'

import ResultsHeader from '../resultsHeader/resultsHeader'
import ResultsAnswer from '../resultsAnswer/resultsAnswer'
import ResultsStats from './resultsStats'
import ResultsAchievementsContainer from '../resultsAchievements/resultsAchievementsContainer'

import './resultsStatsContainer.css'

class ResultsStatsContainer extends React.Component{

  state = {
    showHeader: false,
    showCorrectAnswer: false,
    showAchievements: false,
    showStats: false,
  }

  componentDidMount(){
    if(!this.props.staticResults) {
      this.headerTimeout = setTimeout(() => { this.setState({ showHeader: true })}, 100)
      if(this.props.play.results && this.props.play.results.result === "Incorrect") this.correctAnswerTimeout = setTimeout(() => { this.setState({ showCorrectAnswer: true })}, 1000)
      this.statsTimeout = setTimeout(() => { this.setState({ showStats: true })}, 1250)
      this.showAchievementsTimeout = setTimeout(() => { this.setState({ showAchievements: true })}, 1500)
    } else {
      this.setState({
        showHeader: true,
        showCorrectAnswer: this.props.questions.staticUserResults && this.props.questions.staticUserResults.result === "Incorrect",
        showStats: true,
        showAchievements: true
      })
    }
  }

  componentWillUnmount(){
    if(!this.props.staticResults) {
      clearTimeout(this.headerTimeout)
      clearTimeout(this.correctAnswerTimeout)
      clearTimeout(this.statsTimeout)
      clearTimeout(this.showAchievementsTimeout)
    }
  }

  render(){

    const resultsBlock =
      <div className="results_stats_container">
        <ResultsHeader
          staticResults={ this.props.staticResults }
          showHeader={ this.state.showHeader }
        />
        <ResultsAnswer
          staticResults={ this.props.staticResults }
          showCorrectAnswer={ this.state.showCorrectAnswer }
        />
        <ResultsStats
          staticResults={ this.props.staticResults }
          showStats={ this.state.showStats }
        />
        <ResultsAchievementsContainer
          staticResults={ this.props.staticResults }
          showAchievements={ this.state.showAchievements }
        />
      </div>

    return(
      <>
        { !this.props.staticResults && resultsBlock }
        { this.props.questions.staticQuestion && this.props.questions.staticUserResults && resultsBlock }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    play: state.play,
    user: state.user,
    achievements: state.achievements,
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
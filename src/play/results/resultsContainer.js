import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  setVote,
  updateVoteStatus,
} from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths'

import ResultsNavBarContainer from './resultsNavBar/resultsNavBarContainer'
import ResultsStatsContainer from './resultsStats/resultsStatsContainer'
import ResultsVote from './resultsVote/resultsVote'
import ResultsDiscussContainer from './resultsDiscuss/resultsDiscussContainer'
import ResultsNextQuestion from './resultsNextQuestion/resultsNextQuestion'
import StatsLegend from '../../UI/statsLegend/statsLegend'

import './resultsContainer.css'

class ResultsContainer extends React.Component{

  state = {
    showVoteButtons: false,
    showNextQuestionButton: false,
    enableVoteButtons: false,
    enableNextQuestionButton: false,
    showLegend: false
  }

  componentDidMount(){
    document.title = `SmartApp™ | Play | ${ this.props.play.gameMode } | Results`

    this.voteButtonsTimeout = setTimeout(() => { this.setState({ showVoteButtons: true })}, 2000)
    this.enableVoteButtonsTimeout = setTimeout(() => { this.setState({ enableVoteButtons: true })}, 2250)
    this.nextQuestionButtonTimeout = setTimeout(() => { this.setState({ showNextQuestionButton: true })}, 2500)
    this.enableNextQuestionButtonTimeout = setTimeout(() => { this.setState({ enableNextQuestionButton: true })}, 2750)
    this.showLegendTimeout = setTimeout(() => { this.setState({ showLegend: true })}, 3000)
  }

  componentWillUnmount(){
    clearTimeout(this.voteButtonsTimeout)
    clearTimeout(this.enableVoteButtonsTimeout)
    clearTimeout(this.nextQuestionButtonTimeout)
    clearTimeout(this.enableNextQuestionTimeout)
    clearTimeout(this.showLegendTimeout)
  }

  onClickVoteFunctions = (event) => {
    event.persist()
    this.props.onSetVote({
      uid: localStorage.id,
      qid: this.props.play.question.id,
      question: this.props.play.question.question,
      difficulty: this.props.play.question.difficulty,
      category: this.props.play.question.category,
      answer: this.props.play.answer.choice,
      correct_answer: this.props.play.results.correct_answer,
      result: this.props.play.results.result,
      vote: event.target.attributes.vote.value
    })
    this.props.onUpdateVoteStatus('initVote', true)
    this.setState({ showVoteButtons: false, enableVoteButtons: false })
  }

  onDisableNextQuestionButton = () => { this.setState({ enableNextQuestionButton: false }) }

  render(){
    return(
      <div className='results_container'>
        <ResultsNavBarContainer />
        <Switch>
          <Route exact path={ routes[this.props.play.gameMode] + '/results/stats' }>
            <ResultsStatsContainer history={ this.props.history } />
          </Route>
          <Route exact path={ routes[this.props.play.gameMode] + '/results/discuss' }>
            <ResultsDiscussContainer history={ this.props.history } />
          </Route>
        </Switch>
        <ResultsVote
          enableVoteButtons={ this.state.enableVoteButtons }
          showVoteButtons={ this.state.showVoteButtons }
          onClickVoteFunctions={ this.onClickVoteFunctions }
        />
        <ResultsNextQuestion
          showNextQuestionButton={ this.state.showNextQuestionButton }
          enableNextQuestionButton={ this.state.enableNextQuestionButton }
          onDisableNextQuestionButton= { this.onDisableNextQuestionButton }
        />
        { this.state.showLegend && <StatsLegend /> }
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

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)
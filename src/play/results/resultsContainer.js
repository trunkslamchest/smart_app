import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  setVote,
  updateVoteStatus,
  getStaticQuestion,
  clearStaticQuestion,
  clearQuestionStatus,
  setStaticUserQuestion,
  clearStaticUserQuestion
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
    cat: null,
    diff: null,
    displayStaticResults: false,
    enableNextQuestionButton: false,
    enableVoteButtons: false,
    initDefaultResults: false,
    initStaticResults: false,
    initStaticUserResults: false,
    showLegend: false,
    showNextQuestionButton: false,
    showVoteButtons: false,
    staticUserQuestion: null,
    qid: null
  }

  componentDidMount(){
    if(!this.props.staticResults) {
      document.title = `SmartApp™ | Play | ${ this.props.play.gameMode } | Results`
      this.startResultTimers()
    } else {
      let parseLocation = this.props.history.location.pathname.split("/")

      if(parseLocation[parseLocation.length - 1] === 'stats' || parseLocation[parseLocation.length - 1] === 'discuss' ) parseLocation.pop()

      let qid = parseLocation[parseLocation.length - 1],
          cat = parseLocation[parseLocation.length - 2],
          diff = parseLocation[parseLocation.length - 3]

      document.title = `SmartApp™ | Results | ${ qid }`
      this.setState({ cat: cat, diff: diff, qid: qid })
    }

  }

  componentDidUpdate(){
    if(this.props.staticResults && !this.state.initStaticResults){
      this.props.onGetStaticQuestion({ qid: this.state.qid, category: this.state.cat, difficulty: this.state.diff })
      this.setState({ initStaticResults: true })
    }

    if(this.props.questions.staticQuestion && !this.state.initStaticUserResults && this.props.user.questions) {
      this.props.onSetStaticUserQuestion(this.props.user.questions[this.state.diff].categories[this.state.cat][this.state.qid])
      this.setState({ initStaticUserResults: true })
    }

    if(this.props.questions.staticUserResults && !this.state.displayStaticResults) {
      this.setState({ displayStaticResults: true })
      this.startResultTimers()
    }
  }

  startResultTimers = () => {
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
    this.props.onClearStaticQuestion()
    this.props.onClearStaticUserQuestion()
    this.props.onClearQuestionStatus()
    this.setState({ displayStaticResults: false, initDefaultResults: false, initStaticResults: false, initStaticUserResults: false })
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
    let routeBoard

    if(this.props.staticResults){
      if(this.state.displayStaticResults) {
        routeBoard =
          <Switch>
            <Route exact path={ routes.static_results + '/' + this.state.diff + '/' + this.state.cat + '/' + this.state.qid + '/stats' }>
              <ResultsStatsContainer staticUserQuestion={ this.state.staticUserQuestion } history={ this.props.history } />
            </Route>
            <Route exact path={ routes.static_results + '/' + this.state.diff + '/' + this.state.cat + '/' + this.state.qid + '/discuss' }>
              <ResultsDiscussContainer history={ this.props.history } />
            </Route>
          </Switch>
      }
    } else {
      routeBoard =
        <Switch>
          <Route exact path={ routes[this.props.play.gameMode] + '/results/stats' }>
            <ResultsStatsContainer history={ this.props.history } />
          </Route>
          <Route exact path={ routes[this.props.play.gameMode] + '/results/discuss' }>
            <ResultsDiscussContainer history={ this.props.history } />
          </Route>
        </Switch>
    }

    return(
      <div className='results_container'>
        <ResultsNavBarContainer staticResults={ this.props.staticResults } qid={ this.state.qid } diff={ this.state.diff } cat={ this.state.cat } />
        { routeBoard }
        <ResultsVote
          enableVoteButtons={ this.state.enableVoteButtons }
          showVoteButtons={ this.state.showVoteButtons }
          onClickVoteFunctions={ this.onClickVoteFunctions }
        />
        { !this.props.staticResults &&
          <ResultsNextQuestion
            showNextQuestionButton={ this.state.showNextQuestionButton }
            enableNextQuestionButton={ this.state.enableNextQuestionButton }
            onDisableNextQuestionButton= { this.onDisableNextQuestionButton }
          />
        }
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
    onGetStaticQuestion: (obj) => dispatch(getStaticQuestion(obj)),
    onSetStaticUserQuestion: (obj) => dispatch(setStaticUserQuestion(obj)),
    onClearStaticUserQuestion: () => dispatch(clearStaticUserQuestion()),
    onClearStaticQuestion: () => dispatch(clearStaticQuestion()),
    onClearQuestionStatus: () => dispatch(clearQuestionStatus()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)
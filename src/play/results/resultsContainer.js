import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '../../utility/paths'
import { connect } from 'react-redux'
import {
  getStaticQuestion,
  clearStaticQuestion,
  clearQuestionStatus,
  setStaticUserQuestion,
  clearStaticUserQuestion,
  clearStaticQuestionVoteStatus,
  clearStaticUserVote
} from '../../store/actions/actionIndex'

import ResultsStatsContainer from './resultsStats/resultsStatsContainer'
import ResultsDiscussContainer from './resultsDiscuss/resultsDiscussContainer'
import ResultsNextQuestion from './resultsNextQuestion/resultsNextQuestion'

import StatsLegend from '../../UI/statsLegend/statsLegend'
import NavBarContainer from '../../UI/navBar/navBarContainer'

import './resultsContainer.css'

class ResultsContainer extends React.Component{

  state = {
    cat: null,
    diff: null,
    displayStaticResults: false,
    enableNextQuestionButton: false,
    initDefaultResults: false,
    initStaticResults: false,
    initStaticUserResults: false,
    showLegend: false,
    showNextQuestionButton: false,
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
      this.setState({
        displayStaticResults: true,
        enableNextQuestionButton: true,
        showLegend: true
      })
    }
  }

  startResultTimers = () => {
    this.nextQuestionButtonTimeout = setTimeout(() => { this.setState({ showNextQuestionButton: true })}, 2500)
    this.enableNextQuestionButtonTimeout = setTimeout(() => { this.setState({ enableNextQuestionButton: true })}, 2750)
    this.showLegendTimeout = setTimeout(() => { this.setState({ showLegend: true })}, 3000)
  }

  componentWillUnmount(){
    clearTimeout(this.nextQuestionButtonTimeout)
    clearTimeout(this.enableNextQuestionTimeout)
    clearTimeout(this.showLegendTimeout)
    this.props.onClearStaticQuestion()
    this.props.onClearStaticUserQuestion()
    this.props.onClearQuestionStatus()
    this.props.onClearStaticQuestionVoteStatus()
    this.props.onClearStaticUserVote()
    this.setState({ displayStaticResults: false, initDefaultResults: false, initStaticResults: false, initStaticUserResults: false })
  }

  onDisableNextQuestionButton = () => { this.setState({ enableNextQuestionButton: false }) }

  render(){
    let routeBoard

    const baseStaticRoute = routes.static_results + '/' + this.state.diff + '/' + this.state.cat + '/' + this.state.qid

    const navButtons = [
      { name: 'results', text: 'Results', route: this.props.staticResults ? baseStaticRoute + '/stats' : routes[this.props.play.gameMode] + '/results/stats' },
      { name: 'discuss', text: 'Discuss', route: this.props.staticResults ? baseStaticRoute + '/discuss' : routes[this.props.play.gameMode] + '/results/discuss' }
    ]

    if(this.props.staticResults){
      if(this.state.displayStaticResults) {
        routeBoard =
          <Switch>
            <Route exact path={ baseStaticRoute + '/stats' }>
              <ResultsStatsContainer
                history={ this.props.history }
                staticResults={ this.props.staticResults }
              />
            </Route>
            <Route exact path={ baseStaticRoute + '/discuss' }>
              <ResultsDiscussContainer
                cat={ this.state.cat }
                diff={ this.state.diff }
                history={ this.props.history }
                qid={ this.state.qid }
                staticResults={ this.props.staticResults }
              />
            </Route>
          </Switch>
      }
    } else {
      routeBoard =
        <Switch>
          <Route exact path={ routes[this.props.play.gameMode] + '/results/stats' }>
            <ResultsStatsContainer
              history={ this.props.history }
              staticResults={ this.props.staticResults }
            />
          </Route>
          <Route exact path={ routes[this.props.play.gameMode] + '/results/discuss' }>
            <ResultsDiscussContainer
              history={ this.props.history }
              staticResults={ this.props.staticResults }
            />
          </Route>
        </Switch>
    }

    return(
      <div className='results_container'>
        <NavBarContainer buttons={ navButtons } />
        { routeBoard }
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
    onGetStaticQuestion: (obj) => dispatch(getStaticQuestion(obj)),
    onSetStaticUserQuestion: (obj) => dispatch(setStaticUserQuestion(obj)),
    onClearStaticUserQuestion: () => dispatch(clearStaticUserQuestion()),
    onClearStaticQuestion: () => dispatch(clearStaticQuestion()),
    onClearQuestionStatus: () => dispatch(clearQuestionStatus()),
    onClearStaticQuestionVoteStatus: () => dispatch(clearStaticQuestionVoteStatus()),
    onClearStaticUserVote: () => dispatch(clearStaticUserVote())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)
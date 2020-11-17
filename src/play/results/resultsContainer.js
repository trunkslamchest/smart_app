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
  clearStaticUserVote,
  loading,
  updateGameStatus,
  setGameState,
  resetQuestion,
  resetAnswer,
  resetResults,
  resetVote,
  resetComment
} from '../../store/actions/actionIndex'

import makeResultsNavBarButtons from './resultsFunctions/makeResultsNavBarButtons'

import ResultsStatsContainer from './resultsStats/resultsStatsContainer'
import ResultsDiscussContainer from './resultsDiscuss/resultsDiscussContainer'
import DefaultButtonsContainer from '../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'
import StatsLegend from '../../UI/statsLegend/statsLegend'

import resultsNavBarIconIndex from '../../assets/nav_bar_icons/resultsNavBarIconIndex'

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

  onClickNextQuestionFunction = () => {
    this.props.onSetGameState('reInit')
    this.props.onUpdateGameStatus('reInitGame', true)
    this.props.onLoadingModal(true)
    this.onDisableNextQuestionButton()
    if(this.props.play.question) this.props.onResetQuestion()
    if(this.props.play.answer) this.props.onResetAnswer()
    if(this.props.play.results) this.props.onResetResults()
    if(this.props.play.voteStatus) this.props.onResetVote()
    if(this.props.play.commentStatus) this.props.onResetComment()
  }

  render(){
    const baseStaticRoute = routes.static_results + '/' + this.state.diff + '/' + this.state.cat + '/' + this.state.qid

    let routeBoard
    let statsRoute = this.props.staticResults ? baseStaticRoute + '/stats' : routes[this.props.play.gameMode] + '/results/stats'
    let discussRoute = this.props.staticResults ? baseStaticRoute + '/discuss' : routes[this.props.play.gameMode] + '/results/discuss'
    let navBarButtons = makeResultsNavBarButtons(resultsNavBarIconIndex, { stats: statsRoute, discuss: discussRoute })

    const nextQuestionButton = [
      {
        buttonClass: 'next_question_button',
        id: 'next_question_button',
        name: 'nextQuestionButton',
        enableButton: this.state.enableNextQuestionButton,
        onClickFunction: this.onClickNextQuestionFunction,
        text: "Next Question",
        tooltipText: [ 'Answer another question' ],
        tooltipClass: 'next_question_button_tooltip',
        type: 'button'
      }
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
            { this.state.showNextQuestionButton &&
              <DefaultButtonsContainer
                buttons={ nextQuestionButton }
                containerClass={ 'next_question_buttons_container' }
                enableButton={ this.state.enableNextQuestionButton }
              />
            }
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
      <>
        <DefaultButtonsContainer
          buttons={ navBarButtons }
          buttonClass={ 'nav_bar_button' }
          containerClass={ 'nav_bar_container' }
          enableButton={ true }
          tooltipClass={ 'nav_bar_tooltip' }
        />
        <div className='results_wrapper'>
          { routeBoard }
          { this.state.showLegend && <StatsLegend /> }
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
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
    onClearStaticUserVote: () => dispatch(clearStaticUserVote()),
    onLoadingModal: (bool) => dispatch(loading(bool)),
    onUpdateGameStatus: (status, loading) => dispatch(updateGameStatus(status, loading)),
    onSetGameState: (state) => dispatch(setGameState(state)),
    onResetQuestion: () => dispatch(resetQuestion()),
    onResetAnswer: () => dispatch(resetAnswer()),
    onResetResults: () => dispatch(resetResults()),
    onResetVote: (obj) => dispatch(resetVote(obj)),
    onResetComment: (obj) => dispatch(resetComment(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)
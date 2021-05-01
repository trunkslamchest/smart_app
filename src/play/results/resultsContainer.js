import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '../../utility/paths'
import { connect } from 'react-redux'
import {
  clearStaticQuestion,
  clearQuestionStatus,
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
  resetComment,
  help,
  setHelpHeader,
  setHelpSections
} from '../../store/actions/actionIndex'

import makeResultsNavBarButtons from './resultsFunctions/makeResultsNavBarButtons'
import makeResultsHelpSections from './resultsFunctions/makeResultsHelpSections'

import ResultsStatsContainer from './resultsStats/resultsStatsContainer'
import ResultsDiscussContainer from './resultsDiscuss/resultsDiscussContainer'
import DefaultButtonsContainer from '../../UI/buttons/defaultButtonsContainer/defaultButtonsContainer'

import resultsNavBarIconIndex from '../../assets/nav_bar_icons/resultsNavBarIconIndex'

import './resultsContainer.css'

class ResultsContainer extends React.Component{

  state = {
    enableNextQuestionButton: false,
    showNextQuestionButton: false
  }

  componentDidMount(){
    if(!this.props.staticResults) {
      document.title = `SmartApp™ | Play | ${ this.props.play.gameMode } | Results`
      this.startResultTimers()
    }

    if(!this.props.play.question && !this.props.staticResults) this.props.history.push( routes.play )
  }

  startResultTimers = () => {
    this.nextQuestionButtonTimeout = setTimeout(() => { this.setState({ showNextQuestionButton: true })}, 2500)
    this.enableNextQuestionButtonTimeout = setTimeout(() => { this.setState({ enableNextQuestionButton: true })}, 2750)
  }

  componentWillUnmount(){
    clearTimeout(this.nextQuestionButtonTimeout)
    clearTimeout(this.enableNextQuestionTimeout)
    this.props.onClearStaticQuestion()
    this.props.onClearStaticUserQuestion()
    this.props.onClearQuestionStatus()
    this.props.onClearStaticQuestionVoteStatus()
    this.props.onClearStaticUserVote()
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
    // this.props.history.push(routes[this.props.gameMode] + '/question')
  }

  onHelp = () => {
    this.props.onSetHelpHeader('SmartApp™ Results')
    this.props.onSetHelpSections(makeResultsHelpSections)
    this.props.onHelpModal(true)
  }

  onPushLink = (event) => {
    let buttonParams = JSON.parse(event.target.attributes.params.value)
    this.props.history.push(buttonParams.route)
  }

  render(){

    const baseStaticRoute = routes.static_results + '/' + this.props.diff + '/' + this.props.cat + '/' + this.props.qid

    let routeBoard
    let statsRoute = this.props.staticResults ? baseStaticRoute + '/stats' : routes[this.props.play.gameMode] + '/results/stats'
    let discussRoute = this.props.staticResults ? baseStaticRoute + '/discuss' : routes[this.props.play.gameMode] + '/results/discuss'
    let navBarButtons = makeResultsNavBarButtons(resultsNavBarIconIndex, this.onHelp, this.onPushLink, { stats: statsRoute, discuss: discussRoute })

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
              cat={ this.props.cat }
              diff={ this.props.diff }
              history={ this.props.history }
              qid={ this.props.qid }
              staticResults={ this.props.staticResults }
            />
          </Route>
        </Switch>
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
        </div>
      </>
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
    onHelpModal: (bool) => dispatch(help(bool)),
    onSetHelpHeader: (header) => dispatch(setHelpHeader(header)),
    onSetHelpSections: (sections) => dispatch(setHelpSections(sections))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer)
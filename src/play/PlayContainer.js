import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../store/actions/actionIndex'

import { routes } from '../utility/paths'

import QuickPlayContainer from './quickPlay/quickPlayContainer'
import ByDifficultyContainer from './byDifficulty/byDifficultyContainer'
import ByCategoryContainer from './byCategory/byCategoryContainer'


class PlayContainer extends React.Component {

  componentDidMount(){
    this.props.onSetGameState('init')
  }

  componentWillUnmount(){
    this.props.onResetGameMode()
    this.props.onResetQuestion()
    this.props.onResetGameState()
    this.props.onResetAnswer()
    this.props.onResetResults()
  }

  render(){
    return(
      <>
        <Switch>
          <Route path={ routes.quick_play }>
            <QuickPlayContainer history={ this.props.history } />
          </Route>
          <Route path={ routes.by_diff }>
            <ByDifficultyContainer history={ this.props.history } />
          </Route>
          <Route path={ routes.by_cat }>
            <ByCategoryContainer history={ this.props.history } />
          </Route>
        </Switch>
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
    onResetGameMode: () => dispatch(actions.resetGameMode()),
    onSetGameMode: (mode) => dispatch(actions.setGameMode(mode)),
    onGetQuickQuestion: (obj) => dispatch(actions.getQuickQuestion(obj)),
    onResetQuestion: () => dispatch(actions.resetQuestion()),
    onSetAnswer: (obj) => dispatch(actions.setAnswer(obj)),
    onResetAnswer: () => dispatch(actions.resetAnswer()),
    onGetResults: (obj) => dispatch(actions.getResults(obj)),
    onResetResults: () => dispatch(actions.resetResults()),
    onSetGameState: (state) => dispatch(actions.setGameState(state)),
    onResetGameState: () => dispatch(actions.resetGameState()),
    onSetVote: (obj) => dispatch(actions.setVote(obj)),
    onResetVote: (obj) => dispatch(actions.resetVote(obj)),
    onSetComment: (obj) => dispatch(actions.setComment(obj)),
    onResetComment: (obj) => dispatch(actions.resetComment(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayContainer)
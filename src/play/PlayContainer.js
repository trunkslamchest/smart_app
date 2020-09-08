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
  }

  render(){
    return(
      <>
        <Switch>
          <Route path={ routes.quick_play }>
            <QuickPlayContainer history={ this.props.history } />
          </Route>
          <Route path={ routes.by_diff }>
            <ByDifficultyContainer />
          </Route>
          <Route path={ routes.by_cat }>
            <ByCategoryContainer />
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
    onGetAnswerResults: (obj) => dispatch(actions.getAnswerResults(obj)),
    onSetGameState : (state) => dispatch(actions.setGameState(state)),
    onResetGameState : () => dispatch(actions.resetGameState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayContainer)
import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import gameModes from '../../datasets/gameModes'
// import categories from '../../datasets/categories'

import SelectGameModeButton from './selectGameModeButton/selectGameModeButton'

import './selectGameModeContainer.css'

class SelectGameModeContainer extends React.Component {

  state = {
    gameModes: null
  }

  componentDidMount(){
    document.title = "SmartApp™ | Play"
    this.setState({ gameModes: gameModes })

    // if(this.props.play.gameMode === 'by_diff') {
    //   document.title = "SmartApp™ | Play | Difficulty | Select"
    //   this.setState({ set: 'Difficulty', subSet: difficulties })
    // }

    // if(this.props.play.gameMode === 'by_cat') {
    //   document.title = "SmartApp™ | Play | Category | Select"
    //   this.setState({ set: 'Category', subSet: categories })
    // }
  }

  componentDidUpdate(){
  }

  componentWillUnmount(){
  }

  render(){

    let distribButtons

    if(this.state.gameModes){
      distribButtons = this.state.gameModes.map(gameMode =>
        <SelectGameModeButton
          key={ this.state.gameModes.indexOf(gameMode) }
          name={ gameMode.name }
          value={ gameMode.value }
        />
      )
    }

    return(
      <div className='select_game_mode_container'>
        <h1> Select A Game Mode </h1>
        <div className="select_game_mode_buttons_container">
          { distribButtons }
        </div>
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
    onResetGameMode: () => dispatch(actions.resetGameMode()),
    onSetGameMode: (mode) => dispatch(actions.setGameMode(mode)),
    onSetGameState: (state) => dispatch(actions.setGameState(state)),
    onResetGameState: () => dispatch(actions.resetGameState()),
    onSetGameQset: (set) => dispatch(actions.setGameQset(set)),
    onResetGameQset: (set) => dispatch(actions.resetGameQset(set)),
    onGetQuickQuestion: (obj) => dispatch(actions.getQuickQuestion(obj)),
    onGetDiffQuestion: (obj) => dispatch(actions.getDiffQuestion(obj)),
    onGetCatQuestion: (obj) => dispatch(actions.getCatQuestion(obj)),
    onResetQuestion: () => dispatch(actions.resetQuestion()),
    onSetAnswer: (obj) => dispatch(actions.setAnswer(obj)),
    onResetAnswer: () => dispatch(actions.resetAnswer()),
    onGetResults: (obj) => dispatch(actions.getResults(obj)),
    onResetResults: () => dispatch(actions.resetResults()),
    onSetVote: (obj) => dispatch(actions.setVote(obj)),
    onResetVote: (obj) => dispatch(actions.resetVote(obj)),
    onSetComment: (obj) => dispatch(actions.setComment(obj)),
    onResetComment: (obj) => dispatch(actions.resetComment(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectGameModeContainer)
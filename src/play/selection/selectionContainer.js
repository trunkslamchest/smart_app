import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import gameModes from '../../datasets/gameModes'
import difficulties from '../../datasets/difficulties'
import categories from '../../datasets/categories'

import SelectionButton from './selectionButton/selectionButton'

import './selectionContainer.css'

class SelectionContainer extends React.Component {

  state = {
    set: null,
    subSet: null,
    gameModes: null
  }

  componentDidMount(){
    if(this.props.play.gameMode === 'by_diff') {
      document.title = "SmartApp™ | Play | Difficulty | Select"
      this.setState({ set: 'Difficulty', subSet: difficulties })
    } else if(this.props.play.gameMode === 'by_cat') {
      document.title = "SmartApp™ | Play | Category | Select"
      this.setState({ set: 'Category', subSet: categories })
    } else {
      document.title = "SmartApp™ | Play | Select"
      this.setState({ gameModes: gameModes })
    }
  }

  componentDidUpdate(){
  }

  componentWillUnmount(){
  }

  render(){

    let distribButtons, varHeaderText = ''

    if(this.state.gameModes){
      varHeaderText = 'Game Mode'
      distribButtons = this.state.gameModes.map(gameMode =>
        <SelectionButton
          key={ this.state.gameModes.indexOf(gameMode) }
          name={ gameMode.name }
          gameMode={ gameMode.val }
        />
      )
    }

    if(this.state.subSet){
      varHeaderText = this.state.set
      distribButtons = this.state.subSet.map(qSet =>
        <SelectionButton
          key={ this.state.subSet.indexOf(qSet) }
          qSet={ qSet }
        />
      )
    }

    return(
      <div className='selection_container'>
        <h1> Select A { varHeaderText } </h1>
        <div className="selection_buttons_container">
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectionContainer)
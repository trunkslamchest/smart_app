import React from 'react'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import difficulties from '../../datasets/difficulties'
import categories from '../../datasets/categories'

import SelectionButton from './selectionButton'

import './selectionContainer.css'

class SelectionContainer extends React.Component {

  state = {
    set: null,
    subSet: null,
    selection: null
  }

  componentDidMount(){
    if(this.props.play.gameMode === 'by_diff') {this.setState({ set: 'Difficulty', subSet: difficulties })}
    if(this.props.play.gameMode === 'by_cat') {this.setState({ set: 'Category', subSet: categories })}
  }

  componentDidUpdate(){
  }

  componentWillUnmount(){
  }

  render(){

    let distribButtons

    if(this.state.subSet){
      distribButtons = this.state.subSet.map(field =>
        <SelectionButton
          key={this.state.subSet.indexOf(field)}
          val={field}
        />
      )
    }

    return(
      <div className='selection_container'>
        <h1> Select A { this.state.set } </h1>
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
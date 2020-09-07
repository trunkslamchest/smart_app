import React from 'react'

import { Route } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from '../../store/actions/actionIndex'

import { routes } from '../../utility/paths'

import QuestionContainer from '../displayQuestion/QuestionContainer'

class QuickPlayContainer extends React.Component {

  state = {
    ready: false,
    showQuestion: false
  }

  componentDidMount(){

    let questionObj = {
      prop: 'testProp'
    }

    this.props.onSetGameMode("quickPlay")
    this.props.onGetQuickQuestion(questionObj)
  }

  componentDidUpdate(){
    if(!!this.props.play.question && !this.state.ready){
      this.setState({ ready: true })
    }

    if(this.state.ready && !this.state.showQuestion){
      this.props.history.push( routes.quick_play + '/question' )
      this.setState({ showQuestion: true })
    }
  }

  componentWillUnmount(){
    this.props.onResetGameMode()
    this.setState({
      ready: false,
      showQuestion: false
    })
  }

  render(){

    // console.log(this.state)
    // console.log(this.props.play.question)

    var loading = <h1> Loading... </h1>

    let question =
      <Route path={ routes.quick_play + '/question' }>
        <QuestionContainer history={ this.props.history } />
      </Route>

    return(
      <>
        { this.state.showQuestion ? question : loading }
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
    onGetQuickQuestion: (obj) => dispatch(actions.getQuickQuestion(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickPlayContainer)
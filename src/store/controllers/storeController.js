import React from 'react'

import { connect } from 'react-redux'
import { showModal } from '../actions/actionIndex'

import AuthController from './authController'
import QuestionsController from './questionsController'

class StoreController extends React.Component {

  state = {

  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  componentWillUnmount(){
    this.props.showModal(false)
  }

  render(){
    return(
      <AuthController history={ this.props.history }>
        <QuestionsController history={ this.props.history }>
          { this.props.children }
        </QuestionsController>
      </AuthController>
    )
  }
}

const mapStateToProps = state => {
  return{
    auth: state.auth,
    modal: state.modal,
    logIn: state.logIn,
    play: state.play,
    questions: state.questions,
    signUp: state.signUp,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onShowModal: (bool) => dispatch(showModal(bool)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreController)
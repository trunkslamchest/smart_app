import React from 'react'
import { connect } from 'react-redux'
import { routes } from '../../utility/paths'

import {
  authUpdateLoadingStatus,
  clearAuthStatus,
  clearAuthType,
  showModal
} from '../actions/actionIndex'

import AuthController from './authController'
import QuestionsController from './questionsController'

class StoreController extends React.Component {

  state = {
  }

  componentDidMount(){

  }

  componentDidUpdate(){

  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(
    //   // this.props.auth, nextProps.auth, "|",
    //   // this.props.modal, nextProps.modal, "|",
    //   // this.props.modal.loading, nextProps.modal.loading, "|",
    //   // !!nextProps.leaderBoards.status, "|",
    //   // nextProps.leaderBoards.loading
    //   this.props.leaderBoards, "|",
    //   nextProps.leaderBoards, "|",
    //   nextProps.modal.loading
    // )

    let render = false

    if(
      !!this.props.auth.status||
      !!this.props.authType ||
      nextProps.leaderBoards.status ||
      nextProps.profile.status

      // nextProps.leaderBoards.loading
      // !!nextProps.authType ||
    ) {
      render = true
    }

    if(nextProps.modal.loading || nextProps.modal.login || nextProps.modal.signup || nextProps.modal.help) render = true

    return render
  }

  componentWillUnmount(){
    this.props.showModal(false)
  }

  onRedirect = (authType) => {
    if(authType === 'deleteProfile' || authType === 'logOut') {
      this.props.history.push( routes.home )
      this.props.onClearAuthStatus()
      this.props.onClearAuthType()
      this.props.onAuthUpdateLoadingStatus(false)
    }
  }

  render(){
    return(
      <AuthController onRedirect={ this.onRedirect } history={ this.props.history }>
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
    leaderBoards: state.leaderBoards,
    modal: state.modal,
    play: state.play,
    profile: state.profile,
    questions: state.questions,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onShowModal: (bool) => dispatch(showModal(bool)),
    onClearAuthStatus: () => dispatch(clearAuthStatus()),
    onClearAuthType: () => dispatch(clearAuthType()),
    onAuthUpdateLoadingStatus: (bool) => dispatch(authUpdateLoadingStatus(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreController)
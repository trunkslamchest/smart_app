import React from 'react'
import { connect } from 'react-redux'
import { routes } from '../../utility/paths'

import {
  authUpdateLoadingStatus,
  clearAuthStatus,
  clearAuthType
} from '../actions/actionIndex'

// import getAll from '../../firebase/functions/getAll'

import AuthController from './authController'

class StoreController extends React.Component {

  state = {
    db: {}
  }

  componentDidMount(){
    // getAll.then((resObj) => {
    //   this.setState({ db: resObj })
    //   // console.log(resObj)
    //   // return resObj
    // })
  }

  componentDidUpdate(){

  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // console.log(
  //     // this.props.auth, nextProps.auth, "|",
  //     // this.props.modal, nextProps.modal, "|",
  //     // this.props.modal.loading, nextProps.modal.loading, "|",
  //     // !!nextProps.leaderBoards.status, "|",
  //     // nextProps.leaderBoards.loading
  //     // this.props.leaderBoards, "|",
  //     // nextProps.leaderBoards, "|",
  //     // this.props.questions.status, "|",
  //     // nextProps.questions.status
  //   // )

  //   let render = false

  //   if(
  //     !!this.props.auth.status||
  //     !!this.props.authType ||
  //     nextProps.leaderBoards.status ||
  //     nextProps.profile.status ||
  //     nextProps.questions.status ||
  //     nextProps.questions.commentStatus ||
  //     nextProps.questions.voteStatus

  //     // nextProps.leaderBoards.loading
  //     // !!nextProps.authType ||
  //   ) {
  //     render = true
  //   }

  //   if(nextProps.modal.loading || nextProps.modal.login || nextProps.modal.signup || nextProps.modal.help) render = true

  //   return render
  // }

  componentWillUnmount(){
    this.props.showModal(false)
  }

  onRedirect = (authType) => {
    if(authType === 'signUp') {
      this.props.history.push( routes.home )
    }
    if(authType === 'deleteProfile' || authType === 'logOut') {
      this.props.history.push( routes.home )
      this.props.onClearAuthStatus()
      this.props.onClearAuthType()
      this.props.onAuthUpdateLoadingStatus(false)
    }
  }

  render(){
    return(
      <>
        <AuthController onRedirect={ this.onRedirect } history={ this.props.history } />
        { this.props.children }
      {/* </AuthController> */}
      </>
    )
  }
}

const store = (store) => {
  return{
    auth: store.auth,
    leaderBoards: store.leaderBoards,
    modal: store.modal,
    play: store.play,
    profile: store.profile,
    questions: store.questions,
    user: store.user
  }
}

const dispatch = (dispatch) => {
  return {
    onClearAuthStatus: () => dispatch(clearAuthStatus()),
    onClearAuthType: () => dispatch(clearAuthType()),
    onAuthUpdateLoadingStatus: (bool) => dispatch(authUpdateLoadingStatus(bool))
  }
}

export default connect(store, dispatch)(StoreController)
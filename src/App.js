import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from './store/actions/actionIndex'

import { routes } from './utility/paths'

import StoreController from './store/controllers/storeController'
import PlayController from './store/controllers/playController'

import Header from './UI/header/header'
import HomeContainer from './home/HomeContainer'
import Footer from './UI/footer/footer'

import LogIn from './user/logIn/logIn'
import SignUp from './user/signUp/signUp'
import LogOut from './user/logOut/logOut'

import DashboardContainer from './user/dashboard/dashboardContainer'

import TermsOfService from './docs/termsOfService'
import Privacy from './docs/privacy'
import Disclaimer from './docs/disclaimer'

import E404 from './error/E404'

import './App.css'
import './UI/response.css'
import './UI/loading.css'

class App extends React.Component {

  componentDidMount(){
    if (!localStorage.token)  {
      localStorage.clear()
      localStorage.access = 'guest'
    } else this.props.onAuthStart('refresh', { grant_type: "refresh_token", refresh_token: localStorage.refreshToken }, this.props)
  }

  componentWillUnmount(){
    this.props.showModal(false)
  }

  render(){
    return (
      <>
        <StoreController history={this.props.history}>
          <Header />
          <div className='main_container'>
            <LogIn history={this.props.history} />
            <LogOut history={this.props.history} />
            <SignUp history={this.props.history} />
            <Switch>
              <Route exact path={ routes.home }>
                <HomeContainer history={this.props.history} />
              </Route>
              <Route path={ routes.dashboard }>
                <DashboardContainer history={this.props.history} />
              </Route>
              <Route path={ routes.play }>
                <PlayController history={this.props.history} />
              </Route>
              <Route exact path={ routes.tos }><TermsOfService /></Route>
              <Route exact path={ routes.privacy }><Privacy /></Route>
              <Route exact path={ routes.disclaimer }><Disclaimer /></Route>
              <Route><E404 /></Route>
            </Switch>
          </div>
          <Footer/>
        </StoreController>
      </>
    )
  }
}

const mapStateToProps = (state) => {
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

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthStart: (authType, obj, props) => dispatch(actions.authStart(authType, obj, props))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
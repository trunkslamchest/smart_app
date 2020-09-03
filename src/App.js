import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from './store/actions/actionIndex'

import { routes } from './utility/paths'

import Header from './UI/header/header'
import HomeContainer from './home/HomeContainer'
import Footer from './UI/footer/footer'

import LogIn from './user/logIn/logIn'
import SignUp from './user/signUp/signUp'
import LogOut from './user/logOut/logOut'

import DashboardContainer from './user/dashboard/dashboardContainer'
import PlayContainer from './play/PlayContainer'

import TermsOfService from './docs/termsOfService'
import Privacy from './docs/privacy'
import Disclaimer from './docs/disclaimer'

import DevTest from './devTest/devTest'
import E404 from './error/E404'

import './App.css'
import './UI/response.css'
import './UI/loading.css'

class App extends React.Component {

  componentDidMount(){
    if (!localStorage.token)  {
      localStorage.clear()
      localStorage.access = 'guest'
    } else {
      let refreshObj = {
        grant_type: "refresh_token",
        refresh_token: localStorage.refreshToken
      }
      this.props.onAuthRefresh(refreshObj)
    }
  }

  componentWillUnmount(){
    this.props.showModal(false)
  }

  render(){
    return (
      <>
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
              <PlayContainer />
            </Route>
            <Route exact path={ routes.tos }> <TermsOfService /> </Route>
            <Route exact path={ routes.privacy }> <Privacy /> </Route>
            <Route exact path={ routes.disclaimer }> <Disclaimer /> </Route>
            <Route path={ routes.devTest }> <DevTest /> </Route>
            <Route> <E404 /> </Route>
          </Switch>
        </div>
        <Footer/>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onShowModal: (bool) => dispatch(actions.showModal(bool)),
    onAuthRefresh: (obj) => dispatch(actions.authRefresh(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
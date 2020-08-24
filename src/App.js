import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from './store/actions/actionIndex'

import { routes } from './utility/paths'

// import authFunctions from './utility/authFunctions'
// import userFunctions from './utility/userFunctions'

import Header from './UI/header/header'
import Home from './index/Home'
import Footer from './UI/footer/footer'

import LogIn from './user/logIn/logIn'
import SignUp from './user/signUp/signUp'
import LogOut from './user/logOut/logOut'

import DashboardContainer from './user/dashboard/dashboardContainer'

import TermsOfService from './docs/termsOfService'
import Privacy from './docs/privacy'
import Disclaimer from './docs/disclaimer'

import DevTest from './devTest/devTest'
import E404 from './error/E404'

import './App.css'
import './UI/response.css'
import './UI/loading.css'

class App extends React.Component {

  state = {
    user: {
      email: null,
      id: null,
      loggedIn: null,
      token: null,
      user_name: null
    }
  }

  componentDidMount(){
    if (!localStorage.token)  {
      // localStorage.removeItem('token')
      // localStorage.removeItem('refreshToken')
      // localStorage.removeItem('id')
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
        <Header
          user_access={this.state.user.access}
          user_id={this.state.user.id}
          user_name={this.state.user.user_name}
          user_token={this.state.user.token}
        />

        <div className='main_container'>
          <LogIn
            history={this.props.history}
          />
          <LogOut
            access={this.state.user.access}
            history={this.props.history}
            token={this.state.user.token}
            user_id={this.state.user.id}
            user_name={this.state.user.user_name}
          />
          <SignUp
            history={this.props.history}
          />
          <Switch>
            <Route exact path={ routes.home }>
              <Home
                history={this.props.history}
                user_id={this.state.user.id}
                updateLogin={this.updateLogin}
              />
            </Route>
            <Route path={ routes.dashboard }>
              <DashboardContainer
                history={this.props.history}
                setUser={this.setUser}
                user={this.state.user}
              />
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
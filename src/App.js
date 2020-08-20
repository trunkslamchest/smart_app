import React from 'react'

import { Route, Switch } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from './store/actions/actionIndex'

import { routes } from './utility/paths'

import userFunctions from './utility/userFunctions'

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
      localStorage.clear()
      localStorage.access = 'guest'
    } else {
      this.setState({
        user: {
          access: localStorage.access,
          id: parseInt(localStorage.user_id, 10),
          email: localStorage.email,
          loggedIn: true,
          token: localStorage.token,
          user_name: localStorage.user_name
        }
      })
    }
  }

  setToken = ({ token, user_id })  => {

    localStorage.user_id = user_id
    localStorage.token = token

    userFunctions('get', `http://localhost:3001/users/${user_id}`)
    .then(res_obj => {
      let current_user = res_obj.data.attributes.user

      localStorage.user_name = current_user.user_name
      localStorage.email = current_user.email
      localStorage.access = current_user.access

      this.setState({
        user: {
          token,
          loggedIn: true,
          ...current_user,
        }
      })
    })

  }

  setUser = ( res_obj, token ) => {
    let current_user = res_obj.data.attributes.user

    localStorage.user_name = current_user.user_name
    localStorage.email = current_user.email
    localStorage.access = current_user.access

    this.setState({
      user: {
        token,
        loggedIn: true,
        ...current_user
      }
    })
  }

  updateLogin = () => {
    this.setState({
      user: {
        ...this.state.user,
        loggedIn: !this.state.loggedIn
      }
    })
  }

  logOut = () => {
    localStorage.clear()
    localStorage.access = 'guest'
    this.setState({
      user: {
        email: null,
        id: null,
        loggedIn: null,
        token: null,
        user_name: null
      },
    })
  }

  componentWillUnmount(){
    this.props.onLoginModal(false)
    this.props.onLogoutModal(false)
    this.props.onSignupModal(false)
  }

  render(){
    return (
      <>
        <Header
          logOut={this.logOut}
          user_access={this.state.user.access}
          user_id={this.state.user.id}
          user_name={this.state.user.user_name}
          user_token={this.state.user.token}
        />

        <div className='main_container'>
          <LogIn
            history={this.props.history}
            setToken={this.setToken}
            updateLogin={this.updateLogin}
          />
          <LogOut
            access={this.state.user.access}
            history={this.props.history}
            logOut={this.logOut}
            token={this.state.user.token}
            user_id={this.state.user.id}
            user_name={this.state.user.user_name}
          />
          <SignUp
            history={this.props.history}
            setToken={this.setToken}
            updateLogin={this.updateLogin}
          />
          <Switch>
            <Route exact path={ routes.home }>
              <Home
                history={this.props.history}
                setToken={this.setToken}
                user_id={this.state.user.id}
                updateLogin={this.updateLogin}
              />
            </Route>
            <Route path={ routes.dashboard }>
              <DashboardContainer
                history={this.props.history}
                logOut={this.logOut}
                setToken={this.setToken}
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
    modal: state.modal
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginModal: (bool) => dispatch(actions.login(bool)),
    onLogoutModal: (bool) => dispatch(actions.logout(bool)),
    onSignupModal: (bool) => dispatch(actions.signup(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
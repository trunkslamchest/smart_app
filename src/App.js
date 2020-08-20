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
      token: null,
      loggedIn: null,
      id: null,
      user_name: null,
      email: null,
      first_name: null,
      last_name: null,
      gender: null,
      birth_day: null,
      birth_month: null,
      birth_year: null,
      house_number: null,
      street_name: null,
      city_town: null,
      state: null,
      zip_code: null,
      join_day: null,
      join_month: null,
      join_year: null,
    },
    showLogInModal: false,
    showSignUpModal: false,
    showLogOutModal: false
  }

  componentDidMount(){
    if (!localStorage.token)  {
      localStorage.clear()
      localStorage.access = 'guest'
    } else {
      this.setState({
        user: {
          token: localStorage.token,
          loggedIn: true,
          id: parseInt(localStorage.user_id, 10),
          user_name: localStorage.user_name,
          email: localStorage.email,
          access: localStorage.access,
          first_name: localStorage.first_name,
          last_name: localStorage.last_name,
          gender: localStorage.gender,
          birth_day: localStorage.birth_day,
          birth_month: localStorage.birth_month,
          birth_year: localStorage.birth_year,
          house_number: localStorage.house_number,
          street_name: localStorage.street_name,
          city_town: localStorage.city_town,
          state: localStorage.state,
          zip_code: localStorage.zip_code,
          join_day: localStorage.join_day,
          join_month: localStorage.join_month,
          join_year: localStorage.join_year,
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
      localStorage.first_name = current_user.first_name
      localStorage.last_name = current_user.last_name
      localStorage.gender = current_user.gender
      localStorage.birth_day = current_user.birth_day
      localStorage.birth_month = current_user.birth_month
      localStorage.birth_year = current_user.birth_year
      localStorage.house_number = current_user.house_number
      localStorage.street_name = current_user.street_name
      localStorage.city_town = current_user.city_town
      localStorage.state = current_user.state
      localStorage.zip_code = current_user.zip_code
      localStorage.join_day = current_user.join_day
      localStorage.join_month = current_user.join_month
      localStorage.join_year = current_user.join_year

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
    localStorage.first_name = current_user.first_name
    localStorage.last_name = current_user.last_name
    localStorage.gender = current_user.gender
    localStorage.birth_day = current_user.birth_day
    localStorage.birth_month = current_user.birth_month
    localStorage.birth_year = current_user.birth_year
    localStorage.house_number = current_user.house_number
    localStorage.street_name = current_user.street_name
    localStorage.city_town = current_user.city_town
    localStorage.state = current_user.state
    localStorage.zip_code = current_user.zip_code
    localStorage.join_day = current_user.join_day
    localStorage.join_month = current_user.join_month
    localStorage.join_year = current_user.join_year

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
        token: null,
        loggedIn: null,
        id: null,
        user_name: null,
        email: null,
        access: 'guest',
        first_name: null,
        last_name: null,
        gender: null,
        birth_day: null,
        birth_month: null,
        birth_year: null,
        house_number: null,
        street_name: null,
        city_town: null,
        state: null,
        zip_code: null,
        join_day: null,
        join_month: null,
        join_year: null
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
                showLogInModal={this.showLogInModal}
                showSignUpModal={this.showSignUpModal}
                showModal={this.showModal}
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
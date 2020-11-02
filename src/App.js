import React from 'react'

import { connect } from 'react-redux'
import { loading } from './store/actions/actionIndex'

import { Route, Switch } from 'react-router-dom'

import { routes } from './utility/paths'

import StoreController from './store/controllers/storeController'
import PlayController from './store/controllers/playController'
import LeaderBoardsController from './store/controllers/leaderBoardsController'

import Header from './UI/header/header'
import Footer from './UI/footer/footer'

import LogIn from './user/logIn/logIn'
import SignUp from './user/signUp/signUp'
import LogOut from './user/logOut/logOut'
import LoadingModal from './UI/loading/loadingModal/loadingModal'

import HomeContainer from './home/HomeContainer'
import DashboardContainer from './user/dashboard/dashboardContainer'
import UserProfileContainer from './user/profile/userProfileContainer'
import ResultsContainer from './play/results/resultsContainer'

import TermsOfService from './docs/termsOfService'
import Privacy from './docs/privacy'
import Disclaimer from './docs/disclaimer'

import E404 from './error/E404'

import './App.css'

const App = (props) => {
  return (
    <StoreController history={ props.history }>
      <Header history={ props.history } />
      <div className='main_container' name="main_container">
        {
          props.auth.loading &&
          (props.auth.authType === 'refresh' || props.auth.authType === 'editProfile') &&
          <LoadingModal
            show={ props.auth.loading }
            modalType={ 'auth' }
            barType={ props.auth.authType }
            history={ props.history }
          />
        }
        { props.modal.login && <LogIn history={ props.history } /> }
        { props.modal.logout && <LogOut history={ props.history } /> }
        { props.modal.signup && <SignUp history={ props.history } /> }
        <Switch>
          <Route exact path={ routes.home }>
            <HomeContainer history={ props.history } />
          </Route>
          <Route path={ routes.dashboard }>
            <DashboardContainer history={ props.history } />
          </Route>
          <Route path={ routes.user_profile }>
            <UserProfileContainer history={ props.history } />
          </Route>
          <Route path={ routes.static_results }>
            <ResultsContainer staticResults={ true } history={ props.history } />
          </Route>
          <Route path={ routes.play }>
            <PlayController history={ props.history } />
          </Route>
          <Route path={ routes.leader_boards }>
            <LeaderBoardsController history={ props.history } />
          </Route>
          <Route exact path={ routes.tos }><TermsOfService /></Route>
          <Route exact path={ routes.privacy }><Privacy /></Route>
          <Route exact path={ routes.disclaimer }><Disclaimer /></Route>
          <Route><E404 /></Route>
        </Switch>
      </div>
      <Footer/>
    </StoreController>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    modal: state.modal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadingModal: (bool) => dispatch(loading(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
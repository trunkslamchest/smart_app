import React from 'react'

import { Route, Switch } from 'react-router-dom'

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

const App = (props) => {
  return (
    <StoreController history={ props.history }>
      <Header />
      <div className='main_container'>
        <LogIn history={ props.history } />
        <LogOut history={ props.history } />
        <SignUp history={ props.history } />
        <Switch>
          <Route exact path={ routes.home }>
            <HomeContainer history={ props.history } />
          </Route>
          <Route path={ routes.dashboard }>
            <DashboardContainer history={ props.history } />
          </Route>
          <Route path={ routes.play }>
            <PlayController history={ props.history } />
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

export default App
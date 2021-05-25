import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from './utility/paths'

import AuthController from './store/controllers/authController'
import ModalController from './store/controllers/modalController'
import LeaderBoardsController from './store/controllers/leaderBoardsController'
import ProfileController from './store/controllers/profileController'
import PlayController from './store/controllers/playController'
import QuestionsController from './store/controllers/questionsController'

import Header from './UI/header/header'
import Footer from './UI/footer/footer'

import HomeContainer from './home/HomeContainer'
import DashboardContainer from './user/dashboard/dashboardContainer'

import TermsOfService from './docs/termsOfService/termsOfService'
import PrivacyPolicy from './docs/privacyPolicy/privacyPolicy'
import Disclaimer from './docs/disclaimer/disclaimer'
import License from './docs/license/license'

import E404 from './error/E404'

import './App.css'

const App = () => {
  return (
    <>
      <AuthController />
      <ModalController />
      <Header />
      <div className='main_container' name="main_container">
        <Switch>
          <Route exact path={ routes.home }>
            <HomeContainer />
          </Route>
          <Route path={ routes.dashboard }>
            <DashboardContainer />
          </Route>
          <Route path={ routes.user_profile }>
            <ProfileController />
          </Route>
          <Route path={ routes.static_results }>
            <QuestionsController />
          </Route>
          <Route path={ routes.play }>
            <PlayController />
          </Route>
          <Route path={ routes.leader_boards }>
            <LeaderBoardsController />
          </Route>
          <Route exact path={ routes.tos }><TermsOfService /></Route>
          <Route exact path={ routes.privacy }><PrivacyPolicy /></Route>
          <Route exact path={ routes.disclaimer }><Disclaimer /></Route>
          <Route exact path={ routes.license }><License /></Route>
          <Route><E404 /></Route>
        </Switch>
      </div>
      <Footer />
    </>
  )
}

export default App
